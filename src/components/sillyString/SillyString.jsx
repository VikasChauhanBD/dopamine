import { useEffect, useRef, useState } from 'react';
import './SillyString.css';

const SVG_PATH =
  'M80 6h-9v14h9 M114 6h-9 v14h9 M111 13h-6 M77 13h-6 M122 20V6l11 14V6 M22 16.7L33 24l11-7.3V9.3L33 2L22 9.3V16.7z M44 16.7L33 9.3l-11 7.4 M22 9.3l11 7.3 l11-7.3 M33 2v7.3 M33 16.7V24 M88 14h6c2.2 0 4-1.8 4-4s-1.8-4-4-4h-6v14 M15 8c-1.3-1.3-3-2-5-2c-4 0-7 3-7 7s3 7 7 7 c2 0 3.7-0.8 5-2 M64 13c0 4-3 7-7 7h-5V6h5C61 6 64 9 64 13z';

const COLS = ['#ff1493', '#00d9a0', '#ffc400', '#00b8ff', '#ff5533', '#b84dff'];
const COLS_L = ['#ff6ec7', '#66ffc8', '#ffe066', '#66d9ff', '#ff9a75', '#d4a0ff'];
const IGNORE_SELECTOR = '.ss-panel, .ss-reset';

function makeSVG(sw) {
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138 26" fill="none" stroke="#000" stroke-width="' +
    sw +
    '" stroke-linecap="round" stroke-linejoin="round"><path d="' +
    SVG_PATH +
    '"/></svg>'
  );
}

function loadImg(svg) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = 'data:image/svg+xml;base64,' + btoa(svg);
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

const SLIDERS = [
  { key: 'pressure', label: 'Pressure', min: 0, max: 100, value: 50 },
  { key: 'gravity', label: 'Gravity', min: -100, max: 100, value: 30 },
  { key: 'curl', label: 'Curliness', min: 0, max: 100, value: 50 },
  { key: 'thick', label: 'Thickness', min: 0, max: 100, value: 40 },
  { key: 'chaos', label: 'Chaos', min: 0, max: 100, value: 25 },
];

export default function SillyString() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const inputsRef = useRef({});
  const resetRef = useRef(() => {});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const C = canvasRef.current;
    const X = C.getContext('2d');
    let alive = true;
    let rafId = 0;

    let W = 0;
    let H = 0;
    let logoImg = null;
    let collData = null;
    let LS = 1, LOX = 0, LOY = 0, LW = 0, LH = 0;
    let ready = false;
    let buildToken = 0;

    const rv = (key) => +(inputsRef.current[key]?.value ?? 0);

    async function buildLogo() {
      const token = ++buildToken;
      const [logo, collImg] = await Promise.all([
        loadImg(makeSVG(2.3)),
        loadImg(makeSVG(2.5)),
      ]);
      if (!alive || token !== buildToken) return;
      logoImg = logo;
      LS = (W * 0.55) / 138;
      LW = 138 * LS;
      LH = 26 * LS;
      LOX = (W - LW) / 2;
      LOY = (H - LH) / 2;
      const cc = document.createElement('canvas');
      cc.width = W;
      cc.height = H;
      const cx = cc.getContext('2d');
      cx.drawImage(collImg, LOX, LOY, LW, LH);
      collData = cx.getImageData(0, 0, W, H).data;
      ready = true;
    }

    function hit(x, y) {
      if (!ready) return false;
      const ix = Math.round(x);
      const iy = Math.round(y);
      if (ix < 0 || iy < 0 || ix >= W || iy >= H) return false;
      return collData[(iy * W + ix) * 4 + 3] > 30;
    }

    function resize() {
      const w = section.clientWidth;
      const h = section.clientHeight;
      if (!w || !h) return;
      W = C.width = w;
      H = C.height = h;
      buildLogo();
    }

    class Pt {
      constructor(x, y) {
        this.x = x; this.y = y; this.ox = x; this.oy = y;
        this.done = false; this.st = 0;
      }
      update() {
        if (this.done) return;
        const g = (rv('gravity') / 100) * 0.4;
        const vx = (this.x - this.ox) * 0.97;
        const vy = (this.y - this.oy) * 0.97;
        this.ox = this.x; this.oy = this.y;
        this.x += vx; this.y += vy + g;
        if (hit(this.x, this.y)) {
          if (!hit(this.x, this.oy)) { this.y = this.oy; this.oy = this.y; }
          else if (!hit(this.ox, this.y)) { this.x = this.ox; this.ox = this.x; }
          else { this.x = this.ox; this.y = this.oy; }
          this.ox = this.x; this.oy = this.y; this.st += 4;
        }
        if (this.y > H - 1) { this.y = H - 1; this.oy = this.y; this.st += 4; }
        if (this.y < 0) { this.y = 0; this.oy = 0; this.st += 4; }
        if (this.x < 0) this.x = 0;
        if (this.x > W) this.x = W;
        if (this.st > 14) this.done = true;
      }
    }

    class Lk {
      constructor(a, b) { this.a = a; this.b = b; this.l = 2.5; this.broken = false; }
      solve() {
        if (this.broken) return;
        const dx = this.b.x - this.a.x;
        const dy = this.b.y - this.a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 0.001;
        if (d > 25) { this.broken = true; return; }
        const f = ((this.l - d) / d) * 0.25;
        if (!this.a.done) { this.a.x -= dx * f; this.a.y -= dy * f; }
        if (!this.b.done) { this.b.x += dx * f; this.b.y += dy * f; }
      }
    }

    class Strand {
      constructor(i) { this.pts = []; this.lks = []; this.ci = i; }
      add(x, y, vx, vy) {
        const p = new Pt(x, y);
        p.ox = x - vx; p.oy = y - vy;
        if (this.pts.length) this.lks.push(new Lk(this.pts[this.pts.length - 1], p));
        this.pts.push(p);
      }
    }

    let strands = [];
    let ci = 0;
    let mx = 0, my = 0;
    let spraying = false;
    let cur = null;
    let spT = 0;
    let demo = true;
    let demoT = 0;

    resetRef.current = () => { strands = []; cur = null; };

    resize();
    mx = W / 2;
    my = H * 0.2;

    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const inIgnored = (target) => !!(target && target.closest && target.closest(IGNORE_SELECTOR));
    const startStrand = () => {
      spraying = true;
      spT = 0;
      cur = new Strand(ci++ % COLS.length);
      strands.push(cur);
    };
    const setPos = (clientX, clientY) => {
      const r = section.getBoundingClientRect();
      mx = clientX - r.left;
      my = clientY - r.top;
    };

    const onMouseDown = (e) => {
      if (inIgnored(e.target)) return;
      demo = false;
      setPos(e.clientX, e.clientY);
      startStrand();
    };
    const onMouseUp = () => { spraying = false; cur = null; };
    const onMouseMove = (e) => {
      if (demo && !inIgnored(e.target)) { demo = false; spraying = false; cur = null; }
      setPos(e.clientX, e.clientY);
    };
    const onTouchStart = (e) => {
      if (inIgnored(e.target)) return;
      e.preventDefault();
      demo = false;
      setPos(e.touches[0].clientX, e.touches[0].clientY);
      startStrand();
    };
    const onTouchMove = (e) => {
      if (inIgnored(e.target)) return;
      e.preventDefault();
      setPos(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => { spraying = false; cur = null; };

    section.addEventListener('mousedown', onMouseDown);
    section.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    section.addEventListener('touchstart', onTouchStart, { passive: false });
    section.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    const CW = 18, CH = 46, NX = 10, NY = -CH / 2 - 3;

    function aimAngle(cx, cy) {
      const rawA = Math.atan2(LOY + LH / 2 - cy, LOX + LW / 2 - cx);
      return Math.atan2(Math.sin(rawA) * 0.15, Math.cos(rawA));
    }

    function tipWorld(cx, cy, rot) {
      return {
        x: cx + NX * Math.cos(rot) - NY * Math.sin(rot),
        y: cy + NX * Math.sin(rot) + NY * Math.cos(rot),
      };
    }

    function drawCan(ctx, cx, cy) {
      const a = aimAngle(cx, cy);
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.08)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
      const bg = ctx.createLinearGradient(-CW / 2, 0, CW / 2, 0);
      bg.addColorStop(0, '#9a2020'); bg.addColorStop(0.13, '#d43530');
      bg.addColorStop(0.4, '#ee4e48'); bg.addColorStop(0.6, '#e84040');
      bg.addColorStop(0.85, '#d43530'); bg.addColorStop(1, '#8a1818');
      ctx.fillStyle = bg; roundRect(ctx, -CW / 2, -CH / 2, CW, CH, 4); ctx.fill();
      ctx.restore();
      const m = ctx.createLinearGradient(-CW / 2, 0, CW / 2, 0);
      m.addColorStop(0, '#aaa'); m.addColorStop(0.4, '#ddd'); m.addColorStop(1, '#999');
      ctx.fillStyle = m;
      roundRect(ctx, -CW / 2 + 1, CH / 2 - 3, CW - 2, 3, 1); ctx.fill();
      roundRect(ctx, -CW / 2 + 1, -CH / 2, CW - 2, 3, 1); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      roundRect(ctx, -CW / 2 + 2, -5, CW - 4, 12, 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.font = 'bold 4px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('SILLY', 0, 1); ctx.fillText('STRING', 0, 5.5);
      ctx.fillStyle = m; roundRect(ctx, -5, -CH / 2 - 4, 10, 5, 2); ctx.fill();
      ctx.fillStyle = cur ? COLS[cur.ci] : '#d44';
      ctx.beginPath(); ctx.ellipse(0, -CH / 2 - 5, 4, 2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#bbb'; ctx.beginPath();
      ctx.moveTo(2, -CH / 2 - 3); ctx.lineTo(NX - 1, NY - 1);
      ctx.lineTo(NX - 1, NY + 2); ctx.lineTo(2, -CH / 2 + 1);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#888'; ctx.beginPath(); ctx.arc(NX, NY, 2, 0, Math.PI * 2); ctx.fill();
      if (spraying && cur) {
        for (let i = 0; i < 3; i++) {
          const d = 1 + Math.random() * 5;
          ctx.fillStyle = COLS[cur.ci]; ctx.globalAlpha = 0.08 + Math.random() * 0.1;
          ctx.beginPath();
          ctx.arc(NX + d, NY + (Math.random() - 0.5) * 3, 0.3 + Math.random() * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    }

    function emitFrom(cx, cy) {
      if (!cur) return;
      spT++;
      const a = aimAngle(cx, cy);
      const tip = tipWorld(cx, cy, a);
      const pressure = 3 + (rv('pressure') / 100) * 11;
      const curlAmt = (rv('curl') / 100) * 4;
      const chaos = (rv('chaos') / 100) * 1.2;
      for (let j = 0; j < 3; j++) {
        const speed = pressure + Math.random() * 2;
        const curl = Math.sin(spT * 0.35 + j * 1.7) * curlAmt;
        const wobble = (Math.random() - 0.5) * (0.15 + chaos);
        const pa = a + Math.PI / 2;
        cur.add(
          tip.x,
          tip.y,
          Math.cos(a + wobble) * speed + Math.cos(pa) * curl,
          Math.sin(a + wobble) * speed + Math.sin(pa) * curl
        );
      }
      let tot = 0;
      for (const s of strands) tot += s.pts.length;
      while (tot > 8000 && strands.length > 1) {
        const o = strands[0];
        if (o === cur) break;
        if (o.pts.length) { o.pts.shift(); o.lks.shift(); tot--; }
        else strands.shift();
      }
    }

    function drawStrands(ctx) {
      const thick = 0.5 + (rv('thick') / 100) * 3.5;
      for (const s of strands) {
        if (s.pts.length < 2) continue;
        const pts = s.pts, lks = s.lks, col = COLS[s.ci], colL = COLS_L[s.ci];
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          if (i - 1 < lks.length && lks[i - 1].broken) { ctx.moveTo(pts[i].x, pts[i].y); continue; }
          const dx = pts[i].x - pts[i - 1].x;
          const dy = pts[i].y - pts[i - 1].y;
          if (dx * dx + dy * dy > 600) { ctx.moveTo(pts[i].x, pts[i].y); continue; }
          ctx.quadraticCurveTo(
            pts[i - 1].x, pts[i - 1].y,
            (pts[i - 1].x + pts[i].x) / 2, (pts[i - 1].y + pts[i].y) / 2
          );
        }
        ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = 2;
        ctx.strokeStyle = col; ctx.globalAlpha = 0.12; ctx.lineWidth = thick + 2; ctx.stroke();
        ctx.restore();
        ctx.strokeStyle = col; ctx.globalAlpha = 0.9; ctx.lineWidth = thick; ctx.stroke();
        ctx.strokeStyle = colL; ctx.globalAlpha = 0.2; ctx.lineWidth = thick * 0.3; ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    function tick() {
      if (!alive) return;
      demoT++;
      let canX = mx, canY = my;
      if (demo) {
        canX = W * 0.1 + ((Math.sin(demoT * 0.008) + 1) / 2) * W * 0.8;
        canY = H * 0.12 + Math.sin(demoT * 0.03) * 10;
        if (demoT % 2 === 0) {
          if (!cur || cur.pts.length > 150) {
            cur = new Strand(ci++ % COLS.length);
            strands.push(cur);
          }
          spraying = true;
        }
      }
      X.clearRect(0, 0, W, H);
      X.fillStyle = '#f4f1ec'; X.fillRect(0, 0, W, H);
      if (spraying) emitFrom(canX, canY);
      for (const s of strands) {
        for (const p of s.pts) p.update();
        for (let i = 0; i < 2; i++) for (const k of s.lks) k.solve();
      }
      drawStrands(X);
      if (logoImg) X.drawImage(logoImg, LOX, LOY, LW, LH);
      drawCan(X, canX, canY);
      rafId = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      section.removeEventListener('mousedown', onMouseDown);
      section.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <section className="ss-section" ref={sectionRef}>
      <canvas className="ss-canvas" ref={canvasRef} />

      <button type="button" className="ss-reset" onClick={() => resetRef.current()}>
        Reset
      </button>

      <div className="ss-panel">
        <button
          type="button"
          className={'ss-toggle' + (open ? ' ss-active' : '')}
          onClick={() => setOpen((v) => !v)}
        >
          Experiment ↕
        </button>
        <div className={'ss-controls' + (open ? ' ss-open' : '')}>
          {SLIDERS.map((s) => (
            <label className="ss-label" key={s.key}>
              <span className="ss-label-text">{s.label}</span>
              <input
                className="ss-range"
                type="range"
                min={s.min}
                max={s.max}
                defaultValue={s.value}
                ref={(el) => { inputsRef.current[s.key] = el; }}
              />
            </label>
          ))}
        </div>
      </div>

      <a
        className="ss-link"
        href="https://calculatequick.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        calculatequick.com
      </a>
    </section>
  );
}
