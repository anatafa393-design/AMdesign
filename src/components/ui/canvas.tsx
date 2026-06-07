"use client";

export function renderCanvas() {
  // Disable canvas animation on mobile to improve performance
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return () => {};
  }

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx: any = canvas.getContext("2d");
  if (!ctx) return;

  ctx.running = true;
  ctx.frame = 1;

  function n(e: any) {
    // @ts-ignore
    this.init(e || {});
  }
  n.prototype = {
    init: function (e: any) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
    },
    update: function () {
      this.phase += this.frequency;
      return this.offset + Math.sin(this.phase) * this.amplitude;
    },
    value: function () {
      return this.offset + Math.sin(this.phase) * this.amplitude;
    },
  };

  function Line(this: any, e: any) {
    this.init(e || {});
  }

  Line.prototype = {
    init: function (e: any) {
      this.spring = e.spring + 0.1 * Math.random() - 0.05;
      this.friction = E.friction + 0.01 * Math.random() - 0.005;
      this.nodes = [];
      for (let n = 0; n < E.size; n++) {
        let t = new (Node as any)();
        t.x = pos.x;
        t.y = pos.y;
        this.nodes.push(t);
      }
    },
    update: function () {
      let e = this.spring,
        t = this.nodes[0];
      t.vx += (pos.x - t.x) * e;
      t.vy += (pos.y - t.y) * e;
      for (var n, i = 0, a = this.nodes.length; i < a; i++) {
        t = this.nodes[i];
        if (i > 0) {
          n = this.nodes[i - 1];
          t.vx += (n.x - t.x) * e;
          t.vy += (n.y - t.y) * e;
          t.vx += n.vx * E.dampening;
          t.vy += n.vy * E.dampening;
        }
        t.vx *= this.friction;
        t.vy *= this.friction;
        t.x += t.vx;
        t.y += t.vy;
        e *= E.tension;
      }
    },
    draw: function () {
      let e, t,
        n = this.nodes[0].x,
        i = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
        e = this.nodes[a];
        t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      e = this.nodes[a];
      t = this.nodes[a + 1];
      if (e && t) {
        ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      }
      ctx.stroke();
      ctx.closePath();
    },
  };

  function onMousemove(e: any) {
    function o() {
      lines = [];
      for (let i = 0; i < E.trails; i++)
        lines.push(new (Line as any)({ spring: 0.45 + (i / E.trails) * 0.025 }));
    }
    function c(e: any) {
      if (e.touches) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      e.preventDefault();
    }
    function l(e: any) {
      if (e.touches.length == 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      }
    }
    document.removeEventListener("mousemove", onMousemove);
    document.removeEventListener("touchstart", onMousemove);
    document.addEventListener("mousemove", c);
    document.addEventListener("touchmove", c);
    document.addEventListener("touchstart", l);
    c(e);
    o();
    render();
  }

  function render() {
    if (ctx.running) {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
      ctx.lineWidth = 10;
      for (var e, t = 0; t < E.trails; t++) {
        e = lines[t];
        e.update();
        e.draw();
      }
      ctx.frame++;
      window.requestAnimationFrame(render);
    }
  }

  function resizeCanvas() {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  }

  var f: any,
    pos = { x: 0, y: 0 },
    lines: any[] = [],
    E = {
      debug: true,
      friction: 0.5,
      trails: 40,
      size: 40,
      dampening: 0.025,
      tension: 0.99,
    };

  function Node(this: any) {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
  }

  f = new (n as any)({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });

  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  
  // Set initial mouse pos randomly to center to trigger drawing
  pos.x = window.innerWidth / 2;
  pos.y = window.innerHeight / 2;
  
  for (let i = 0; i < E.trails; i++) {
    lines.push(new (Line as any)({ spring: 0.45 + (i / E.trails) * 0.025 }));
  }

  resizeCanvas();
  render();
  return () => {
    ctx.running = false;
  };
}
