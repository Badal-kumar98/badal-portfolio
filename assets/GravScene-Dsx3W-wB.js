import{r as x,j as $}from"./index-CoMvKYay.js";import{R as J,C as K,T as Q,S as Y,P as q,M as L,G as ee}from"./ogl-BOF5YmQz.js";import"./gsap-CzGW6FVa.js";const oe=`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`,te=`
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform vec3 uMouse;
uniform float uMousePull;

varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;

${oe}

void main(){
  vec3 pos = position;

  // Layered noise: slow base swell + faster ripple + fine flame shimmer
  float t = uTime * 0.35;
  float n1 = snoise(pos * uFreq + vec3(t));
  float n2 = snoise(pos * (uFreq * 2.3) + vec3(-t * 1.4)) * 0.4;
  float n3 = snoise(pos * (uFreq * 4.5) + vec3(uTime * 1.6)) * 0.12;
  float noise = n1 + n2 + n3;

  float pull = max(dot(normalize(position), normalize(uMouse + 0.0001)), 0.0);
  pull = pow(pull, 2.5) * uMousePull;

  float disp = noise * uAmp + pull * 0.55;
  pos += normal * disp;

  vDisp = disp;
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`,ne=`
precision highp float;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uAccent;
uniform vec3 uHot;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;

void main(){
  float fres = 1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0);
  fres = pow(fres, 2.2);

  float flick = 0.82 + 0.18 * sin(uTime * 6.0 + vDisp * 12.0);
  float heat = clamp(smoothstep(-0.45, 0.78, vDisp) * flick, 0.0, 1.0);

  vec3 col = uColorA;
  col = mix(col, uColorB, smoothstep(0.05, 0.45, heat));
  col = mix(col, uAccent, smoothstep(0.34, 0.72, heat));
  col = mix(col, uHot,    smoothstep(0.70, 1.0, heat));

  col = mix(col, uAccent, fres * 0.55);
  col += uHot * pow(fres, 1.6) * 0.6;

  gl_FragColor = vec4(col, 1.0);
}
`,re=`
attribute vec3 position;
attribute vec3 normal;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
`,ie=`
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uPixelHeight;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(uPixelHeight * 0.028 / -mv.z, 1.0, 6.0);
}
`,ae=`
precision mediump float;
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  gl_FragColor = vec4(uColor, uOpacity * smoothstep(0.5, 0.1, d));
}
`;function se(f){const u=new Float32Array(f*3);for(let r=0;r<f;r++){const n=2+Math.random()*1.4,m=Math.random()*Math.PI*2,i=Math.acos(2*Math.random()-1);u[r*3]=n*Math.sin(i)*Math.cos(m),u[r*3+1]=n*Math.sin(i)*Math.sin(m),u[r*3+2]=n*Math.cos(i)}return u}function me({pointer:f,reduced:u=!1,lite:r=!1,active:n=!0}){const m=x.useRef(null),i=x.useRef(()=>{}),S=x.useRef(()=>{});return x.useEffect(()=>{const a=m.current;if(!a)return;const I=Math.min(window.devicePixelRatio||1,1.8),w=new J({canvas:a,alpha:!0,antialias:!0,dpr:I,powerPreference:"high-performance"}),o=w.gl;o.clearColor(0,0,0,0);const y=new K(o,{fov:42,near:.1,far:100});y.position.set(0,0,6);let z=6;const g=new Q,[N,G]=[112,64],O=new Y(o,{radius:1.25,widthSegments:N,heightSegments:G}),t={x:0,y:0,z:1},d={uTime:{value:0},uAmp:{value:.38},uFreq:{value:1.25},uMouse:{value:[0,0,1]},uMousePull:{value:0},uColorA:{value:[196/255,210/255,234/255]},uColorB:{value:[140/255,169/255,216/255]},uAccent:{value:[30/255,91/255,214/255]},uHot:{value:[247/255,250/255,255/255]}},B=new q(o,{vertex:re+te,fragment:ne,uniforms:d}),s=new L(o,{geometry:O,program:B});s.setParent(g);const k=560,W=new ee(o,{position:{size:3,data:se(k)}}),M=new q(o,{vertex:ie,fragment:ae,uniforms:{uPixelHeight:{value:a.clientHeight||800},uColor:{value:[36/255,76/255,168/255]},uOpacity:{value:.5}},transparent:!0,depthWrite:!1,cullFace:!1});M.setBlendFunc(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA);const c=new L(o,{geometry:W,program:M,mode:o.POINTS});c.setParent(g);const P=4.1;let F=P;function h(){const v=a.parentElement,l=v?.clientWidth||window.innerWidth,e=v?.clientHeight||window.innerHeight,p=l/e;w.setSize(l,e),y.perspective({aspect:p}),M.uniforms.uPixelHeight.value=e,F=p<1?P*Math.min(Math.pow(1/p,.62),1.85):P}h();const T=new ResizeObserver(h);a.parentElement&&T.observe(a.parentElement),window.addEventListener("resize",h);let b=0,C=!1,A=performance.now(),E=0,H=0;function V(v){b=requestAnimationFrame(V);const l=Math.min((v-A)/1e3,.05);A=v,H+=l,d.uTime.value=H;const e=f?.current||{x:0,y:0},p=Math.min(Math.hypot(e.x,e.y),1);E+=(p*.9-E)*.06,d.uMousePull.value=E;const _=Math.hypot(e.x,e.y,.7)||1,X=e.x/_,Z=e.y/_,U=.7/_;t.x+=(X-t.x)*.07,t.y+=(Z-t.y)*.07,t.z+=(U-t.z)*.07;const R=d.uMouse.value;R[0]=t.x,R[1]=t.y,R[2]=t.z,s.rotation.y+=l*.08,s.rotation.x+=(e.y*.25-s.rotation.x)*.04,s.rotation.z+=(-e.x*.2-s.rotation.z)*.04,c.rotation.y+=l*.04,c.rotation.x+=(e.y*.3-c.rotation.x)*.03,c.rotation.z+=(-e.x*.3-c.rotation.z)*.03,z+=(F-z)*.05,y.position.z=z,w.render({scene:g,camera:y})}function j(){C||(C=!0,A=performance.now(),b=requestAnimationFrame(V))}function D(){C=!1,cancelAnimationFrame(b)}return i.current=j,S.current=D,n&&j(),()=>{D(),T.disconnect(),window.removeEventListener("resize",h)}},[]),x.useEffect(()=>{n?i.current():S.current()},[n]),$.jsx("canvas",{ref:m,style:{width:"100%",height:"100%",display:"block"}})}export{me as default};
