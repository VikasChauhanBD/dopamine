import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./SpiralGallery.css";

const imageUrls = [
  "https://images.unsplash.com/photo-1638959882708-9503b1cd595f?w=800&q=80",
  "https://images.unsplash.com/photo-1644469709847-454ef12d5144?w=800&q=80",
  "https://images.unsplash.com/photo-1731848356615-90cba9fdc862?w=800&q=80",
  "https://images.unsplash.com/photo-1688388040015-c3985c83a12d?w=800&q=80",
  "https://images.unsplash.com/photo-1726591383648-5b5cbe1da1a2?w=800&q=80",
  "https://images.unsplash.com/photo-1651745314014-a9432659af40?w=800&q=80",
  "https://images.unsplash.com/photo-1635585244467-134d68caad51?w=800&q=80",
  "https://images.unsplash.com/photo-1517498327491-f903e1e281cd?w=800&q=80",
  "https://images.unsplash.com/photo-1584969405346-5230ae2bc4fc?w=800&q=80",
  "https://images.unsplash.com/photo-1615212049275-95561aebe1b4?w=800&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
  "https://images.unsplash.com/photo-1516727003284-a96541e51e9c?w=800&q=80",
  "https://images.unsplash.com/photo-1530735038726-a73fd6e6a349?w=800&q=80",
  "https://images.unsplash.com/photo-1548918901-9b31223c5c3a?w=800&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
  "https://images.unsplash.com/photo-1553544260-f87e671974ee?w=800&q=80",
  "https://images.unsplash.com/photo-1512084747998-038941f49b84?w=800&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
  "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80",
  "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=800&q=80",
  "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=800&q=80",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&q=80",
  "https://images.unsplash.com/photo-1593010932917-92bd21088dee?w=800&q=80",
];

const FULLSCREEN_ICONS = {
  enter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  ),
  exit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </svg>
  ),
};

const SpiralGallery = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(true);

  /* ---------------- Fullscreen button ---------------- */
  useEffect(() => {
    const el = document.documentElement;
    if (
      !(
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen
      )
    ) {
      setFullscreenSupported(false);
    }

    const getFsElement = () =>
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    const onChange = () => setIsFullscreen(!!getFsElement());
    const events = [
      "fullscreenchange",
      "webkitfullscreenchange",
      "mozfullscreenchange",
      "MSFullscreenChange",
    ];
    events.forEach((ev) => document.addEventListener(ev, onChange));
    return () =>
      events.forEach((ev) => document.removeEventListener(ev, onChange));
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (isFullscreen) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen)
          await document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen)
          await document.mozCancelFullScreen();
        else if (document.msExitFullscreen) await document.msExitFullscreen();
      } else {
        const el = sectionRef.current || document.documentElement;
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        else if (el.mozRequestFullScreen) await el.mozRequestFullScreen();
        else if (el.msRequestFullscreen) await el.msRequestFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  /* ---------------- Three.js spiral ---------------- */
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!container || !canvas || !section) return;

    let disposed = false;
    let rafId = null;

    const numberOfImages = imageUrls.length;
    let scene, camera, renderer, spiralMesh, tiltGroup, shaderMaterial, texture;
    let scrollOffset = 0;
    let isDragging = false;
    let isHovering = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragRotation = { x: 0, z: 0 };
    let baseRotation = { x: 0, z: 0 };
    const imageRatios = [];

    const inertiaParams = {
      friction: 0.94,
      strength: 0.8,
      maxSpeed: 0.05,
      directionSmoothing: 0.92,
      scrollSensitivity: 0.0008,
    };

    const config = {
      imageHeight: 7,
      curvature: -0.03,
      gapSize: 0,
      spiralRadius: 3.5,
      spiralTurns: 2.8 + (numberOfImages - 21) * 0.1,
      spiralHeight: 12 + (numberOfImages - 21) * 0.25,
      centerX: -2,
      centerY: 4.38,
      centerZ: 0,
    };

    const originalPositions = [];

    let targetVelocity = 0;
    let currentVelocity = 0;

    let touchLastY = 0;
    let touchVelocity = 0;
    let isTouching = false;

    let wheelAcceleration = 0;
    let zoomLevel = 1.0;

    const getSize = () => ({
      w: container.clientWidth || 1,
      h: container.clientHeight || 1,
    });

    function updateUVOffset() {
      if (!shaderMaterial) return;
      let offset = scrollOffset;
      while (offset >= 1.0) offset -= 1.0;
      while (offset < 0) offset += 1.0;
      shaderMaterial.uniforms.offset.value = offset;
    }

    function updateTouchInertia() {
      if (!isTouching) {
        touchVelocity *= 0.95;
        if (Math.abs(touchVelocity) > 0.0001) {
          scrollOffset += touchVelocity * 0.5;
          updateUVOffset();
        } else {
          touchVelocity = 0;
        }
      }
    }

    function updateInertia() {
      targetVelocity *= inertiaParams.friction;
      currentVelocity = currentVelocity * 0.85 + targetVelocity * 0.15;

      if (Math.abs(currentVelocity) > 0.0001) {
        scrollOffset += currentVelocity;
        updateUVOffset();
      } else {
        currentVelocity = 0;
        targetVelocity = 0;
        wheelAcceleration = 0;
      }

      updateTouchInertia();
    }

    function rebuildGeometry() {
      if (!spiralMesh) return;

      const totalSlots = imageRatios.length;
      const widths = imageRatios.map((r) => r * config.imageHeight);
      const totalWidth = widths.reduce((a, b) => a + b, 0);
      const segmentsW = 200 + totalSlots * 20;
      const segmentsH = 24;

      const geometry = new THREE.PlaneGeometry(
        totalWidth,
        config.imageHeight,
        segmentsW,
        segmentsH,
      );
      const positions = geometry.attributes.position;
      const uvs = geometry.attributes.uv;

      const origX = [];
      const origY = [];
      for (let i = 0; i < positions.count; i++) {
        origX.push(positions.getX(i));
        origY.push(positions.getY(i));
      }

      const cumulative = [0];
      for (let i = 0; i < totalSlots; i++) {
        cumulative.push(cumulative[i] + widths[i] / totalWidth);
      }

      const imageRatio = 1 - config.gapSize;

      for (let i = 0; i < uvs.count; i++) {
        let u = uvs.getX(i);
        u = Math.max(0, Math.min(0.999999, u));

        let found = false;
        for (let j = 0; j < totalSlots; j++) {
          if (u >= cumulative[j] && u < cumulative[j + 1]) {
            const localU =
              (u - cumulative[j]) / (cumulative[j + 1] - cumulative[j]);

            if (localU > imageRatio) {
              uvs.setX(i, cumulative[j + 1] - 0.001);
            } else {
              let scaledU = localU / imageRatio;
              const edgeMargin = 0.001;
              scaledU = Math.max(edgeMargin, Math.min(1 - edgeMargin, scaledU));
              const newU =
                cumulative[j] + scaledU * (cumulative[j + 1] - cumulative[j]);
              uvs.setX(i, newU);
            }
            found = true;
            break;
          }
        }

        if (!found) {
          uvs.setX(i, cumulative[totalSlots] - 0.001);
        }
      }

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const nx = x / (totalWidth / 2);
        const curve = config.curvature * 0.4 * (nx * nx - 1);
        positions.setXYZ(i, x, y, -curve);
      }

      for (let i = 0; i < positions.count; i++) {
        const x = origX[i];
        const y = origY[i];
        let t = (x + totalWidth / 2) / totalWidth;
        t = Math.max(0, Math.min(1, t));

        const angle = t * Math.PI * 2 * config.spiralTurns;
        const radius = config.spiralRadius * (1 - t * 0.12);
        let px = Math.sin(angle) * radius;
        let pz = Math.cos(angle) * radius;
        let py = (t - 0.5) * config.spiralHeight + y * 0.35;

        if (!originalPositions[i]) {
          originalPositions[i] = {
            x: px,
            y: py,
            z: pz,
            offsetX: (Math.random() - 0.5) * 0.001,
            offsetY: (Math.random() - 0.5) * 0.001,
            offsetZ: (Math.random() - 0.5) * 0.001,
          };
        }

        px += originalPositions[i].offsetX;
        py += originalPositions[i].offsetY;
        pz += originalPositions[i].offsetZ;

        positions.setXYZ(i, px, py, pz);
      }

      geometry.computeVertexNormals();

      const oldGeo = spiralMesh.geometry;
      spiralMesh.geometry = geometry;
      if (oldGeo) oldGeo.dispose();

      if (shaderMaterial) {
        shaderMaterial.uniforms.gap.value = config.gapSize;
      }
    }

    function createMasterTexture() {
      return new Promise((resolve) => {
        const masterCanvas = document.createElement("canvas");
        const ctx = masterCanvas.getContext("2d");

        const baseHeight = 500;
        let loaded = 0;
        const images = [];

        imageUrls.forEach((url, idx) => {
          const img = new Image();
          img.crossOrigin = "Anonymous";

          img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight;
            imageRatios[idx] = ratio;
            const width = baseHeight * ratio;

            images[idx] = { img, width, height: baseHeight };
            loaded++;

            if (loaded === numberOfImages) {
              const totalWidth = images.reduce(
                (sum, i) => sum + (i ? i.width : 0),
                0,
              );
              masterCanvas.width = totalWidth;
              masterCanvas.height = baseHeight;
              ctx.fillStyle = "#000000";
              ctx.fillRect(0, 0, masterCanvas.width, masterCanvas.height);

              let offsetX = 0;
              images.forEach((data) => {
                if (data && data.img) {
                  ctx.drawImage(data.img, offsetX, 0, data.width, data.height);
                }
                if (data) offsetX += data.width;
              });

              const tex = new THREE.CanvasTexture(masterCanvas);
              tex.wrapS = THREE.RepeatWrapping;
              tex.wrapT = THREE.ClampToEdgeWrapping;
              tex.minFilter = THREE.LinearFilter;
              tex.magFilter = THREE.LinearFilter;
              tex.generateMipmaps = false;
              resolve(tex);
            }
          };

          img.onerror = () => {
            imageRatios[idx] = 0.8;
            loaded++;
            if (loaded === numberOfImages) {
              const tex = new THREE.CanvasTexture(masterCanvas);
              resolve(tex);
            }
          };

          img.src = url;
        });
      });
    }

    /* ---------- Event handlers (none block page scroll) ---------- */
    const onWheel = (e) => {
      const rawDelta =
        e.deltaY * inertiaParams.scrollSensitivity * inertiaParams.strength;

      const maxAccel = 0.015;
      let deltaAccel = rawDelta - wheelAcceleration;
      deltaAccel = Math.max(-maxAccel, Math.min(maxAccel, deltaAccel));
      wheelAcceleration += deltaAccel;
      wheelAcceleration = Math.max(-0.03, Math.min(0.03, wheelAcceleration));

      targetVelocity =
        targetVelocity * inertiaParams.directionSmoothing +
        wheelAcceleration * (1 - inertiaParams.directionSmoothing);
      targetVelocity = Math.max(
        -inertiaParams.maxSpeed,
        Math.min(inertiaParams.maxSpeed, targetVelocity),
      );
    };

    const onMouseEnter = () => {
      isHovering = true;
    };
    const onMouseLeave = () => {
      isHovering = false;
    };

    // Arrow-key zoom only runs while the pointer is over this section
    const onKeyDown = (e) => {
      if (!isHovering) return;
      if (e.key === "ArrowRight") {
        zoomLevel = Math.min(1, zoomLevel + 0.05);
      } else if (e.key === "ArrowLeft") {
        zoomLevel = Math.max(0.84, zoomLevel - 0.05);
      } else {
        return;
      }
      camera.position.z = 9 / zoomLevel;
      camera.position.y = 3.5 / zoomLevel;
    };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      container.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - previousMousePosition.x;
      const dy = e.clientY - previousMousePosition.y;
      dragRotation.z += dx * 0.002;
      dragRotation.x -= dy * 0.002;
      dragRotation.x = Math.max(-0.35, Math.min(0.35, dragRotation.x));
      dragRotation.z = Math.max(-0.35, Math.min(0.35, dragRotation.z));
      tiltGroup.rotation.x = baseRotation.x + dragRotation.x;
      tiltGroup.rotation.z = baseRotation.z + dragRotation.z;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    const onTouchStart = (e) => {
      isTouching = true;
      touchLastY = e.touches[0].clientY;
      touchVelocity = 0;
    };

    const onTouchMove = (e) => {
      if (!isTouching) return;
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - touchLastY;

      const rawVelocity =
        deltaY * inertiaParams.scrollSensitivity * inertiaParams.strength * 0.5;
      touchVelocity = touchVelocity * 0.7 + rawVelocity * 0.3;

      scrollOffset +=
        deltaY * inertiaParams.scrollSensitivity * inertiaParams.strength * 0.8;
      updateUVOffset();

      touchLastY = currentY;
    };

    const onTouchEnd = () => {
      isTouching = false;
      if (Math.abs(touchVelocity) > 0.001) {
        targetVelocity = touchVelocity * 1.2;
        targetVelocity = Math.max(
          -inertiaParams.maxSpeed * 1.5,
          Math.min(inertiaParams.maxSpeed * 1.5, targetVelocity),
        );
      }
      touchVelocity = 0;
    };

    const onResize = () => {
      if (!camera || !renderer) return;
      const { w, h } = getSize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    function animate() {
      rafId = requestAnimationFrame(animate);
      updateInertia();
      renderer.render(scene, camera);
    }

    /* ---------- Init ---------- */
    async function init() {
      const { w, h } = getSize();

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
      camera.position.set(0, 3.5, 9);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(w, h, false);

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
      mainLight.position.set(5, 8, 5);
      scene.add(mainLight);

      tiltGroup = new THREE.Group();
      baseRotation = { x: -0.18, z: 0.12 };
      tiltGroup.rotation.x = baseRotation.x;
      tiltGroup.rotation.z = baseRotation.z;
      scene.add(tiltGroup);

      texture = await createMasterTexture();
      if (disposed) {
        texture.dispose();
        renderer.dispose();
        return;
      }

      shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texture },
          gap: { value: config.gapSize },
          offset: { value: 0.0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D map;
          uniform float gap;
          uniform float offset;
          varying vec2 vUv;

          void main() {
            float u = vUv.x + offset;

            if (u >= 1.0) u -= 1.0;
            if (u < 0.0) u += 1.0;

            vec4 color = texture2D(map, vec2(u, vUv.y));
            gl_FragColor = color;
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      });

      spiralMesh = new THREE.Mesh(new THREE.BufferGeometry(), shaderMaterial);
      spiralMesh.position.set(config.centerX, config.centerY, config.centerZ);
      spiralMesh.rotation.x = 0.35;
      spiralMesh.rotation.y = 0;
      tiltGroup.add(spiralMesh);

      rebuildGeometry();

      window.addEventListener("resize", onResize);
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      section.addEventListener("mouseenter", onMouseEnter);
      section.addEventListener("mouseleave", onMouseLeave);
      container.addEventListener("wheel", onWheel, { passive: true });
      container.addEventListener("mousedown", onMouseDown);
      container.addEventListener("touchstart", onTouchStart, { passive: true });
      container.addEventListener("touchmove", onTouchMove, { passive: true });
      container.addEventListener("touchend", onTouchEnd);

      animate();
    }

    container.style.cursor = "grab";
    init();

    /* ---------- Cleanup ---------- */
    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);

      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);

      if (spiralMesh && spiralMesh.geometry) spiralMesh.geometry.dispose();
      if (shaderMaterial) shaderMaterial.dispose();
      if (texture) texture.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <section className="spiral-gallery" ref={sectionRef}>
      <div className="spiral-webgl-container" ref={containerRef}>
        <canvas className="spiral-webgl-canvas" ref={canvasRef} />
      </div>

      <div className="spiral-content">
        <h2 className="spiral-heading">Infinite Gallery</h2>
        <p className="spiral-description">
          An endless spiral of images that you can scroll, drag and explore.
          Every frame flows into the next, creating a continuous loop of
          visuals. Move through the collection at your own pace and discover
          something new with every turn.
        </p>
      </div>

      {fullscreenSupported && (
        <button
          type="button"
          className="spiral-fullscreen-btn"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? FULLSCREEN_ICONS.exit : FULLSCREEN_ICONS.enter}
        </button>
      )}
    </section>
  );
};

export default SpiralGallery;
