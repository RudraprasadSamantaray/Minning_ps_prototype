import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useMining } from '../../context/MiningContext';
import { MINE_ZONES } from '../../data/miningData';
import { MineZone, CameraPreset, GisLayerId } from '../../types/mining';
import {
  RotateCw,
  Eye,
  Layers,
  Compass,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  CloudRain,
  Thermometer,
  Trees,
  Crosshair,
  Flame,
  Droplets,
} from 'lucide-react';

export const MineCanvas3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    openZoneDrawer,
    activeGisLayers,
    cameraPreset,
    setCameraPreset,
    toggleGisLayer,
    focusZoneIn3D,
  } = useMining();

  const [hoveredZone, setHoveredZone] = useState<MineZone | null>(null);

  // References for dynamic Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Layer groups
  const mineralizationGroupRef = useRef<THREE.Group | null>(null);
  const temperatureGroupRef = useRef<THREE.Group | null>(null);
  const rainfallGroupRef = useRef<THREE.Group | null>(null);
  const soilMoistureGroupRef = useRef<THREE.Group | null>(null);
  const ndviGroupRef = useRef<THREE.Group | null>(null);
  const drillHolesGroupRef = useRef<THREE.Group | null>(null);

  // Dynamic meshes
  const oreBodyMeshRef = useRef<THREE.Mesh | null>(null);
  const oreWireMeshRef = useRef<THREE.Mesh | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const rainParticlesRef = useRef<THREE.Points | null>(null);
  const benchMeshesRef = useRef<THREE.Mesh[]>([]);
  const zoneBeaconsRef = useRef<{ id: string; pillar: THREE.Mesh; ring: THREE.Mesh }[]>([]);

  // Smooth camera animation target positions
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(65, 55, 75));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, -6, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, -6, 0));

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8F9FA);
    scene.fog = new THREE.FogExp2(0xF8F9FA, 0.003);
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 1000);
    camera.position.set(65, 55, 75);
    camera.lookAt(0, -6, 0);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.4);
    sunLight.position.set(90, 140, 70);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 300;
    sunLight.shadow.camera.left = -70;
    sunLight.shadow.camera.right = 70;
    sunLight.shadow.camera.top = 70;
    sunLight.shadow.camera.bottom = -70;
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0xe2e8f0, 0x64748b, 0.5);
    scene.add(hemiLight);

    // 5. Open-Pit Terraced Benches (Geological Strata Steps)
    const pitGroup = new THREE.Group();
    scene.add(pitGroup);

    const benchLevels = 7;
    const maxRadius = 56;
    const benchHeight = 3.6;
    const benchMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < benchLevels; i++) {
      const currentRadius = maxRadius - i * 6.5;
      const currentInnerRadius = Math.max(9, currentRadius - 5.5);
      const currentY = -i * benchHeight;

      // Bench surface ring
      const ringGeo = new THREE.RingGeometry(currentInnerRadius, currentRadius, 54);
      const ringMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xD1D5DB : 0xCBD5E1,
        roughness: 0.85,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = currentY;
      ringMesh.receiveShadow = true;
      pitGroup.add(ringMesh);
      benchMeshes.push(ringMesh);

      // Bench vertical batter wall (slope face)
      const wallRadiusTop = currentInnerRadius;
      const wallRadiusBottom = Math.max(6, currentInnerRadius - 1.2);
      const wallGeo = new THREE.CylinderGeometry(
        wallRadiusTop,
        wallRadiusBottom,
        benchHeight,
        54,
        1,
        true
      );
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0x94A3B8,
        roughness: 0.9,
        side: THREE.DoubleSide,
      });
      const wallMesh = new THREE.Mesh(wallGeo, wallMat);
      wallMesh.position.y = currentY - benchHeight / 2;
      wallMesh.receiveShadow = true;
      pitGroup.add(wallMesh);
      benchMeshes.push(wallMesh);
    }
    benchMeshesRef.current = benchMeshes;

    // Pit floor (sump base)
    const floorGeo = new THREE.CircleGeometry(18, 36);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x64748B,
      roughness: 0.95,
      side: THREE.DoubleSide,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -benchLevels * benchHeight;
    floorMesh.receiveShadow = true;
    pitGroup.add(floorMesh);

    // Surrounding plateau topography
    const plateauGeo = new THREE.RingGeometry(maxRadius, 92, 40);
    const plateauMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      roughness: 0.95,
      side: THREE.DoubleSide,
    });
    const plateauMesh = new THREE.Mesh(plateauGeo, plateauMat);
    plateauMesh.rotation.x = -Math.PI / 2;
    plateauMesh.position.y = 0;
    plateauMesh.receiveShadow = true;
    pitGroup.add(plateauMesh);

    // Subtle Digital Twin Grid on plateau
    const gridHelper = new THREE.GridHelper(180, 36, 0xCBD5E1, 0xE2E8F0);
    gridHelper.position.y = 0.05;
    scene.add(gridHelper);

    // 6. LAYER GROUP 1: Mineralization & Manganese Ore Body
    const mineralizationGroup = new THREE.Group();
    scene.add(mineralizationGroup);
    mineralizationGroupRef.current = mineralizationGroup;

    // Manganese metallic ore body vein
    const oreGeo = new THREE.DodecahedronGeometry(8.5, 2);
    const oreMat = new THREE.MeshStandardMaterial({
      color: 0x7C3AED,
      emissive: 0x581C87,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.88,
    });
    const oreMesh = new THREE.Mesh(oreGeo, oreMat);
    oreMesh.position.set(-14, -14, -10);
    oreMesh.scale.set(1.6, 0.85, 2.3);
    oreMesh.castShadow = true;
    mineralizationGroup.add(oreMesh);
    oreBodyMeshRef.current = oreMesh;

    // Glowing wireframe block-model cage
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xC084FC,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const oreWireMesh = new THREE.Mesh(oreGeo, wireMat);
    oreWireMesh.position.copy(oreMesh.position);
    oreWireMesh.scale.copy(oreMesh.scale).multiplyScalar(1.08);
    mineralizationGroup.add(oreWireMesh);
    oreWireMeshRef.current = oreWireMesh;

    // Subsurface block-model voxels (simulating mining grade blocks)
    for (let bx = -2; bx <= 2; bx++) {
      for (let bz = -2; bz <= 2; bz++) {
        if (Math.random() > 0.45) {
          const voxelGeo = new THREE.BoxGeometry(2.4, 1.8, 2.4);
          const voxelMat = new THREE.MeshStandardMaterial({
            color: Math.random() > 0.5 ? 0x9333EA : 0x7C3AED,
            emissive: 0x6B21A8,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.7,
          });
          const voxelMesh = new THREE.Mesh(voxelGeo, voxelMat);
          voxelMesh.position.set(-14 + bx * 3, -15 + (Math.random() - 0.5) * 4, -10 + bz * 3);
          mineralizationGroup.add(voxelMesh);
        }
      }
    }

    // 7. LAYER GROUP 2: Temperature (Thermal Infrared Heatmap)
    const temperatureGroup = new THREE.Group();
    scene.add(temperatureGroup);
    temperatureGroupRef.current = temperatureGroup;

    // Thermal contour rings on benches
    for (let t = 0; t < 5; t++) {
      const tGeo = new THREE.RingGeometry(20 + t * 7, 24 + t * 7, 36);
      const tMat = new THREE.MeshBasicMaterial({
        color: t % 2 === 0 ? 0xEA580C : 0xF97316,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
      });
      const tMesh = new THREE.Mesh(tGeo, tMat);
      tMesh.rotation.x = -Math.PI / 2;
      tMesh.position.y = -t * 3.5 + 0.15;
      temperatureGroup.add(tMesh);
    }
    temperatureGroup.visible = false; // toggled via layers

    // 8. LAYER GROUP 3: Rainfall & Inundation
    const rainfallGroup = new THREE.Group();
    scene.add(rainfallGroup);
    rainfallGroupRef.current = rainfallGroup;

    // 3D Rain Particle System (400 animated falling raindrops)
    const rainCount = 450;
    const rainGeo = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);
    for (let r = 0; r < rainCount * 3; r += 3) {
      rainPositions[r] = (Math.random() - 0.5) * 120;
      rainPositions[r + 1] = Math.random() * 80;
      rainPositions[r + 2] = (Math.random() - 0.5) * 120;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rainMat = new THREE.PointsMaterial({
      color: 0x38BDF8,
      size: 0.7,
      transparent: true,
      opacity: 0.75,
    });
    const rainParticles = new THREE.Points(rainGeo, rainMat);
    rainfallGroup.add(rainParticles);
    rainParticlesRef.current = rainParticles;
    rainfallGroup.visible = false; // toggled via layers

    // 9. LAYER GROUP 4: Soil Moisture (Waterlogged saturation)
    const soilMoistureGroup = new THREE.Group();
    scene.add(soilMoistureGroup);
    soilMoistureGroupRef.current = soilMoistureGroup;

    // Saturated cyan/blue wash on Ramp B-2 and Zone B floor
    const moistGeo = new THREE.CircleGeometry(16, 28);
    const moistMat = new THREE.MeshStandardMaterial({
      color: 0x0284C7,
      emissive: 0x0369A1,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
    });
    const moistMesh = new THREE.Mesh(moistGeo, moistMat);
    moistMesh.rotation.x = -Math.PI / 2;
    moistMesh.position.set(24, -18.2, 18);
    soilMoistureGroup.add(moistMesh);
    soilMoistureGroup.visible = false; // toggled via layers

    // 10. LAYER GROUP 5: NDVI (Vegetation Anomaly)
    const ndviGroup = new THREE.Group();
    scene.add(ndviGroup);
    ndviGroupRef.current = ndviGroup;

    // 3D Vegetation Shrub Meshes on the upper ridges
    for (let v = 0; v < 36; v++) {
      const angle = (v / 36) * Math.PI * 2;
      const radius = 60 + (v % 5) * 5;
      const shrubGeo = new THREE.DodecahedronGeometry(1.2 + (v % 3) * 0.4);
      const shrubMat = new THREE.MeshStandardMaterial({
        color: v % 4 === 0 ? 0x15803D : 0x16A34A,
        roughness: 0.9,
      });
      const shrub = new THREE.Mesh(shrubGeo, shrubMat);
      shrub.position.set(Math.cos(angle) * radius, 1.2, Math.sin(angle) * radius);
      ndviGroup.add(shrub);
    }
    ndviGroup.visible = false; // toggled via layers

    // 11. LAYER GROUP 6: Drill Holes & Assays
    const drillHolesGroup = new THREE.Group();
    scene.add(drillHolesGroup);
    drillHolesGroupRef.current = drillHolesGroup;

    const drillCoords = [
      { x: -18, z: -12, depth: 28, grade: 'high' },
      { x: -10, z: -8, depth: 32, grade: 'high' },
      { x: -22, z: -18, depth: 22, grade: 'med' },
      { x: 18, z: -20, depth: 20, grade: 'med' },
      { x: 22, z: 16, depth: 24, grade: 'low' },
      { x: 26, z: 22, depth: 28, grade: 'low' },
    ];

    drillCoords.forEach((dh) => {
      const holeGeo = new THREE.CylinderGeometry(0.35, 0.35, dh.depth, 14);
      const holeMat = new THREE.MeshStandardMaterial({
        color: dh.grade === 'high' ? 0x2563EB : dh.grade === 'med' ? 0x0D9488 : 0xD97706,
        emissive: dh.grade === 'high' ? 0x1D4ED8 : dh.grade === 'med' ? 0x0F766E : 0xB45309,
        emissiveIntensity: 0.4,
        roughness: 0.3,
      });
      const holeMesh = new THREE.Mesh(holeGeo, holeMat);
      holeMesh.position.set(dh.x, -dh.depth / 2, dh.z);
      drillHolesGroup.add(holeMesh);

      // Collar marker ring at surface
      const collarGeo = new THREE.RingGeometry(0.7, 1.6, 16);
      const collarMat = new THREE.MeshBasicMaterial({ color: 0x0F172A, side: THREE.DoubleSide });
      const collarMesh = new THREE.Mesh(collarGeo, collarMat);
      collarMesh.rotation.x = -Math.PI / 2;
      collarMesh.position.set(dh.x, 0.15, dh.z);
      drillHolesGroup.add(collarMesh);
    });

    // 12. Haul Road & Moving Haul Truck
    const haulRoadGroup = new THREE.Group();
    scene.add(haulRoadGroup);

    const curvePoints = [];
    for (let t = 0; t <= 1; t += 0.05) {
      const angle = t * Math.PI * 2.8;
      const radius = 49 - t * 32;
      const y = -t * (benchLevels * benchHeight);
      curvePoints.push(new THREE.Vector3(Math.cos(angle) * radius, y + 0.2, Math.sin(angle) * radius));
    }
    const haulCurve = new THREE.CatmullRomCurve3(curvePoints);
    const roadGeo = new THREE.TubeGeometry(haulCurve, 64, 1.5, 8, false);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.95 });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    haulRoadGroup.add(roadMesh);

    // Animated Haul Truck model
    const truckGeo = new THREE.BoxGeometry(2.6, 1.5, 4.0);
    const truckMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.3 });
    const truckMesh = new THREE.Mesh(truckGeo, truckMat);
    truckMesh.castShadow = true;
    scene.add(truckMesh);

    // Heavy Excavator model on Bench 1
    const excavatorGroup = new THREE.Group();
    excavatorGroup.position.set(32, -3.5, -34);
    const excBase = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 1.8, 4.2),
      new THREE.MeshStandardMaterial({ color: 0x2563EB, roughness: 0.4 })
    );
    excavatorGroup.add(excBase);
    const excBoom = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 6),
      new THREE.MeshStandardMaterial({ color: 0x1E293B })
    );
    excBoom.position.set(0, 3, 2);
    excBoom.rotation.x = Math.PI / 4;
    excavatorGroup.add(excBoom);
    scene.add(excavatorGroup);

    // 13. Water Body in Zone B Sump
    const waterGeo = new THREE.CircleGeometry(11, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284C7,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(24, -18.0, 18);
    scene.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // 14. Interactive Zone Markers & Holographic Vertical Beacons
    const zoneBeacons: { id: string; pillar: THREE.Mesh; ring: THREE.Mesh }[] = [];
    const zoneClickMeshes: { mesh: THREE.Mesh; zone: MineZone }[] = [];

    MINE_ZONES.forEach((zone) => {
      const zoneGroup = new THREE.Group();
      zoneGroup.position.set(zone.coordinates.x * 0.7, 0, zone.coordinates.z * 0.7);

      const pinColor =
        zone.code === 'ZONE A'
          ? 0x2563EB
          : zone.code === 'ZONE C'
          ? 0x0D9488
          : 0xD97706;

      // Vertical holographic light pillar
      const pillarGeo = new THREE.CylinderGeometry(0.8, 0.8, 32, 16);
      const pillarMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat);
      pillarMesh.position.y = 16;
      zoneGroup.add(pillarMesh);

      // Pulsing Halo Ring on the bench
      const ringGeo = new THREE.RingGeometry(3.6, 4.6, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.25;
      zoneGroup.add(ringMesh);

      // Interactive Marker pin head
      const pinGeo = new THREE.SphereGeometry(2.0, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: pinColor,
        emissive: pinColor,
        emissiveIntensity: 0.5,
        metalness: 0.2,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.y = 18;
      zoneGroup.add(pinMesh);

      scene.add(zoneGroup);
      zoneBeacons.push({ id: zone.id, pillar: pillarMesh, ring: ringMesh });
      zoneClickMeshes.push({ mesh: pinMesh, zone });
    });
    zoneBeaconsRef.current = zoneBeacons;

    // 15. User Orbit Controls & Interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let spherical = { radius: 100, theta: 0.85, phi: 0.85 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycaster for hovering over zones
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
      const intersects = raycaster.intersectObjects(zoneClickMeshes.map((zm) => zm.mesh));

      if (intersects.length > 0) {
        const found = zoneClickMeshes.find((zm) => zm.mesh === intersects[0].object);
        if (found) setHoveredZone(found.zone);
        containerRef.current.style.cursor = 'pointer';
      } else {
        setHoveredZone(null);
        containerRef.current.style.cursor = isDragging ? 'grabbing' : 'grab';
      }

      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      spherical.theta -= deltaX * 0.007;
      spherical.phi = Math.max(0.15, Math.min(Math.PI / 2 - 0.05, spherical.phi - deltaY * 0.007));

      targetCamPosRef.current.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      targetCamPosRef.current.y = spherical.radius * Math.cos(spherical.phi);
      targetCamPosRef.current.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      if (containerRef.current) containerRef.current.style.cursor = 'grab';
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      spherical.radius = Math.max(35, Math.min(160, spherical.radius + e.deltaY * 0.08));
      targetCamPosRef.current.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      targetCamPosRef.current.y = spherical.radius * Math.cos(spherical.phi);
      targetCamPosRef.current.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    };

    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
      const intersects = raycaster.intersectObjects(zoneClickMeshes.map((zm) => zm.mesh));

      if (intersects.length > 0) {
        const found = zoneClickMeshes.find((zm) => zm.mesh === intersects[0].object);
        if (found) openZoneDrawer(found.zone);
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('click', onClick);

    // 16. Animation Loop (Smooth Camera Lerping & Effects)
    let truckProgress = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth Camera Lerp
      camera.position.lerp(targetCamPosRef.current, 0.06);
      currentLookAtRef.current.lerp(targetLookAtRef.current, 0.06);
      camera.lookAt(currentLookAtRef.current);

      // Animate Haul Truck
      truckProgress = (truckProgress + delta * 0.035) % 1;
      if (haulCurve) {
        const point = haulCurve.getPointAt(truckProgress);
        truckMesh.position.copy(point);
        truckMesh.position.y += 0.9;
        const tangent = haulCurve.getTangentAt(truckProgress);
        truckMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
      }

      // Animate Rain Particles if visible
      if (rainfallGroup.visible && rainParticlesRef.current) {
        const positions = rainParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < rainCount * 3; i += 3) {
          positions[i] -= delta * 70;
          if (positions[i] < -25) positions[i] = 75;
        }
        rainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate Ore body wireframe & pulsation
      if (oreWireMeshRef.current) {
        oreWireMeshRef.current.rotation.y = elapsed * 0.12;
        oreWireMeshRef.current.scale.setScalar(1.08 + Math.sin(elapsed * 2.2) * 0.04);
      }

      // Water gentle ripple oscillation
      if (waterMeshRef.current) {
        waterMeshRef.current.position.y = -18.0 + Math.sin(elapsed * 1.6) * 0.15;
      }

      // Pulsing Zone Beacon Rings
      zoneBeaconsRef.current.forEach((zb) => {
        zb.ring.scale.setScalar(1.0 + Math.sin(elapsed * 3) * 0.1);
      });

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('click', onClick);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current && domElement) {
        domElement.remove();
        rendererRef.current.dispose();
      }
    };
  }, []);

  // VITAL: DYNAMIC REACTION TO EVERY LAYER TOGGLE!
  useEffect(() => {
    if (mineralizationGroupRef.current) {
      mineralizationGroupRef.current.visible = activeGisLayers.includes('mineralization');
    }
    if (temperatureGroupRef.current) {
      temperatureGroupRef.current.visible = activeGisLayers.includes('temperature');
    }
    if (rainfallGroupRef.current) {
      rainfallGroupRef.current.visible = activeGisLayers.includes('rainfall');
    }
    if (soilMoistureGroupRef.current) {
      soilMoistureGroupRef.current.visible = activeGisLayers.includes('soil-moisture');
    }
    if (ndviGroupRef.current) {
      ndviGroupRef.current.visible = activeGisLayers.includes('ndvi');
    }
    if (drillHolesGroupRef.current) {
      drillHolesGroupRef.current.visible = activeGisLayers.includes('drill-assay');
    }

    // Adjust bench strata colors to match active layer theme
    if (benchMeshesRef.current.length > 0) {
      const isThermal = activeGisLayers.includes('temperature');
      const isMoisture = activeGisLayers.includes('soil-moisture') || activeGisLayers.includes('rainfall');

      benchMeshesRef.current.forEach((mesh, idx) => {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          if (isThermal) {
            mesh.material.color.setHex(idx % 2 === 0 ? 0xEA580C : 0xFB923C);
          } else if (isMoisture && idx > 8) {
            // Lower sump benches get dark wet sheen
            mesh.material.color.setHex(0x38BDF8);
            mesh.material.roughness = 0.2;
          } else {
            // Standard industrial strata
            mesh.material.color.setHex(idx % 2 === 0 ? 0xD1D5DB : 0x94A3B8);
            mesh.material.roughness = 0.85;
          }
        }
      });
    }
  }, [activeGisLayers]);

  // VITAL: DYNAMIC REACTION TO CAMERA PRESET & ZONE FOCUS BUTTONS!
  useEffect(() => {
    if (cameraPreset === 'perspective') {
      targetCamPosRef.current.set(65, 55, 75);
      targetLookAtRef.current.set(0, -6, 0);
    } else if (cameraPreset === 'top') {
      targetCamPosRef.current.set(0, 115, 0.1);
      targetLookAtRef.current.set(0, -10, 0);
    } else if (cameraPreset === 'bench') {
      targetCamPosRef.current.set(28, 8, -32);
      targetLookAtRef.current.set(15, -8, -15);
    } else if (cameraPreset === 'zone-a') {
      targetCamPosRef.current.set(-25, 24, -18);
      targetLookAtRef.current.set(-21, 6, -17);
    } else if (cameraPreset === 'zone-b') {
      targetCamPosRef.current.set(38, 16, 30);
      targetLookAtRef.current.set(31, -12, 24);
    } else if (cameraPreset === 'zone-c') {
      targetCamPosRef.current.set(30, 26, -34);
      targetLookAtRef.current.set(24, 10, -28);
    }
  }, [cameraPreset]);

  return (
    <div className="relative w-full h-full min-h-[540px] bg-canvas overflow-hidden rounded-xl border border-border shadow-inner">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab" />

      {/* Top Controls Overlay: Non-overlapping responsive header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-2 pointer-events-none">
        {/* Camera Presets & Zone Focus Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-surface/95 backdrop-blur-md border border-border p-1.5 rounded-lg shadow-sm pointer-events-auto max-w-full">
          <span className="text-[10px] font-mono font-bold text-navy-muted uppercase px-1">
            Vantage:
          </span>
          <button
            onClick={() => setCameraPreset('perspective')}
            className={`px-2 py-1 text-xs rounded-md font-semibold transition-all ${
              cameraPreset === 'perspective'
                ? 'bg-navy-primary text-white shadow-sm'
                : 'text-navy-muted hover:bg-slate-100 hover:text-navy-primary'
            }`}
            title="Isometric 45° Perspective"
          >
            Isometric 45°
          </button>
          <button
            onClick={() => setCameraPreset('top')}
            className={`px-2 py-1 text-xs rounded-md font-semibold transition-all ${
              cameraPreset === 'top'
                ? 'bg-navy-primary text-white shadow-sm'
                : 'text-navy-muted hover:bg-slate-100 hover:text-navy-primary'
            }`}
            title="Top-Down Orthographic GIS Plan"
          >
            Top-Down GIS
          </button>
          <button
            onClick={() => setCameraPreset('bench')}
            className={`px-2 py-1 text-xs rounded-md font-semibold transition-all ${
              cameraPreset === 'bench'
                ? 'bg-navy-primary text-white shadow-sm'
                : 'text-navy-muted hover:bg-slate-100 hover:text-navy-primary'
            }`}
            title="Horizontal Bench Cross-Cut"
          >
            Bench Cut
          </button>

          <div className="h-4 w-[1px] bg-border mx-0.5" />

          {/* Quick Fly-To Zone Buttons */}
          <span className="text-[10px] font-mono font-bold text-navy-muted uppercase px-1">
            Focus:
          </span>
          <button
            onClick={() => setCameraPreset('zone-a')}
            className={`px-2 py-1 text-xs rounded-md font-semibold transition-all ${
              cameraPreset === 'zone-a'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            Zone A (84%)
          </button>
          <button
            onClick={() => setCameraPreset('zone-b')}
            className={`px-2 py-1 text-xs rounded-md font-semibold transition-all ${
              cameraPreset === 'zone-b'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            Zone B (Sump)
          </button>
          <button
            onClick={() => setCameraPreset('zone-c')}
            className={`px-2 py-1 text-xs rounded-md font-semibold transition-all ${
              cameraPreset === 'zone-c'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
            }`}
          >
            Zone C (Ridge)
          </button>
        </div>

        {/* Legend & Active Environmental Layer Badges */}
        <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto self-end xl:self-auto">
          <div className="flex items-center space-x-2 bg-surface/95 backdrop-blur-md border border-border px-2.5 py-1 rounded-lg shadow-sm text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse shrink-0" />
            <span className="text-navy-primary font-bold">Manganese Ore Seam</span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">[43.8% Mn Grade]</span>
          </div>

          {activeGisLayers.includes('temperature') && (
            <span className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-orange-100/95 backdrop-blur-md text-orange-800 border border-orange-200 flex items-center space-x-1 shadow-sm">
              <Thermometer className="w-3 h-3" />
              <span>Thermal Active</span>
            </span>
          )}
          {activeGisLayers.includes('rainfall') && (
            <span className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-sky-100/95 backdrop-blur-md text-sky-800 border border-sky-200 flex items-center space-x-1 animate-pulse shadow-sm">
              <CloudRain className="w-3 h-3" />
              <span>Rain Active (42mm)</span>
            </span>
          )}
          {activeGisLayers.includes('soil-moisture') && (
            <span className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-cyan-100/95 backdrop-blur-md text-cyan-800 border border-cyan-200 flex items-center space-x-1 shadow-sm">
              <Droplets className="w-3 h-3" />
              <span>Moisture Sump</span>
            </span>
          )}
        </div>
      </div>

      {/* Hover Zone Tooltip HUD */}
      {hoveredZone && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 bg-navy-primary/95 text-white px-4 py-2 rounded-xl shadow-xl text-xs flex items-center space-x-3 border border-slate-700 pointer-events-none animate-fade-in">
          <span className="font-extrabold text-mining-blue text-sm font-mono">{hoveredZone.code}:</span>
          <span className="font-medium">{hoveredZone.name}</span>
          <span className="text-slate-500">•</span>
          <span className="font-mono text-emerald-400 font-bold">{hoveredZone.mineralizationProb}% Mn Probability</span>
          <span className="text-slate-500">•</span>
          <span className="text-[11px] font-mono text-purple-300">{hoveredZone.oreGrade}% Grade</span>
          <span className="text-slate-500">•</span>
          <span className="text-xs underline text-blue-200">Click to inspect</span>
        </div>
      )}

      {/* Bottom Bar: Scale Bar & Navigation Guidance */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2 text-[11px] text-navy-muted bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border pointer-events-auto">
          <Compass className="w-3.5 h-3.5 text-mining-blue" />
          <span>🖱️ Click & Drag to Orbit • Scroll to Zoom • Click any Zone Pin or Focus button to fly</span>
        </div>

        {/* Digital Twin Scale Bar */}
        <div className="hidden sm:flex items-center space-x-2 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border text-[10px] font-mono text-navy-muted">
          <span>Scale:</span>
          <div className="flex items-center space-x-1">
            <span className="w-12 h-1 bg-navy-primary block rounded-full" />
            <span className="font-bold text-navy-primary">50m</span>
          </div>
          <span>• North: 21°48'32" N</span>
        </div>
      </div>
    </div>
  );
};
