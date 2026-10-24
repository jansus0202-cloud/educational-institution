import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Compass, RotateCw, Eye, Sliders, ChevronDown, ChevronUp } from 'lucide-react';

export interface SceneControlState {
  explodedProgress: number; // 0 to 1
  autoRotate: boolean;
  cameraPreset: 'perspective' | 'zenith' | 'macro';
}

export const KnowledgeArmillaryScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [explodedVal, setExplodedVal] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activePreset, setActivePreset] = useState<'perspective' | 'zenith' | 'macro'>('perspective');

  // Mutable refs for render loop
  const animStateRef = useRef<{
    exploded: number;
    autoRotate: boolean;
    targetCamPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    pointerX: number;
    pointerY: number;
    targetPointerX: number;
    targetPointerY: number;
    isInteracting: boolean;
  }>({
    exploded: 0,
    autoRotate: true,
    targetCamPos: new THREE.Vector3(0, 1.2, 5.0),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    pointerX: 0,
    pointerY: 0,
    targetPointerX: 0,
    targetPointerY: 0,
    isInteracting: false,
  });

  // Keep animStateRef in sync with React state
  useEffect(() => {
    animStateRef.current.exploded = explodedVal;
  }, [explodedVal]);

  useEffect(() => {
    animStateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  const setCameraPreset = useCallback((preset: 'perspective' | 'zenith' | 'macro') => {
    setActivePreset(preset);
    if (preset === 'perspective') {
      animStateRef.current.targetCamPos.set(0, 1.1, 5.0);
      animStateRef.current.targetLookAt.set(0, 0, 0);
    } else if (preset === 'zenith') {
      animStateRef.current.targetCamPos.set(0, 4.4, 2.2);
      animStateRef.current.targetLookAt.set(0, 0, 0);
    } else if (preset === 'macro') {
      animStateRef.current.targetCamPos.set(0, 0.4, 2.7);
      animStateRef.current.targetLookAt.set(0, 0.1, 0);
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL safely
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090e1f, 0.08);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 40);
    camera.position.set(0, 1.2, 5.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0); // transparent background to blend seamlessly
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.8));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    try {
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    } catch (e) {
      console.warn('RoomEnvironment setup skipped:', e);
    }
    pmremGenerator.dispose();

    // Procedural Astrolabe Dial Texture (hash marks & roman numerals)
    const dialCanvas = document.createElement('canvas');
    dialCanvas.width = 1024;
    dialCanvas.height = 128;
    const ctx = dialCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#C5A059';
      ctx.fillRect(0, 0, 1024, 128);
      ctx.fillStyle = '#2A1C08';
      ctx.fillRect(0, 0, 1024, 8);
      ctx.fillRect(0, 120, 1024, 8);
      // Graduation tick marks
      for (let i = 0; i < 1024; i += 8) {
        const h = i % 64 === 0 ? 36 : i % 32 === 0 ? 22 : 12;
        ctx.fillRect(i, 8, 2, h);
        ctx.fillRect(i, 120 - h, 2, h);
      }
      ctx.font = 'bold 22px "Cinzel", serif';
      ctx.textAlign = 'center';
      const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI'];
      numerals.forEach((num, idx) => {
        ctx.fillText(num, 32 + idx * 64, 72);
      });
    }
    const dialTexture = new THREE.CanvasTexture(dialCanvas);
    dialTexture.colorSpace = THREE.SRGBColorSpace;
    dialTexture.wrapS = THREE.RepeatWrapping;
    dialTexture.wrapT = THREE.ClampToEdgeWrapping;
    dialTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // PBR Materials
    const champagneGoldMat = new THREE.MeshStandardMaterial({
      color: 0xe5c378,
      metalness: 0.92,
      roughness: 0.22,
      envMapIntensity: 1.4,
    });

    const brushedBronzeMat = new THREE.MeshStandardMaterial({
      color: 0x8c6a28,
      metalness: 0.88,
      roughness: 0.38,
      bumpScale: 0.05,
    });

    const dialRingMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: dialTexture,
      metalness: 0.75,
      roughness: 0.3,
    });

    const darkPolishedSteelMat = new THREE.MeshStandardMaterial({
      color: 0x1a233a,
      metalness: 0.9,
      roughness: 0.2,
    });

    // Central beacon material (faceted jewel representing knowledge & truth)
    const jewelMat = new THREE.MeshPhysicalMaterial({
      color: 0xf6d788,
      metalness: 0.2,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.82,
      opacity: isSoftwareGl ? 0.85 : 1,
      transparent: true,
      ior: 1.6,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: 0x946b1a,
      emissiveIntensity: 0.35,
    });

    // ------------------------------------------------------------------------
    // HIERARCHICAL COMPOSITE 3D MODEL: The Knowledge Armillary & Governance Pillar
    // ------------------------------------------------------------------------
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Plinth / Base Grounding
    const baseGroup = new THREE.Group();
    const pedestalGeo = new THREE.CylinderGeometry(1.65, 1.85, 0.18, 48);
    const pedestalMesh = new THREE.Mesh(pedestalGeo, darkPolishedSteelMat);
    pedestalMesh.position.y = -1.9;
    pedestalMesh.receiveShadow = !isSoftwareGl;
    baseGroup.add(pedestalMesh);

    const bronzeRimGeo = new THREE.TorusGeometry(1.68, 0.04, 16, 64);
    const bronzeRim = new THREE.Mesh(bronzeRimGeo, champagneGoldMat);
    bronzeRim.rotation.x = Math.PI / 2;
    bronzeRim.position.y = -1.81;
    baseGroup.add(bronzeRim);

    // Stepped upper plinth
    const upperPlinthGeo = new THREE.CylinderGeometry(1.15, 1.35, 0.16, 40);
    const upperPlinth = new THREE.Mesh(upperPlinthGeo, brushedBronzeMat);
    upperPlinth.position.y = -1.73;
    baseGroup.add(upperPlinth);

    // Vertical Meridian Bracket (Supports the armillary)
    const bracketCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.65, 0),
      new THREE.Vector3(1.7, -1.2, 0),
      new THREE.Vector3(1.85, 0, 0),
      new THREE.Vector3(1.7, 1.2, 0),
      new THREE.Vector3(0, 1.85, 0),
    ]);
    const bracketGeo = new THREE.TubeGeometry(bracketCurve, 40, 0.048, 16, false);
    const meridianBracket = new THREE.Mesh(bracketGeo, champagneGoldMat);
    meridianBracket.castShadow = !isSoftwareGl;
    baseGroup.add(meridianBracket);

    rootGroup.add(baseGroup);

    // 2. Armillary Sphere Rings (Independently animatable and exploded)
    const armillaryGroup = new THREE.Group();
    rootGroup.add(armillaryGroup);

    // Ring A: Outer Meridian Ring (Fixed bracket axis)
    const ringAGeo = new THREE.TorusGeometry(1.6, 0.045, 16, 80);
    const ringA = new THREE.Mesh(ringAGeo, champagneGoldMat);
    ringA.castShadow = !isSoftwareGl;
    armillaryGroup.add(ringA);

    // Ring B: Engraved Equatorial Graduation Ring
    const ringBGeo = new THREE.CylinderGeometry(1.48, 1.48, 0.12, 64, 1, true);
    const ringB = new THREE.Mesh(ringBGeo, dialRingMat);
    ringB.rotation.x = Math.PI / 2;
    armillaryGroup.add(ringB);

    // Ring C: Tilted Ecliptic / Constitutional Coordinate Band
    const ringCGeo = new THREE.TorusGeometry(1.36, 0.038, 16, 80);
    const ringC = new THREE.Mesh(ringCGeo, champagneGoldMat);
    ringC.rotation.x = Math.PI / 6;
    ringC.rotation.y = Math.PI / 4;
    armillaryGroup.add(ringC);

    // Ring D: Inner Polar Coordinate Hoop (Rotates smoothly in opposite direction)
    const ringDGeo = new THREE.TorusGeometry(1.18, 0.032, 16, 64);
    const ringD = new THREE.Mesh(ringDGeo, brushedBronzeMat);
    ringD.rotation.y = Math.PI / 3;
    armillaryGroup.add(ringD);

    // Ring E: Inner Solstice Ring
    const ringEGeo = new THREE.TorusGeometry(0.96, 0.026, 16, 64);
    const ringE = new THREE.Mesh(ringEGeo, champagneGoldMat);
    ringE.rotation.x = -Math.PI / 4;
    armillaryGroup.add(ringE);

    // 3. Central Beacon: Faceted Geometric Crystal of Knowledge (`Satyameva Jayate`)
    const beaconGroup = new THREE.Group();
    const octaGeo = new THREE.OctahedronGeometry(0.55, 0);
    const beaconMesh = new THREE.Mesh(octaGeo, jewelMat);
    beaconGroup.add(beaconMesh);

    // Core point light inside the crystal
    const innerLight = new THREE.PointLight(0xffdf80, 2.2, 5, 1.5);
    beaconGroup.add(innerLight);

    // Delicate axis spindle passing through core
    const spindleGeo = new THREE.CylinderGeometry(0.022, 0.022, 3.4, 24);
    const spindle = new THREE.Mesh(spindleGeo, champagneGoldMat);
    beaconGroup.add(spindle);

    // Finial crowns at spindle tips
    const finialTopGeo = new THREE.ConeGeometry(0.08, 0.22, 16);
    const finialTop = new THREE.Mesh(finialTopGeo, champagneGoldMat);
    finialTop.position.y = 1.75;
    beaconGroup.add(finialTop);

    const finialBottom = finialTop.clone();
    finialBottom.rotation.x = Math.PI;
    finialBottom.position.y = -1.75;
    beaconGroup.add(finialBottom);

    armillaryGroup.add(beaconGroup);

    // Contact shadow plane beneath pedestal
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlaneGeo = new THREE.PlaneGeometry(4.5, 4.5);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.55,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.91;
    scene.add(shadowPlane);

    // Floating subtle ambition particles / stars
    const particleCount = isSoftwareGl ? 35 : 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 8;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe5c378,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ------------------------------------------------------------------------
    // STUDIO LIGHTING RIG (Balanced 3-point studio lighting)
    // ------------------------------------------------------------------------
    // Key Light (Warm champagne)
    const keyLight = new THREE.DirectionalLight(0xfff1d6, 2.8);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 15;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Fill Light (Cool deep navy rim)
    const fillLight = new THREE.DirectionalLight(0x8faec7, 1.4);
    fillLight.position.set(-4, 2, -3);
    scene.add(fillLight);

    // Bottom Rim / Uplight (Warm accent)
    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.2);
    rimLight.position.set(0, -3, 2);
    scene.add(rimLight);

    // Soft sky / ground fill
    const hemiLight = new THREE.HemisphereLight(0x132247, 0x070b16, 0.8);
    scene.add(hemiLight);

    // ------------------------------------------------------------------------
    // INTERACTION HANDLERS (Pointer drag & hover)
    // ------------------------------------------------------------------------
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      animStateRef.current.isInteracting = true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      animStateRef.current.targetPointerX = nx;
      animStateRef.current.targetPointerY = ny;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        rootGroup.rotation.y += deltaX * 0.008;
        rootGroup.rotation.x = Math.max(-0.4, Math.min(0.4, rootGroup.rotation.x + deltaY * 0.005));
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      animStateRef.current.isInteracting = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw === 0 || nh === 0) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // ------------------------------------------------------------------------
    // ANIMATION & RENDER LOOP (Exponential Damping & Safe Pacing)
    // ------------------------------------------------------------------------
    let frameId = 0;
    let lastTime = performance.now();

    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const state = animStateRef.current;

      // Camera position damping towards target preset
      camera.position.x = THREE.MathUtils.damp(camera.position.x, state.targetCamPos.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, state.targetCamPos.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, state.targetCamPos.z, 3.5, delta);

      // Camera look-at damping
      currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, state.targetLookAt.x, 3.5, delta);
      currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, state.targetLookAt.y, 3.5, delta);
      currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, state.targetLookAt.z, 3.5, delta);
      camera.lookAt(currentLookAt);

      // Subtle mouse hover parallax
      state.pointerX = THREE.MathUtils.damp(state.pointerX, state.targetPointerX, 4.0, delta);
      state.pointerY = THREE.MathUtils.damp(state.pointerY, state.targetPointerY, 4.0, delta);

      if (!isDragging) {
        rootGroup.rotation.y += (state.autoRotate ? 0.35 * delta : 0) + state.pointerX * 0.05 * delta;
        rootGroup.rotation.x = THREE.MathUtils.damp(rootGroup.rotation.x, state.pointerY * 0.15, 2.5, delta);
      }

      // Independent internal coordinate ring rotations
      ringB.rotation.z += 0.25 * delta;
      ringC.rotation.z -= 0.18 * delta;
      ringD.rotation.x += 0.3 * delta;
      ringE.rotation.y -= 0.22 * delta;

      // Jewel core faceted beacon breathing
      beaconMesh.rotation.y += 0.45 * delta;
      beaconMesh.rotation.x += 0.25 * delta;
      innerLight.intensity = 2.0 + Math.sin(now * 0.003) * 0.4;

      // Particle constellation gentle drift
      particleSystem.rotation.y -= 0.04 * delta;

      // Exploded View Expansion along radial vectors
      const exp = state.exploded;
      ringAGeo.parameters.radius; // trigger read
      ringA.scale.setScalar(1 + exp * 0.22);
      ringB.position.z = exp * 0.45;
      ringC.position.y = exp * 0.55;
      ringD.position.x = exp * 0.45;
      ringE.position.y = -exp * 0.4;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        // Safe paced software rendering
        frameId = window.setTimeout(tick, 60);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    if (isSoftwareGl) {
      frameId = window.setTimeout(tick, 60);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    // ------------------------------------------------------------------------
    // CLEANUP DISPOSAL
    // ------------------------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      // Dispose Three.js assets
      pedestalGeo.dispose();
      bronzeRimGeo.dispose();
      upperPlinthGeo.dispose();
      bracketGeo.dispose();
      ringAGeo.dispose();
      ringBGeo.dispose();
      ringCGeo.dispose();
      ringDGeo.dispose();
      ringEGeo.dispose();
      octaGeo.dispose();
      spindleGeo.dispose();
      finialTopGeo.dispose();
      shadowPlaneGeo.dispose();
      particleGeo.dispose();

      champagneGoldMat.dispose();
      brushedBronzeMat.dispose();
      dialRingMat.dispose();
      darkPolishedSteelMat.dispose();
      jewelMat.dispose();
      shadowPlaneMat.dispose();
      particleMat.dispose();
      dialTexture.dispose();
      shadowTex.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] lg:h-[620px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#090e1f] via-[#0d1630] to-[#090e1f] border border-[#c5a059]/15 select-none">
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        aria-label="Interactive 3D Armillary Knowledge Sculpture for SR College of Competitions"
      />

      {/* Minimal Top Brand Badge (Non-occluding) */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-serif tracking-widest text-[#e5c378]/90 uppercase">
          <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Knowledge Astrolabe &amp; Constitutional Pillar</span>
        </div>
        <p className="text-[11px] text-slate-400 font-sans tracking-normal mt-0.5">
          Drag to rotate 3D view · Procedural PBR brass &amp; crystal
        </p>
      </div>

      {/* Ergonomic Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[620px] transition-transform duration-300 ease-out ${
          controlsCollapsed ? 'translate-y-[calc(100%-32px)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse Toggle Tab */}
        <div className="flex justify-center -mb-px">
          <button
            type="button"
            onClick={() => setControlsCollapsed(!controlsCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium tracking-wide uppercase text-[#e5c378] bg-[#0d172e] border-t border-x border-[#c5a059]/30 rounded-t-md hover:bg-[#132247] transition-colors shadow-lg cursor-pointer"
            aria-label={controlsCollapsed ? 'Show 3D controls' : 'Hide 3D controls'}
          >
            {controlsCollapsed ? (
              <>
                <ChevronUp className="w-3 h-3 text-[#c5a059]" />
                <span>Show 3D Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 text-[#c5a059]" />
                <span>Hide 3D Controls</span>
              </>
            )}
          </button>
        </div>

        {/* Unified Horizontal Control Bar */}
        <div className="bg-[#0b132b]/95 border border-[#c5a059]/25 rounded-xl px-4 py-3 shadow-2xl flex flex-wrap items-center justify-between gap-3">
          {/* Camera View Presets */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <Eye className="w-3 h-3 text-[#c5a059]" />
              <span className="hidden sm:inline">View:</span>
            </span>
            <button
              type="button"
              onClick={() => setCameraPreset('perspective')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                activePreset === 'perspective'
                  ? 'bg-[#c5a059] text-[#090e1f] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Perspective
            </button>
            <button
              type="button"
              onClick={() => setCameraPreset('zenith')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                activePreset === 'zenith'
                  ? 'bg-[#c5a059] text-[#090e1f] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Zenith
            </button>
            <button
              type="button"
              onClick={() => setCameraPreset('macro')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                activePreset === 'macro'
                  ? 'bg-[#c5a059] text-[#090e1f] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Core Macro
            </button>
          </div>

          {/* Exploded View Slider */}
          <div className="flex items-center gap-2">
            <label htmlFor="exploded-slider" className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1 cursor-pointer">
              <Sliders className="w-3 h-3 text-[#c5a059]" />
              <span className="hidden sm:inline">Dissect Rings:</span>
            </label>
            <input
              id="exploded-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodedVal}
              onChange={(e) => setExplodedVal(parseFloat(e.target.value))}
              className="w-20 sm:w-28 accent-[#c5a059] bg-slate-800 rounded-lg cursor-pointer"
              title="Dissect concentric rings"
            />
          </div>

          {/* Auto-Rotation Toggle */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border transition-colors cursor-pointer ${
              autoRotate
                ? 'bg-[#132247] border-[#c5a059]/40 text-[#e5c378]'
                : 'bg-transparent border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle continuous rotation"
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'text-[#c5a059]' : ''}`} />
            <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
