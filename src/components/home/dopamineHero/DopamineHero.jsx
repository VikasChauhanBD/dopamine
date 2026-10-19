import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./DopamineHero.css";

gsap.registerPlugin(useGSAP);

const BG_IMAGE =
  "https://cdn.dribbble.com/userupload/49257144/file/9528f54c111db4c0cf91443c9969556e.png";

/* ---------- Tuning ---------- */
const RENDER_SCALE = 0.4; // smoke renders at 40% size, CSS upscales it smoothly (lower = faster)
const MAX_BUFFER_WIDTH = 900; // hard cap on the smoke buffer width in px
const TIME_SPEED = 0.9; // overall smoke speed
const MOUSE_FOLLOW = 4; // how quickly the cursor glow follows the pointer
const HOVER_FADE = 3; // how quickly the cursor glow fades in/out

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;   // 0..1, origin bottom-left
  uniform float u_time;
  uniform float u_hover;  // 0..1 eased hover strength

  // Cheap sin-free hash (stable at large coordinates)
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  // Based on Morgan McGuire @morgan3d
  float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }

  // Same 6-octave fbm as the original smoke (this is what gives it the soft, billowy look)
  #define OCTAVES 6
  float fbm(in vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < OCTAVES; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // Brand palette (9 stops):
  // #ff6a00 #ff00cc #7b2cff #007bff #007bff #7b2cff #ff00cc
  vec3 palette(float p) {
    p = clamp(p, 0.0, 1.0) * 8.0;
    vec3 c0 = vec3(1.000, 0.416, 0.000);
    vec3 c1 = vec3(1.000, 0.000, 0.800);
    vec3 c2 = vec3(0.482, 0.173, 1.000);
    vec3 c3 = vec3(0.000, 0.482, 1.000);
    vec3 c4 = vec3(0.000, 0.482, 1.000);
    vec3 c5 = vec3(0.482, 0.173, 1.000);
    vec3 c6 = vec3(1.000, 0.000, 0.800);
    vec3 c7 = vec3(0.949, 0.529, 0.020);
    vec3 c8 = vec3(0.949, 0.361, 0.020);

    vec3 col = c0;
    col = mix(col, c1, smoothstep(0.0, 1.0, p));
    col = mix(col, c2, smoothstep(1.0, 2.0, p));
    col = mix(col, c3, smoothstep(2.0, 3.0, p));
    col = mix(col, c4, smoothstep(3.0, 4.0, p));
    col = mix(col, c5, smoothstep(4.0, 5.0, p));
    col = mix(col, c6, smoothstep(5.0, 6.0, p));
    col = mix(col, c7, smoothstep(6.0, 7.0, p));
    col = mix(col, c8, smoothstep(7.0, 8.0, p));
    return col;
  }

  void main() {
    float aspect = u_resolution.x / u_resolution.y;

    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= aspect;
    st *= 2.0;

    // Cursor glow position (same space as st), measured before any wind shift
    vec2 m = u_mouse;
    m.x *= aspect;
    m *= 2.0;
    float dist = distance(st, m);
    float glow = exp(-dist * dist * 1.0) * u_hover;

    float t = u_time;

    // ---- Original smoke structure ----
    float contraints = fbm(st - 0.332 * t);

    vec2 r = vec2(0.410, -0.210) * (t * 0.736);
    r.x = fbm(st + vec2(-0.410, 0.560) - 0.0178 * t);

    float f = fbm(st + r);

    // Smoke body (same f*f shaping as the original), tinted by the brand palette
    float shape = f * f * 2.2 + 0.35 * clamp(length(r.x), 0.0, 1.0);
    vec3 low = palette(clamp((r.x - 0.15) * 1.7, 0.0, 1.0)) * shape;

    // Background haze (the original's "purple minus noise" layer)
    vec3 high = palette(clamp(0.5 + (contraints - 0.5) * 1.1, 0.0, 1.0))
                * (0.30 + contraints * 0.65);

    vec3 color = mix(low, high, clamp(st.y * 0.55, 0.0, 1.0));

    // Extra layer of drifting wisps so the smoke fills more of the screen
    float wisps = fbm(st * 1.5 + vec2(t * 0.10, -t * 0.07));
    color += palette(clamp(wisps * 1.3 + 0.1, 0.0, 1.0))
             * smoothstep(0.35, 0.85, wisps) * 0.40;

    // Soft glow where the cursor is
    color += palette(clamp(f * 1.2, 0.0, 1.0)) * glow * (0.20 + f * 0.40);

    gl_FragColor = vec4(min(color, vec3(1.0)), 1.0);
  }
`;

export default function DopamineHero({
  presenter = "Vidya Jeevan Presents",
  title = "DOPAMINE",
  tagline = "Get High On Life.",
  date = "14 November 2026",
  headline = "Your people. Your music. Your moment.",
  description = "An evening of live music, DJ, games, food, entertainment and a felicitation ceremony for the stars of the day.",
  ctaLabel = "Let's get into it",
  ctaHref = "#",
  onCtaClick,
}) {
  const sectionRef = useRef(null);
  const canvasWrapRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = canvasWrapRef.current;
    if (!section || !wrap) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      });
    } catch (err) {
      // WebGL unavailable: the static background image still shows
      return;
    }

    renderer.setPixelRatio(1);
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_hover: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    // ----- sizing: render small, let the browser upscale smoothly -----
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = section;
      if (!w || !h) return;
      const scale = Math.min(RENDER_SCALE, MAX_BUFFER_WIDTH / w);
      const bw = Math.max(2, Math.round(w * scale));
      const bh = Math.max(2, Math.round(h * scale));
      renderer.setSize(bw, bh, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      uniforms.u_resolution.value.set(bw, bh);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    // ----- pointer / hover -----
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    let targetHover = 0;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      targetMouse.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height,
      );
      targetHover = 1;
    };
    const onLeave = () => {
      targetHover = 0;
    };

    const passive = { passive: true };
    section.addEventListener("pointermove", onMove, passive);
    section.addEventListener("pointerdown", onMove, passive);
    section.addEventListener("pointerleave", onLeave, passive);
    section.addEventListener("pointercancel", onLeave, passive);

    // ----- loop (frame-rate independent, pauses when off-screen) -----
    let time = 0;
    let prevNow = performance.now();
    let raf = 0;
    let running = false;

    const animate = () => {
      raf = requestAnimationFrame(animate);

      const now = performance.now();
      const dt = Math.min((now - prevNow) / 1000, 0.05);
      prevNow = now;

      time += dt * TIME_SPEED;
      uniforms.u_time.value = time;
      uniforms.u_mouse.value.lerp(
        targetMouse,
        1 - Math.exp(-dt * MOUSE_FOLLOW),
      );
      uniforms.u_hover.value +=
        (targetHover - uniforms.u_hover.value) *
        (1 - Math.exp(-dt * HOVER_FADE));

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      prevNow = performance.now();
      raf = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(section);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerdown", onMove);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointercancel", onLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === wrap) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ----- GSAP intro animation (text + CTA) -----
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(
        ".dp-smoke",
        { opacity: 0, duration: 2.2, ease: "power1.inOut" },
        0,
      )
        .from(
          ".dp-presenter",
          { y: 20, opacity: 0, letterSpacing: "0.9em", duration: 1.1 },
          0.2,
        )
        .from(
          ".dp-letter",
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -70,
            transformOrigin: "50% 100%",
            duration: 1,
            ease: "power4.out",
            stagger: 0.07,
          },
          0.4,
        )
        .from(".dp-tagline", { y: 30, opacity: 0, duration: 0.8 }, "-=0.45")
        .from(".dp-date", { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".dp-headline", { y: 28, opacity: 0, duration: 0.8 }, "-=0.45")
        .from(".dp-description", { y: 24, opacity: 0, duration: 0.8 }, "-=0.55")
        .from(
          ".dp-cta-wrap",
          {
            y: 30,
            scale: 0.8,
            opacity: 0,
            duration: 0.9,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        // gentle float on the CTA once it has landed
        .to(".dp-cta-wrap", {
          y: -5,
          duration: 1.6,
          ease: "sine.inOut",
        });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="dp-hero"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      {/* Dims the background image so the smoke stands out */}
      <div className="dp-dim" aria-hidden="true" />

      {/* Smoke shader canvas (blended over the dimmed image) */}
      <div ref={canvasWrapRef} className="dp-smoke" aria-hidden="true" />

      {/* Soft dark glow behind the text for readability */}
      <div className="dp-overlay" aria-hidden="true" />

      <div className="dp-content">
        <p className="dp-presenter">{presenter}</p>

        <h1 className="dp-title" aria-label={title}>
          {title.split("").map((char, i) => (
            <span key={i} className="dp-letter" aria-hidden="true">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p className="dp-tagline">{tagline}</p>

        <p className="dp-date">{date}</p>

        <h2 className="dp-headline">{headline}</h2>

        <p className="dp-description">{description}</p>

        <div className="dp-cta-wrap">
          <a className="dp-cta" href={ctaHref} onClick={onCtaClick}>
            <span>{ctaLabel}</span>
            <svg
              className="dp-cta-arrow"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7M9 7h8v8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
