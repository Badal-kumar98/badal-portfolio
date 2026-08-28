import { useEffect, useRef } from "react";
import { Camera, Geometry, Mesh, Program, Renderer, Sphere, Transform } from "ogl";
import { blobVertex, blobFragment } from "./blobShaders";

const VERTEX_PRELUDE = `
attribute vec3 position;
attribute vec3 normal;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
`;

const PARTICLE_VERTEX = `
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uPixelHeight;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(uPixelHeight * 0.028 / -mv.z, 1.0, 6.0);
}
`;

const PARTICLE_FRAGMENT = `
precision mediump float;
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  gl_FragColor = vec4(uColor, uOpacity * smoothstep(0.5, 0.1, d));
}
`;

function makeParticlePositions(count) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 2.0 + Math.random() * 1.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

export default function GravScene({ pointer, reduced = false, lite = false, active = true }) {
  const canvasRef = useRef(null);
  const startRef = useRef(() => {});
  const stopRef = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    const renderer = new Renderer({
      canvas,
      alpha: true,
      antialias: true,
      dpr,
      powerPreference: "high-performance",
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 42, near: 0.1, far: 100 });
    camera.position.set(0, 0, 6);
    let camZ = 6;

    const scene = new Transform();

    // High detail sphere geometry
    const [wSeg, hSeg] = [112, 64];
    const blobGeometry = new Sphere(gl, { radius: 1.25, widthSegments: wSeg, heightSegments: hSeg });
    const uMouse = { x: 0, y: 0, z: 1 };
    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.38 },
      uFreq: { value: 1.25 },
      uMouse: { value: [0, 0, 1] },
      uMousePull: { value: 0 },
      // Light theme: pale periwinkle mass, deep blue accent, near-white hot spots
      uColorA: { value: [0xc4 / 255, 0xd2 / 255, 0xea / 255] },
      uColorB: { value: [0x8c / 255, 0xa9 / 255, 0xd8 / 255] },
      uAccent: { value: [0x1e / 255, 0x5b / 255, 0xd6 / 255] },
      uHot: { value: [0xf7 / 255, 0xfa / 255, 0xff / 255] },
    };
    const blobProgram = new Program(gl, {
      vertex: VERTEX_PRELUDE + blobVertex,
      fragment: blobFragment,
      uniforms,
    });
    const blob = new Mesh(gl, { geometry: blobGeometry, program: blobProgram });
    blob.setParent(scene);

    // Rich floating particles
    const count = 560;
    const particleGeometry = new Geometry(gl, {
      position: { size: 3, data: makeParticlePositions(count) },
    });
    const particleProgram = new Program(gl, {
      vertex: PARTICLE_VERTEX,
      fragment: PARTICLE_FRAGMENT,
      uniforms: {
        uPixelHeight: { value: canvas.clientHeight || 800 },
        uColor: { value: [0x24 / 255, 0x4c / 255, 0xa8 / 255] },
        uOpacity: { value: 0.5 },
      },
      transparent: true,
      depthWrite: false,
      cullFace: false,
    });
    // Alpha blending (was additive — additive is invisible on a light backdrop)
    particleProgram.setBlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const particles = new Mesh(gl, { geometry: particleGeometry, program: particleProgram, mode: gl.POINTS });
    particles.setParent(scene);

    const BASE_Z = 4.1;
    let targetZ = BASE_Z;

    function resize() {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || window.innerHeight;
      const aspect = w / h;
      renderer.setSize(w, h);
      camera.perspective({ aspect });
      particleProgram.uniforms.uPixelHeight.value = h;
      targetZ =
        aspect < 1 ? BASE_Z * Math.min(Math.pow(1 / aspect, 0.62), 1.85) : BASE_Z;
    }
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    let raf = 0;
    let running = false;
    let last = performance.now();
    let pull = 0;
    let t = 0;

    function frame(now) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      uniforms.uTime.value = t;

      const p = pointer?.current || { x: 0, y: 0 };
      const intensity = Math.min(Math.hypot(p.x, p.y), 1);
      pull += (intensity * 0.9 - pull) * 0.06;
      uniforms.uMousePull.value = pull;

      const len = Math.hypot(p.x, p.y, 0.7) || 1;
      const tx = p.x / len;
      const ty = p.y / len;
      const tz = 0.7 / len;
      uMouse.x += (tx - uMouse.x) * 0.07;
      uMouse.y += (ty - uMouse.y) * 0.07;
      uMouse.z += (tz - uMouse.z) * 0.07;
      const mv = uniforms.uMouse.value;
      mv[0] = uMouse.x;
      mv[1] = uMouse.y;
      mv[2] = uMouse.z;

      blob.rotation.y += dt * 0.08;
      blob.rotation.x += (p.y * 0.25 - blob.rotation.x) * 0.04;
      blob.rotation.z += (-p.x * 0.2 - blob.rotation.z) * 0.04;

      particles.rotation.y += dt * 0.04;
      particles.rotation.x += (p.y * 0.3 - particles.rotation.x) * 0.03;
      particles.rotation.z += (-p.x * 0.3 - particles.rotation.z) * 0.03;

      camZ += (targetZ - camZ) * 0.05;
      camera.position.z = camZ;

      renderer.render({ scene, camera });
    }

    function start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }
    startRef.current = start;
    stopRef.current = stop;
    if (active) start();

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (active) startRef.current();
    else stopRef.current();
  }, [active]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}
