'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Link from 'next/link'

// ─── Constants ───────────────────────────────────────────────────────
const SKY_R    = 500
const DFLT_PHI = 0.45
const DFLT_EL  = 0.22
const DFLT_FOV = 68
const MIN_FOV  = 22
const MAX_FOV  = 95
const TRAIL_N  = 10

// ─── Procedural textures ─────────────────────────────────────────────
function makeMoonTex(): THREE.CanvasTexture {
  const S = 512
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const cx = cv.getContext('2d')!
  // Base gradient
  const bg = cx.createRadialGradient(S * .42, S * .38, 0, S / 2, S / 2, S / 2)
  bg.addColorStop(0,   '#CFCBBE')
  bg.addColorStop(.55, '#BFBCB0')
  bg.addColorStop(1,   '#AEACA0')
  cx.fillStyle = bg
  cx.fillRect(0, 0, S, S)
  // Maria (dark seas)
  ;([[.36,.40,.21,.17],[.55,.37,.18,.14],[.30,.62,.14,.11],[.63,.57,.19,.15]] as [number,number,number,number][])
    .forEach(([x,y,rx,ry]) => {
      const g = cx.createRadialGradient(x*S,y*S,0,x*S,y*S,rx*S)
      g.addColorStop(0,   'rgba(65,62,55,.70)')
      g.addColorStop(.65, 'rgba(78,75,67,.38)')
      g.addColorStop(1,   'rgba(90,87,80,0)')
      cx.fillStyle = g
      cx.save(); cx.scale(1, ry/rx)
      cx.beginPath(); cx.arc(x*S, y*S*(rx/ry), rx*S, 0, Math.PI*2)
      cx.fill(); cx.restore()
    })
  // Craters
  for (let i = 0; i < 95; i++) {
    const px = Math.random()*S, py = Math.random()*S
    const r  = 2 + Math.random() * 24
    const g1 = cx.createRadialGradient(px,py,r*.6,px,py,r*1.2)
    g1.addColorStop(0,   'rgba(200,196,188,0)')
    g1.addColorStop(.5,  'rgba(215,210,200,.42)')
    g1.addColorStop(1,   'rgba(140,137,130,0)')
    cx.fillStyle = g1
    cx.beginPath(); cx.arc(px,py,r*1.25,0,Math.PI*2); cx.fill()
    const g2 = cx.createRadialGradient(px,py,0,px,py,r*.8)
    g2.addColorStop(0,   'rgba(85,82,75,.55)')
    g2.addColorStop(.65, 'rgba(96,93,85,.32)')
    g2.addColorStop(1,   'rgba(130,127,120,0)')
    cx.fillStyle = g2
    cx.beginPath(); cx.arc(px,py,r,0,Math.PI*2); cx.fill()
  }
  return new THREE.CanvasTexture(cv)
}

function makeGlowTex(r: number, g: number, b: number): THREE.CanvasTexture {
  const S = 256
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const cx = cv.getContext('2d')!
  const gr = cx.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2)
  gr.addColorStop(0,    `rgba(${r},${g},${b},.55)`)
  gr.addColorStop(.18,  `rgba(${r},${g},${b},.32)`)
  gr.addColorStop(.42,  `rgba(${r},${g},${b},.12)`)
  gr.addColorStop(.72,  `rgba(${r},${g},${b},.04)`)
  gr.addColorStop(1,    `rgba(${r},${g},${b},0)`)
  cx.fillStyle = gr; cx.fillRect(0,0,S,S)
  return new THREE.CanvasTexture(cv)
}

function makeNebulaTex(r: number, g: number, b: number): THREE.CanvasTexture {
  const S = 256
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const cx = cv.getContext('2d')!
  for (let i = 0; i < 6; i++) {
    const px = .25*S + Math.random()*.5*S
    const py = .25*S + Math.random()*.5*S
    const rd = .18*S + Math.random()*.16*S
    const gr = cx.createRadialGradient(px,py,0,px,py,rd)
    gr.addColorStop(0,   `rgba(${r},${g},${b},.13)`)
    gr.addColorStop(.5,  `rgba(${r},${g},${b},.06)`)
    gr.addColorStop(1,   `rgba(${r},${g},${b},0)`)
    cx.fillStyle = gr
    cx.beginPath(); cx.arc(px,py,rd,0,Math.PI*2); cx.fill()
  }
  return new THREE.CanvasTexture(cv)
}

// ─── Star colors (spectral classes) ──────────────────────────────────
const SCOL = [
  [.63,.74,1.0],[.78,.88,1.0],[.96,.96,1.0],
  [1.0,.97,.88],[1.0,.92,.70],[1.0,.80,.52],[1.0,.62,.42],
]
const SWGT = [.03,.07,.14,.25,.31,.15,.05]
function pickStarCol() {
  let r = Math.random()
  for (let i = 0; i < SWGT.length; i++) { r -= SWGT[i]; if (r <= 0) return SCOL[i] }
  return SCOL[4]
}
function spherePt(r = SKY_R): THREE.Vector3 {
  const u = Math.random(), v = Math.random()
  const th = 2*Math.PI*u, ph = Math.acos(2*v-1)
  return new THREE.Vector3(r*Math.sin(ph)*Math.cos(th), r*Math.sin(ph)*Math.sin(th), r*Math.cos(ph))
}

// ─── Shaders ─────────────────────────────────────────────────────────
const STAR_VERT = `
uniform float uTime;
attribute float aSz; attribute vec3 aCol; attribute float aTwk; attribute float aPhs;
varying vec3 vCol; varying float vA;
void main(){
  vCol=aCol;
  vec4 mp=modelViewMatrix*vec4(position,1.);
  float tw=aTwk>.0?(.82+.18*sin(uTime*aTwk+aPhs)):1.;
  vA=tw;
  gl_PointSize=aSz*tw*(530./length(mp.xyz));
  gl_Position=projectionMatrix*mp;
}`
const STAR_FRAG = `
varying vec3 vCol; varying float vA;
void main(){
  vec2 uv=gl_PointCoord-.5; float d=length(uv)*2.;
  if(d>1.)discard;
  float a=smoothstep(1.,.08,d)*vA;
  float core=smoothstep(.22,.0,d)*.75;
  gl_FragColor=vec4(vCol+core,a);
}`

// ─── Build stars / Milky Way ──────────────────────────────────────────
function buildStars(n: number, szMin: number, szMax: number, twinkle: boolean): THREE.Points {
  const pos=new Float32Array(n*3),col=new Float32Array(n*3)
  const sz=new Float32Array(n),twk=new Float32Array(n),phs=new Float32Array(n)
  for (let i=0;i<n;i++) {
    const p=spherePt(); pos[i*3]=p.x; pos[i*3+1]=p.y; pos[i*3+2]=p.z
    const [r,g,b]=pickStarCol(); const br=.5+Math.random()*.5
    col[i*3]=r*br; col[i*3+1]=g*br; col[i*3+2]=b*br
    sz[i]=szMin+Math.random()*(szMax-szMin)
    twk[i]=twinkle?.4+Math.random()*2.8:0
    phs[i]=Math.random()*Math.PI*2
  }
  const geo=new THREE.BufferGeometry()
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3))
  geo.setAttribute('aCol',    new THREE.BufferAttribute(col,3))
  geo.setAttribute('aSz',     new THREE.BufferAttribute(sz,1))
  geo.setAttribute('aTwk',    new THREE.BufferAttribute(twk,1))
  geo.setAttribute('aPhs',    new THREE.BufferAttribute(phs,1))
  const mat=new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}},
    vertexShader:STAR_VERT, fragmentShader:STAR_FRAG,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
  })
  return new THREE.Points(geo,mat)
}

function buildMilkyWay(n: number): THREE.Points {
  const pole=new THREE.Vector3(.38,.84,.37).normalize()
  const u1=new THREE.Vector3().crossVectors(pole,new THREE.Vector3(0,1,0)).normalize()
  const u2=new THREE.Vector3().crossVectors(pole,u1).normalize()
  const pos=new Float32Array(n*3),col=new Float32Array(n*3),sz=new Float32Array(n)
  for (let i=0;i<n;i++) {
    const t=Math.random()*Math.PI*2
    const lat=(Math.random()+Math.random()-1)*.19
    const core=Math.exp(-((t-Math.PI)**2)/.9)*.55
    const pt=u1.clone().multiplyScalar(Math.cos(t))
      .addScaledVector(u2,Math.sin(t))
      .addScaledVector(pole,lat*(1-core*.35))
      .normalize().multiplyScalar(SKY_R*.975)
    pos[i*3]=pt.x; pos[i*3+1]=pt.y; pos[i*3+2]=pt.z
    const cf=Math.abs(Math.cos(t-Math.PI))
    const rr=.80+cf*.17, gg=.83+cf*.09, bb=.92-cf*.11
    const br=(.07+Math.random()*.28)*(1+core*.65)
    col[i*3]=rr*br; col[i*3+1]=gg*br; col[i*3+2]=bb*br
    sz[i]=.35+Math.random()*.9
  }
  const geo=new THREE.BufferGeometry()
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3))
  geo.setAttribute('aCol',    new THREE.BufferAttribute(col,3))
  geo.setAttribute('aSz',     new THREE.BufferAttribute(sz,1))
  const mat=new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}},
    vertexShader:`
      attribute float aSz; attribute vec3 aCol; varying vec3 vCol;
      void main(){vCol=aCol;vec4 mp=modelViewMatrix*vec4(position,1.);gl_PointSize=aSz*(490./length(mp.xyz));gl_Position=projectionMatrix*mp;}
    `,
    fragmentShader:`
      varying vec3 vCol;
      void main(){vec2 uv=gl_PointCoord-.5;float d=length(uv)*2.;if(d>1.)discard;float a=smoothstep(1.,.1,d)*.72;gl_FragColor=vec4(vCol,a);}
    `,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
  })
  return new THREE.Points(geo,mat)
}

// ─── Sky dome ─────────────────────────────────────────────────────────
function buildSkyDome(): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.SphereGeometry(SKY_R*.99,48,48),
    new THREE.ShaderMaterial({
      side:THREE.BackSide, depthWrite:false,
      vertexShader:`varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`
        varying vec3 vP;
        void main(){
          float el=normalize(vP).y;
          vec3 h=vec3(.0,.004,.022),z=vec3(.0,.001,.009);
          float t=smoothstep(-.35,.45,el);
          gl_FragColor=vec4(mix(h,z,t),1.);
        }`,
    })
  )
}

// ─── Nebulae ─────────────────────────────────────────────────────────
const NEBULAS: [number,number,number,number,number,number,number][] = [
  [2.1,.52,185, 75, 55,145,.17],
  [0.8,.72,145, 55, 78,178,.14],
  [4.2,.30,200,138, 68, 48,.11],
  [3.0,.57,165, 58, 88,158,.15],
  [1.5,.22,120,118, 78, 38,.09],
  [5.0,.46,195, 48, 68,128,.12],
]
function buildNebulae(scene: THREE.Scene) {
  NEBULAS.forEach(([az,el,sz,r,g,b,op]) => {
    const tex=makeNebulaTex(r,g,b)
    const mesh=new THREE.Mesh(
      new THREE.PlaneGeometry(sz,sz),
      new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:op,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide})
    )
    mesh.position.set(SKY_R*.96*Math.cos(el)*Math.sin(az),SKY_R*.96*Math.sin(el),SKY_R*.96*Math.cos(el)*Math.cos(az))
    mesh.lookAt(0,0,0); mesh.rotateZ(Math.random()*Math.PI*2)
    scene.add(mesh)
  })
}

// ─── Moon ─────────────────────────────────────────────────────────────
function buildMoon(scene: THREE.Scene): THREE.Mesh {
  const tex=makeMoonTex()
  const mesh=new THREE.Mesh(
    new THREE.SphereGeometry(17,56,56),
    new THREE.MeshStandardMaterial({map:tex,roughness:1,metalness:0,color:new THREE.Color(1,.985,.88)})
  )
  const MAZ=1.25, MEL=0.44
  mesh.position.set(
    SKY_R*.71*Math.cos(MEL)*Math.sin(MAZ),
    SKY_R*.71*Math.sin(MEL),
    SKY_R*.71*Math.cos(MEL)*Math.cos(MAZ),
  )
  // Directional sunlight on moon
  const sun=new THREE.DirectionalLight(0xfff8e0,2.8)
  sun.position.set(mesh.position.x+120,mesh.position.y+65,mesh.position.z-80)
  scene.add(sun)
  // Halo (Sprite always faces camera)
  const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:makeGlowTex(225,215,168),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}))
  halo.position.copy(mesh.position)
  halo.scale.setScalar(115)
  scene.add(halo)
  return mesh
}

// ─── Shooting stars ───────────────────────────────────────────────────
interface Shooter {
  pts: THREE.Points
  mat: THREE.ShaderMaterial
  attr: THREE.BufferAttribute
  head: THREE.Vector3
  dir: THREE.Vector3
  speed: number
  life: number
  maxLife: number
  active: boolean
}
function makeShooter(scene: THREE.Scene): Shooter {
  const pos=new Float32Array(TRAIL_N*3)
  const idx=new Float32Array(TRAIL_N)
  const szA=new Float32Array(TRAIL_N)
  for (let i=0;i<TRAIL_N;i++) { idx[i]=i/(TRAIL_N-1); szA[i]=3.8*(1-i/(TRAIL_N-1))+.4 }
  const geo=new THREE.BufferGeometry()
  const attr=new THREE.BufferAttribute(pos,3).setUsage(THREE.DynamicDrawUsage)
  geo.setAttribute('position',attr)
  geo.setAttribute('aI', new THREE.BufferAttribute(idx,1))
  geo.setAttribute('aSz',new THREE.BufferAttribute(szA,1))
  const mat=new THREE.ShaderMaterial({
    uniforms:{uOp:{value:0}},
    vertexShader:`
      attribute float aI;attribute float aSz;varying float vI;
      void main(){vI=aI;vec4 mp=modelViewMatrix*vec4(position,1.);gl_PointSize=aSz*(520./length(mp.xyz));gl_Position=projectionMatrix*mp;}
    `,
    fragmentShader:`
      varying float vI;uniform float uOp;
      void main(){vec2 uv=gl_PointCoord-.5;float d=length(uv)*2.;if(d>1.)discard;float a=smoothstep(1.,0.,d)*(1.-vI)*uOp;gl_FragColor=vec4(1.,.97,.88,a);}
    `,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
  })
  const pts=new THREE.Points(geo,mat)
  scene.add(pts)
  return {pts,mat,attr,head:new THREE.Vector3(),dir:new THREE.Vector3(),speed:0,life:0,maxLife:1,active:false}
}
function spawnShooter(s: Shooter) {
  const az=Math.random()*Math.PI*2, el=Math.random()*.75-.05
  s.head.set(SKY_R*Math.cos(el)*Math.sin(az),SKY_R*Math.sin(el),SKY_R*Math.cos(el)*Math.cos(az))
  const tan=new THREE.Vector3(Math.random()-.5,Math.random()*.15-.075,Math.random()-.5).normalize()
  const rad=s.head.clone().normalize()
  s.dir.copy(tan).sub(rad.multiplyScalar(tan.dot(rad))).normalize()
  s.speed=1.8+Math.random()*2.8; s.maxLife=.55+Math.random()*.75; s.life=0; s.active=true
}
function tickShooter(s: Shooter, dt: number) {
  if (!s.active) return
  s.life+=dt
  const t=s.life/s.maxLife
  const op=t<.18?t/.18:t<.72?1:(1-t)/(1-.72)
  s.mat.uniforms.uOp.value=Math.max(0,op)
  s.head.addScaledVector(s.dir,s.speed*dt*58).normalize().multiplyScalar(SKY_R)
  const pa=s.attr.array as Float32Array
  for (let i=0;i<TRAIL_N;i++) {
    const frac=i/(TRAIL_N-1)
    const tp=s.head.clone().addScaledVector(s.dir,-frac*9).normalize().multiplyScalar(SKY_R*(.984-frac*.005))
    pa[i*3]=tp.x; pa[i*3+1]=tp.y; pa[i*3+2]=tp.z
  }
  s.attr.needsUpdate=true
  if (s.life>=s.maxLife){s.active=false;s.mat.uniforms.uOp.value=0}
}

// ─── Component ────────────────────────────────────────────────────────
export default function NightSkyExperience() {
  const mountRef=useRef<HTMLDivElement>(null)
  const [ready,setReady]=useState(false)
  const [explore,setExplore]=useState(false)
  const exploreRef=useRef(false)

  const S=useRef({
    // three
    renderer:null as THREE.WebGLRenderer|null,
    scene:null as THREE.Scene|null,
    camera:null as THREE.PerspectiveCamera|null,
    clock:null as THREE.Clock|null,
    starMats:[] as THREE.ShaderMaterial[],
    shooters:[] as Shooter[],
    raf:0,
    // camera state
    phi:DFLT_PHI,   theta:DFLT_EL,   fov:DFLT_FOV,
    tPhi:DFLT_PHI, tTheta:DFLT_EL, tFov:DFLT_FOV,
    vPhi:0, vTheta:0,
    // input
    down:false, lastX:0, lastY:0, lastTD:0,
    nextShoot:3,
  })

  useEffect(()=>{
    if(!mountRef.current) return
    const s=S.current
    const mob=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const el=mountRef.current
    s.clock=new THREE.Clock()

    // Renderer
    const renderer=new THREE.WebGLRenderer({antialias:!mob,alpha:false,powerPreference:'high-performance'})
    renderer.setSize(el.clientWidth,el.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,mob?1.5:2))
    renderer.toneMapping=THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure=1.15
    el.appendChild(renderer.domElement)
    s.renderer=renderer

    // Scene
    const scene=new THREE.Scene()
    s.scene=scene
    scene.add(new THREE.AmbientLight(0x0d1220,.6))

    // Camera
    const cam=new THREE.PerspectiveCamera(DFLT_FOV,el.clientWidth/el.clientHeight,.1,SKY_R*2)
    cam.position.set(0,0,0)
    s.camera=cam

    // Build scene
    scene.add(buildSkyDome())
    buildNebulae(scene)

    const bright=buildStars(mob?4800:9000,1.2,4.8,true)
    scene.add(bright); s.starMats.push(bright.material as THREE.ShaderMaterial)

    const faint=buildStars(mob?55000:155000,.25,1.15,false)
    scene.add(faint); s.starMats.push(faint.material as THREE.ShaderMaterial)

    const mw=buildMilkyWay(mob?110000:260000)
    scene.add(mw); s.starMats.push(mw.material as THREE.ShaderMaterial)

    const moon=buildMoon(scene)
    scene.add(moon)

    for (let i=0;i<5;i++) s.shooters.push(makeShooter(scene))

    // Animation loop
    function tick() {
      s.raf=requestAnimationFrame(tick)
      const dt=Math.min(s.clock!.getDelta(),.05)
      const t=s.clock!.elapsedTime
      s.starMats.forEach(m=>{if(m.uniforms.uTime)m.uniforms.uTime.value=t})
      moon.rotation.y=t*.018

      if(!s.down){
        if(Math.abs(s.vPhi)>.00005||Math.abs(s.vTheta)>.00005){
          s.tPhi+=s.vPhi; s.tTheta+=s.vTheta
          s.vPhi*=.90; s.vTheta*=.90
          s.tTheta=Math.max(-1.47,Math.min(1.47,s.tTheta))
        }
      }
      if(exploreRef.current){
        s.tPhi+=.00016
        s.tTheta+=Math.sin(t*.07)*.00005
      }

      const k=.072
      s.phi  +=(s.tPhi  -s.phi  )*k
      s.theta+=(s.tTheta-s.theta)*k
      s.fov  +=(s.tFov  -s.fov  )*.1
      s.theta=Math.max(-1.47,Math.min(1.47,s.theta))
      cam.fov=s.fov; cam.updateProjectionMatrix()
      cam.lookAt(
        Math.cos(s.theta)*Math.sin(s.phi)*200,
        Math.sin(s.theta)*200,
        Math.cos(s.theta)*Math.cos(s.phi)*200,
      )

      s.nextShoot-=dt
      if(s.nextShoot<=0){
        const free=s.shooters.find(sh=>!sh.active)
        if(free) spawnShooter(free)
        s.nextShoot=4+Math.random()*11
      }
      s.shooters.forEach(sh=>tickShooter(sh,dt))
      renderer.render(scene,cam)
    }
    tick()
    setReady(true)

    // Resize
    const ro=new ResizeObserver(()=>{
      renderer.setSize(el.clientWidth,el.clientHeight)
      cam.aspect=el.clientWidth/el.clientHeight
      cam.updateProjectionMatrix()
    })
    ro.observe(el)

    // ── Mouse ─────────────────────────────────────────────────────
    const onDown=(e:MouseEvent)=>{
      s.down=true; s.lastX=e.clientX; s.lastY=e.clientY
      s.vPhi=0; s.vTheta=0
      el.style.cursor='grabbing'
    }
    const onMove=(e:MouseEvent)=>{
      if(!s.down) return
      const sens=(s.fov/70)*.0022
      const dx=e.clientX-s.lastX, dy=e.clientY-s.lastY
      s.tPhi-=dx*sens; s.tTheta+=dy*sens
      s.tTheta=Math.max(-1.47,Math.min(1.47,s.tTheta))
      s.vPhi=-dx*sens*.28; s.vTheta=dy*sens*.28
      s.lastX=e.clientX; s.lastY=e.clientY
    }
    const onUp=()=>{ s.down=false; el.style.cursor='grab' }
    const onWheel=(e:WheelEvent)=>{
      e.preventDefault()
      s.tFov=Math.max(MIN_FOV,Math.min(MAX_FOV,s.tFov+e.deltaY*.038))
    }
    const onDbl=(e:MouseEvent)=>{
      const W=el.clientWidth,H=el.clientHeight
      const nx=(e.clientX/W-.5)*2, ny=-(e.clientY/H-.5)*2
      const hfv=(s.fov*Math.PI/180)/2
      s.tPhi  +=nx*hfv*(W/H)*.55
      s.tTheta-=ny*hfv*.55
      s.tFov=Math.max(MIN_FOV,s.tFov-18)
    }

    // ── Touch ─────────────────────────────────────────────────────
    const onTS=(e:TouchEvent)=>{
      e.preventDefault()
      if(e.touches.length===1){
        s.down=true; s.lastX=e.touches[0].clientX; s.lastY=e.touches[0].clientY
        s.vPhi=0; s.vTheta=0
      } else if(e.touches.length===2){
        s.down=false
        s.lastTD=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)
      }
    }
    const onTM=(e:TouchEvent)=>{
      e.preventDefault()
      if(e.touches.length===1&&s.down){
        const sens=(s.fov/70)*.0028
        const dx=e.touches[0].clientX-s.lastX, dy=e.touches[0].clientY-s.lastY
        s.tPhi-=dx*sens; s.tTheta+=dy*sens
        s.tTheta=Math.max(-1.47,Math.min(1.47,s.tTheta))
        s.vPhi=-dx*sens*.22; s.vTheta=dy*sens*.22
        s.lastX=e.touches[0].clientX; s.lastY=e.touches[0].clientY
      } else if(e.touches.length===2){
        const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)
        s.tFov=Math.max(MIN_FOV,Math.min(MAX_FOV,s.tFov*(s.lastTD/d)))
        s.lastTD=d
      }
    }
    const onTE=(e:TouchEvent)=>{ if(e.touches.length===0)s.down=false }

    // ── Keyboard ──────────────────────────────────────────────────
    const onKey=(e:KeyboardEvent)=>{
      const sp=.04
      if(e.key==='ArrowLeft')  s.tPhi-=sp
      if(e.key==='ArrowRight') s.tPhi+=sp
      if(e.key==='ArrowUp')    s.tTheta+=sp
      if(e.key==='ArrowDown')  s.tTheta-=sp
      if(e.key==='+'||e.key==='=') s.tFov=Math.max(MIN_FOV,s.tFov-5)
      if(e.key==='-')              s.tFov=Math.min(MAX_FOV,s.tFov+5)
    }

    el.addEventListener('mousedown',onDown)
    window.addEventListener('mousemove',onMove)
    window.addEventListener('mouseup',onUp)
    el.addEventListener('wheel',onWheel,{passive:false})
    el.addEventListener('dblclick',onDbl)
    el.addEventListener('touchstart',onTS,{passive:false})
    el.addEventListener('touchmove',onTM,{passive:false})
    el.addEventListener('touchend',onTE)
    window.addEventListener('keydown',onKey)
    el.style.cursor='grab'

    return ()=>{
      cancelAnimationFrame(s.raf)
      ro.disconnect()
      el.removeEventListener('mousedown',onDown)
      window.removeEventListener('mousemove',onMove)
      window.removeEventListener('mouseup',onUp)
      el.removeEventListener('wheel',onWheel)
      el.removeEventListener('dblclick',onDbl)
      el.removeEventListener('touchstart',onTS)
      el.removeEventListener('touchmove',onTM)
      el.removeEventListener('touchend',onTE)
      window.removeEventListener('keydown',onKey)
      renderer.dispose()
      if(el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  },[])

  const toggleExplore=()=>{ const n=!explore; setExplore(n); exploreRef.current=n }
  const resetView=()=>{ const s=S.current; s.tPhi=DFLT_PHI; s.tTheta=DFLT_EL; s.tFov=DFLT_FOV; s.vPhi=0; s.vTheta=0 }
  const zoom=(d:number)=>{ const s=S.current; s.tFov=Math.max(MIN_FOV,Math.min(MAX_FOV,s.tFov+d)) }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0" tabIndex={0} aria-label="Interactive night sky. Drag to look around, scroll to zoom." />

      {/* Loading */}
      {!ready&&(
        <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#D4A843] border-t-transparent rounded-full animate-spin mx-auto"/>
            <p className="text-[#D4A843]/80 text-xs tracking-[.25em] uppercase">Rendering the sky…</p>
          </div>
        </div>
      )}

      {ready&&(<>
        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 flex items-start justify-between px-5 pt-5 pointer-events-none z-20">
          <Link href="/" className="pointer-events-auto inline-flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors duration-300 text-xs tracking-[.18em] uppercase">
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 12L6 8l4-4"/></svg>
            Eilat Action
          </Link>
          <div className="text-center">
            <p className="text-white/25 text-[10px] tracking-[.28em] uppercase">Night Sky Experience</p>
            <p className="text-white/12 text-[9px] tracking-[.14em] mt-0.5">Eilat Desert · Israel</p>
          </div>
          <p className="text-white/20 text-[10px] tracking-[.14em] uppercase hidden sm:block pt-1">
            Drag · Scroll · Double-click
          </p>
        </div>

        {/* Right controls */}
        <div className="absolute right-4 sm:right-6 bottom-[5.5rem] sm:bottom-24 flex flex-col gap-2 z-20">
          {([
            {label:'+',fn:()=>zoom(-10),aria:'Zoom in'},
            {label:'−',fn:()=>zoom(+10),aria:'Zoom out'},
          ] as {label:string;fn:()=>void;aria:string}[]).map(({label,fn,aria})=>(
            <button key={label} onClick={fn} aria-label={aria}
              className="w-10 h-10 rounded-sm bg-black/50 border border-white/12 text-white/55 hover:text-white hover:border-white/35 hover:bg-black/70 transition-all flex items-center justify-center text-xl font-light backdrop-blur-md">
              {label}
            </button>
          ))}
          <button onClick={resetView} aria-label="Reset view" title="Reset view"
            className="w-10 h-10 rounded-sm bg-black/50 border border-white/12 text-white/40 hover:text-white hover:border-white/35 hover:bg-black/70 transition-all flex items-center justify-center text-base backdrop-blur-md">
            ⊙
          </button>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-5 inset-x-0 flex items-center justify-center gap-5 z-20 px-4">
          <button onClick={toggleExplore}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border text-[11px] tracking-[.16em] uppercase transition-all duration-300 backdrop-blur-md ${
              explore
                ? 'bg-[#D4A843]/18 border-[#D4A843]/45 text-[#D4A843]'
                : 'bg-black/45 border-white/12 text-white/45 hover:text-white/75 hover:border-white/28'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${explore?'bg-[#D4A843] animate-pulse':'bg-white/25'}`}/>
            {explore?'Exploring…':'Explore Mode'}
          </button>
          <p className="text-white/18 text-[9px] tracking-[.14em] uppercase hidden sm:block">
            Arrow keys · +/- to zoom
          </p>
        </div>
      </>)}
    </div>
  )
}
