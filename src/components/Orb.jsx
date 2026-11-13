import { useEffect, useRef } from "react";

export default function Orb() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let lastTime = 0;
    let angle = 0.4;

    const latitudes = 42;
    const longitudes = 90;
    const points = [];
    const edges = [];
    for (let lat = 0; lat <= latitudes; lat++) {
      const phi = (Math.PI * lat) / latitudes;
      for (let lon = 0; lon < longitudes; lon++) {
        const theta = (2 * Math.PI * lon) / longitudes;
        const ripple = 1 + 0.022 * Math.sin(phi * 10 + theta * 3);
        points.push([
          Math.sin(phi) * Math.cos(theta) * ripple,
          Math.cos(phi) * ripple,
          Math.sin(phi) * Math.sin(theta) * ripple,
        ]);
        const index = lat * longitudes + lon;
        edges.push([index, lat * longitudes + ((lon + 1) % longitudes)]);
        if (lat > 0 && lon % 2 === 0) edges.push([index, index - longitudes]);
      }
    }

    function draw() {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.51;
      const cy = height * 0.47;
      const radius = Math.min(width * 0.335, height * 0.355);
      const tilt = -0.38;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // A soft-lit solid core lends depth to a real, projected wire mesh.
      const fill = ctx.createRadialGradient(
        cx - radius * 0.5,
        cy - radius * 0.5,
        0,
        cx,
        cy,
        radius,
      );
      fill.addColorStop(0, "#815035");
      fill.addColorStop(0.45, "#49301f");
      fill.addColorStop(0.85, "#201e16");
      fill.addColorStop(1, "#141a13");
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.36);
      ctx.strokeStyle = "rgba(178, 164, 119, .25)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.35, radius * 0.54, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.rotate(0.95);
      ctx.strokeStyle = "rgba(178, 164, 119, .11)";
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.31, radius * 0.86, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.995, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.fill();

      const projected = points.map(([x, y, z]) => {
        const rx = x * cosA + z * sinA;
        const rz = -x * sinA + z * cosA;
        const perspective = 1 + rz * 0.055;
        return [
          cx + (rx * cosT - y * sinT) * radius * perspective,
          cy + (rx * sinT + y * cosT) * radius * perspective,
          rz,
        ];
      });
      const shades = [
        "rgba(181, 134, 83, .1)",
        "rgba(214, 153, 94, .23)",
        "rgba(255, 173, 105, .58)",
        "rgba(255, 190, 129, .85)",
      ];
      for (let shade = 0; shade < 4; shade++) {
        ctx.beginPath();
        for (const [a, b] of edges) {
          const p = projected[a];
          const q = projected[b];
          const depth = (p[2] + q[2]) / 2;
          if (Math.min(3, Math.max(0, Math.floor((depth + 1) * 2))) !== shade)
            continue;
          ctx.moveTo(p[0], p[1]);
          ctx.lineTo(q[0], q[1]);
        }
        ctx.strokeStyle = shades[shade];
        ctx.lineWidth = shade === 3 ? 0.8 : 0.6;
        ctx.stroke();
      }

      // The foreground orbital arc passes in front of the sphere.
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.36);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.35, radius * 0.54, 0, 0.12, Math.PI - 0.12);
      ctx.strokeStyle = "rgba(223, 188, 139, .48)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      const orbitAngle = 0.9 + angle * 0.3;
      const satelliteX = Math.cos(orbitAngle) * radius * 1.35;
      const satelliteY = Math.sin(orbitAngle) * radius * 0.54;
      ctx.shadowColor = "#ffb080";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(satelliteX, satelliteY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ffbe94";
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(satelliteX, satelliteY, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 190, 148, .3)";
      ctx.stroke();
      ctx.restore();

      for (let i = 17; i < projected.length; i += 137) {
        const [x, y, z] = projected[i];
        if (z < 0.25) continue;
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 218, 173, .85)";
        ctx.fill();
      }
    }

    function animate(time) {
      frame = 0;
      if (!visible || document.hidden || motion.matches) return;
      if (time - lastTime > 32) {
        angle += 0.0018;
        draw();
        lastTime = time;
      }
      frame = requestAnimationFrame(animate);
    }
    function start() {
      if (!frame && visible && !document.hidden && !motion.matches)
        frame = requestAnimationFrame(animate);
    }
    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
      start();
    }
    function onVisibility() {
      start();
    }
    function onMotion() {
      if (motion.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        draw();
      } else start();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return <canvas id="orb-canvas" ref={canvasRef} />;
}
