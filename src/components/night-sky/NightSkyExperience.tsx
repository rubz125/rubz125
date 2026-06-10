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

// ─── Labels ──────────────────────────────────────────────────────────
const STAR_LABELS = [
  { name: 'Sirius',     phi: 1.20, theta:  0.18 },
  { name: 'Canopus',    phi: 1.85, theta: -0.32 },
  { name: 'Arcturus',   phi: 3.45, theta:  0.50 },
  { name: 'Vega',       phi: 4.22, theta:  0.62 },
  { name: 'Capella',    phi: 0.55, theta:  0.55 },
  { name: 'Rigel',      phi: 0.98, theta:  0.10 },
  { name: 'Procyon',    phi: 1.58, theta:  0.23 },
  { name: 'Betelgeuse', phi: 0.88, theta:  0.26 },
  { name: 'Achernar',   phi: 1.70, theta: -0.50 },
  { name: 'Hadar',      phi: 2.18, theta: -0.72 },
  { name: 'Altair',     phi: 3.82, theta:  0.37 },
  { name: 'Aldebaran',  phi: 0.72, theta:  0.31 },
  { name: 'Acrux',      phi: 2.22, theta: -0.78 },
  { name: 'Antares',    phi: 2.62, theta:  0.07 },
  { name: 'Spica',      phi: 2.95, theta:  0.20 },
  { name: 'Pollux',     phi: 1.42, theta:  0.44 },
  { name: 'Fomalhaut',  phi: 2.05, theta: -0.13 },
  { name: 'Deneb',      phi: 4.52, theta:  0.59 },
  { name: 'Mimosa',     phi: 2.28, theta: -0.70 },
  { name: 'Regulus',    phi: 2.40, theta:  0.34 },
  { name: 'Adhara',     phi: 1.35, theta: -0.02 },
  { name: 'Shaula',     phi: 2.75, theta: -0.40 },
  { name: 'Castor',     phi: 1.38, theta:  0.48 },
  { name: 'Gacrux',     phi: 2.15, theta: -0.62 },
  { name: 'Bellatrix',  phi: 0.82, theta:  0.12 },
  { name: 'Alnilam',    phi: 0.92, theta:  0.06 },
  { name: 'Peacock',    phi: 3.15, theta: -0.58 },
  { name: 'Atria',      phi: 2.88, theta: -0.68 },
  { name: 'Alhena',     phi: 1.48, theta:  0.40 },
  { name: 'Mirzam',     phi: 1.12, theta:  0.06 },
  { name: 'Avior',      phi: 1.95, theta: -0.55 },
  { name: 'Wezen',      phi: 1.30, theta: -0.12 },
]
const PLANET_LABELS = [
  { name: 'Moon',  phi: 1.25, theta:  0.44 },
  { name: 'Earth', phi: 4.20, theta:  0.60 },
  { name: 'Sun',   phi: 5.80, theta:  0.35 },
]
const ALL_LABELS = [
  ...STAR_LABELS.map(s => ({ ...s, planet: false })),
  ...PLANET_LABELS.map(p => ({ ...p, planet: true })),
]

// ─── Moon texture ─────────────────────────────────────────────────────
// Fill entire canvas (no clip) — sphere geometry itself provides circular silhouette.
// Canvas clip causes black areas when sphere rotates.
function makeMoonTex(): THREE.CanvasTexture {
  const S = 512
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const cx = cv.getContext('2d')!

  // Base surface (warm gray, slight off-center gradient for depth)
  const bg = cx.createRadialGradient(S*.42, S*.38, 0, S/2, S/2, S*.72)
  bg.addColorStop(0,   '#E0DBCB')
  bg.addColorStop(.6,  '#CECBB8')
  bg.addColorStop(1,   '#BFBCAA')
  cx.fillStyle = '#CFCBB8'
  cx.fillRect(0, 0, S, S)
  cx.fillStyle = bg
  cx.fillRect(0, 0, S, S)

  // Surface albedo variation (soft blotches)
  for (let i = 0; i < 200; i++) {
    const px = Math.random()*S, py = Math.random()*S
    const r = 10 + Math.random()*55
    const dark = Math.random() > .55
    const a = .025 + Math.random()*.04
    const g = cx.createRadialGradient(px,py,0,px,py,r)
    g.addColorStop(0, `rgba(${dark?50:205},${dark?48:200},${dark?42:182},${a})`)
    g.addColorStop(1, `rgba(${dark?50:205},${dark?48:200},${dark?42:182},0)`)
    cx.fillStyle = g; cx.fillRect(0, 0, S, S)
  }

  // ── Maria (real positions, fills entire canvas so no black areas on sphere) ──
  const maria: [number,number,number,number,number][] = [
    [.22,.45,.22,1.65,.78],  // Oceanus Procellarum (largest)
    [.43,.30,.13,1.00,.78],  // Mare Imbrium
    [.58,.33,.10,1.00,.72],  // Mare Serenitatis
    [.61,.44,.10,1.00,.72],  // Mare Tranquillitatis
    [.73,.37,.07,1.38,.75],  // Mare Crisium (oval)
    [.66,.55,.09,1.00,.65],  // Mare Fecunditatis
    [.63,.63,.055,1.00,.68], // Mare Nectaris
    [.50,.41,.055,1.00,.55], // Mare Vaporum
    [.38,.42,.055,1.00,.55], // Mare Insularum
    [.28,.38,.04,1.00,.48],  // Sinus Iridum / Mare edge
  ]
  maria.forEach(([mx,my,mr,sy,op]) => {
    const g = cx.createRadialGradient(mx*S,my*S,0,mx*S,my*S,mr*S)
    g.addColorStop(0, `rgba(52,50,42,${op})`)
    g.addColorStop(.6, `rgba(65,62,54,${op*.52})`)
    g.addColorStop(1, `rgba(80,77,68,0)`)
    cx.fillStyle = g
    cx.save(); cx.scale(1, sy)
    cx.beginPath(); cx.arc(mx*S, my*S/sy, mr*S, 0, Math.PI*2)
    cx.fill(); cx.restore()
  })

  // ── Large craters (named) ──
  const bigCr: [number,number,number,boolean][] = [
    [.78,.72,18,true],  // Tycho
    [.42,.68,16,true],  // Clavius
    [.28,.72,13,false], // Longomontanus
    [.55,.65,12,false], // Maginus
    [.25,.28,11,false], // Plato
    [.65,.22, 9,false], // Aristoteles
    [.44,.22,10,true],  // Pythagoras area
    [.35,.52, 8,false], // Grimaldi
    [.80,.48, 7,false], // Langrenus
    [.70,.60, 8,false], // Petavius
  ]
  bigCr.forEach(([cx_,cy_,r_,hasPeak]) => {
    const px = cx_*S, py = cy_*S, r = r_
    // Rim bright ring
    const g1 = cx.createRadialGradient(px,py,r*.55,px,py,r*1.3)
    g1.addColorStop(0,  'rgba(200,196,182,0)')
    g1.addColorStop(.45,'rgba(218,214,198,.45)')
    g1.addColorStop(.8, 'rgba(218,214,198,.28)')
    g1.addColorStop(1,  'rgba(165,160,148,0)')
    cx.fillStyle = g1; cx.beginPath(); cx.arc(px,py,r*1.35,0,Math.PI*2); cx.fill()
    // Floor
    const g2 = cx.createRadialGradient(px,py,0,px,py,r*.78)
    g2.addColorStop(0, 'rgba(70,67,58,.72)')
    g2.addColorStop(.65,'rgba(88,85,76,.35)')
    g2.addColorStop(1, 'rgba(108,105,96,0)')
    cx.fillStyle = g2; cx.beginPath(); cx.arc(px,py,r*.82,0,Math.PI*2); cx.fill()
    // Central peak
    if (hasPeak) {
      const g3 = cx.createRadialGradient(px,py,0,px,py,r*.17)
      g3.addColorStop(0,'rgba(218,214,198,.58)'); g3.addColorStop(1,'rgba(218,214,198,0)')
      cx.fillStyle = g3; cx.beginPath(); cx.arc(px,py,r*.20,0,Math.PI*2); cx.fill()
    }
  })

  // Tycho ejecta rays
  const tyX = .78*S, tyY = .72*S
  for (let i = 0; i < 16; i++) {
    const ang = (i/16)*Math.PI*2, len = 65 + Math.random()*120
    cx.save(); cx.translate(tyX,tyY); cx.rotate(ang)
    const g = cx.createLinearGradient(0,0,len,0)
    g.addColorStop(0,  'rgba(225,220,205,.34)')
    g.addColorStop(.5, 'rgba(225,220,205,.15)')
    g.addColorStop(1,  'rgba(225,220,205,0)')
    cx.strokeStyle = g; cx.lineWidth = 1.5 + Math.random()*2.2
    cx.beginPath(); cx.moveTo(14,0); cx.lineTo(len,0); cx.stroke(); cx.restore()
  }

  // Medium craters
  for (let i = 0; i < 60; i++) {
    const px = Math.random()*S, py = Math.random()*S, r = 4+Math.random()*11
    const g1 = cx.createRadialGradient(px,py,r*.55,px,py,r*1.25)
    g1.addColorStop(0,'rgba(200,196,182,0)'); g1.addColorStop(.45,'rgba(215,210,196,.40)'); g1.addColorStop(1,'rgba(162,158,146,0)')
    cx.fillStyle = g1; cx.beginPath(); cx.arc(px,py,r*1.3,0,Math.PI*2); cx.fill()
    const g2 = cx.createRadialGradient(px,py,0,px,py,r*.75)
    g2.addColorStop(0,'rgba(76,73,64,.62)'); g2.addColorStop(.65,'rgba(92,89,80,.30)'); g2.addColorStop(1,'rgba(112,109,100,0)')
    cx.fillStyle = g2; cx.beginPath(); cx.arc(px,py,r*.80,0,Math.PI*2); cx.fill()
  }

  // Small craters
  for (let i = 0; i < 240; i++) {
    const px = Math.random()*S, py = Math.random()*S, r = 1.4+Math.random()*4
    const g1 = cx.createRadialGradient(px,py,r*.58,px,py,r*1.22)
    g1.addColorStop(0,'rgba(200,196,182,0)'); g1.addColorStop(.5,'rgba(215,210,196,.34)'); g1.addColorStop(1,'rgba(132,128,118,0)')
    cx.fillStyle = g1; cx.beginPath(); cx.arc(px,py,r*1.25,0,Math.PI*2); cx.fill()
    const g2 = cx.createRadialGradient(px,py,0,px,py,r*.8)
    g2.addColorStop(0,'rgba(78,75,66,.52)'); g2.addColorStop(.65,'rgba(94,91,82,.24)'); g2.addColorStop(1,'rgba(116,113,104,0)')
    cx.fillStyle = g2; cx.beginPath(); cx.arc(px,py,r,0,Math.PI*2); cx.fill()
  }

  // Limb darkening
  const limb = cx.createRadialGradient(S/2,S/2,S/2*.68,S/2,S/2,S/2*.98)
  limb.addColorStop(0,'rgba(0,0,0,0)'); limb.addColorStop(1,'rgba(0,0,0,.32)')
  cx.fillStyle = limb; cx.fillRect(0, 0, S, S)

  return new THREE.CanvasTexture(cv)
}

// ─── Earth texture (equirectangular 2:1) ─────────────────────────────
function makeEarthTex(): THREE.CanvasTexture {
  const W = 512, H = 256
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const cx = cv.getContext('2d')!

  // Ocean base
  cx.fillStyle = '#1640A2'
  cx.fillRect(0, 0, W, H)
  const oceanDepth = cx.createLinearGradient(0,0,0,H)
  oceanDepth.addColorStop(0,   'rgba(8,25,75,.45)')
  oceanDepth.addColorStop(.45, 'rgba(18,55,140,.18)')
  oceanDepth.addColorStop(1,   'rgba(8,25,75,.45)')
  cx.fillStyle = oceanDepth; cx.fillRect(0, 0, W, H)

  const land = (x: number, y: number, rx: number, ry: number, rot: number, col: string) => {
    cx.fillStyle = col
    cx.save(); cx.translate(x*W, y*H); cx.rotate(rot)
    cx.beginPath(); cx.ellipse(0, 0, rx*W, ry*H, 0, 0, Math.PI*2)
    cx.fill(); cx.restore()
  }

  // Africa (main body + horn)
  land(.555,.52,.048,.20,-.12,'#5A8C38')
  land(.57,.38,.034,.08,.15,'#6A9C42')
  land(.59,.32,.018,.035,.2,'#628A3C')
  // Arabian Peninsula
  land(.606,.395,.018,.032,.15,'#A89430')
  // Europe
  land(.535,.27,.032,.058,.18,'#6BAA40')
  // Scandinavia
  land(.528,.20,.015,.042,-.15,'#5E9A38')
  // Asia (main)
  land(.722,.30,.130,.105,-.07,'#5C9035')
  land(.760,.43,.055,.072,.22,'#668A3A')
  // Indian Subcontinent
  land(.650,.40,.025,.065,.05,'#6A9038')
  // Southeast Asia
  land(.790,.46,.032,.038,.1,'#5E8C35')
  land(.830,.48,.018,.020,.0,'#5E8C35')
  // Japan/Korea area
  land(.832,.28,.012,.022,-.1,'#5A8830')
  // Australia
  land(.875,.645,.042,.048,.08,'#A87828')
  // North America (main)
  land(.205,.28,.075,.125,-.18,'#578638')
  land(.230,.19,.038,.048,-.28,'#4C7833')
  // Mexico/Central America
  land(.215,.38,.020,.028,.1,'#5A8435')
  // Greenland
  land(.158,.12,.022,.058,-.10,'#C8D8EC')
  // South America
  land(.280,.595,.040,.155,.12,'#428C2C')
  land(.262,.45,.022,.048,.08,'#4A8030')
  // Madagascar
  land(.592,.60,.010,.022,.05,'#628C38')

  // Antarctica
  const ant = cx.createLinearGradient(0,H*.82,0,H)
  ant.addColorStop(0,  'rgba(225,235,248,0)')
  ant.addColorStop(.35,'rgba(228,238,250,.85)')
  ant.addColorStop(1,  'rgba(238,245,255,1.0)')
  cx.fillStyle = ant; cx.fillRect(0,H*.80,W,H*.20)

  // Arctic
  const arc = cx.createLinearGradient(0,0,0,H*.12)
  arc.addColorStop(0,  'rgba(238,245,255,.96)')
  arc.addColorStop(.55,'rgba(228,238,250,.62)')
  arc.addColorStop(1,  'rgba(225,235,248,0)')
  cx.fillStyle = arc; cx.fillRect(0,0,W,H*.12)

  // Cloud layer
  for (let i = 0; i < 35; i++) {
    const cx_ = Math.random()*W, cy_ = Math.random()*H*.88+H*.06
    const r = 18+Math.random()*60
    const g = cx.createRadialGradient(cx_,cy_,0,cx_,cy_,r)
    g.addColorStop(0,'rgba(255,255,255,.20)'); g.addColorStop(.5,'rgba(255,255,255,.09)'); g.addColorStop(1,'rgba(255,255,255,0)')
    cx.fillStyle = g
    cx.beginPath(); cx.ellipse(cx_,cy_,r,r*.28,Math.random()*.55,0,Math.PI*2); cx.fill()
  }

  return new THREE.CanvasTexture(cv)
}

// ─── Sun glow texture ─────────────────────────────────────────────────
function makeSunTex(): THREE.CanvasTexture {
  const S = 256
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const cx = cv.getContext('2d')!
  const g = cx.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2)
  g.addColorStop(0,   'rgba(255,252,215,1)')
  g.addColorStop(.06, 'rgba(255,248,180,1)')
  g.addColorStop(.13, 'rgba(255,232,120,.96)')
  g.addColorStop(.24, 'rgba(255,192,55,.80)')
  g.addColorStop(.40, 'rgba(255,140,18,.52)')
  g.addColorStop(.58, 'rgba(255,85,4,.26)')
  g.addColorStop(.76, 'rgba(200,45,0,.10)')
  g.addColorStop(.90, 'rgba(150,18,0,.03)')
  g.addColorStop(1,   'rgba(120,8,0,0)')
  cx.fillStyle = g; cx.fillRect(0,0,S,S)
  return new THREE.CanvasTexture(cv)
}

// ─── Glow / nebula helpers ────────────────────────────────────────────
function makeGlowTex(r: number, g: number, b: number): THREE.CanvasTexture {
  const S = 256
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const cx = cv.getContext('2d')!
  const gr = cx.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2)
  gr.addColorStop(0,   `rgba(${r},${g},${b},.55)`)
  gr.addColorStop(.18, `rgba(${r},${g},${b},.32)`)
  gr.addColorStop(.42, `rgba(${r},${g},${b},.12)`)
  gr.addColorStop(.72, `rgba(${r},${g},${b},.04)`)
  gr.addColorStop(1,   `rgba(${r},${g},${b},0)`)
  cx.fillStyle = gr; cx.fillRect(0,0,S,S)
  return new THREE.CanvasTexture(cv)
}

function makeNebulaTex(r: number, g: number, b: number): THREE.CanvasTexture {
  const S = 256
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const cx = cv.getContext('2d')!
  for (let i = 0; i < 6; i++) {
    const px = .25*S+Math.random()*.5*S, py = .25*S+Math.random()*.5*S
    const rd = .18*S+Math.random()*.16*S
    const gr = cx.createRadialGradient(px,py,0,px,py,rd)
    gr.addColorStop(0,  `rgba(${r},${g},${b},.13)`)
    gr.addColorStop(.5, `rgba(${r},${g},${b},.06)`)
    gr.addColorStop(1,  `rgba(${r},${g},${b},0)`)
    cx.fillStyle = gr; cx.beginPath(); cx.arc(px,py,rd,0,Math.PI*2); cx.fill()
  }
  return new THREE.CanvasTexture(cv)
}

// ─── Star colors ──────────────────────────────────────────────────────
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

// ─── Star fields ──────────────────────────────────────────────────────
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
  geo.setAttribute('aCol',new THREE.BufferAttribute(col,3))
  geo.setAttribute('aSz',new THREE.BufferAttribute(sz,1))
  geo.setAttribute('aTwk',new THREE.BufferAttribute(twk,1))
  geo.setAttribute('aPhs',new THREE.BufferAttribute(phs,1))
  return new THREE.Points(geo,new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}},
    vertexShader:STAR_VERT, fragmentShader:STAR_FRAG,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
  }))
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
  geo.setAttribute('aCol',new THREE.BufferAttribute(col,3))
  geo.setAttribute('aSz',new THREE.BufferAttribute(sz,1))
  return new THREE.Points(geo,new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}},
    vertexShader:`attribute float aSz;attribute vec3 aCol;varying vec3 vCol;void main(){vCol=aCol;vec4 mp=modelViewMatrix*vec4(position,1.);gl_PointSize=aSz*(490./length(mp.xyz));gl_Position=projectionMatrix*mp;}`,
    fragmentShader:`varying vec3 vCol;void main(){vec2 uv=gl_PointCoord-.5;float d=length(uv)*2.;if(d>1.)discard;float a=smoothstep(1.,.1,d)*.72;gl_FragColor=vec4(vCol,a);}`,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
  }))
}

function buildSkyDome(): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.SphereGeometry(SKY_R*.99,48,48),
    new THREE.ShaderMaterial({
      side:THREE.BackSide, depthWrite:false,
      vertexShader:`varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`varying vec3 vP;void main(){float el=normalize(vP).y;vec3 h=vec3(.0,.004,.022),z=vec3(.0,.001,.009);float t=smoothstep(-.35,.45,el);gl_FragColor=vec4(mix(h,z,t),1.);}`,
    })
  )
}

const NEBULAS: [number,number,number,number,number,number,number][] = [
  [2.1,.52,185,75,55,145,.17],[0.8,.72,145,55,78,178,.14],
  [4.2,.30,200,138,68,48,.11],[3.0,.57,165,58,88,158,.15],
  [1.5,.22,120,118,78,38,.09],[5.0,.46,195,48,68,128,.12],
]
function buildNebulae(scene: THREE.Scene) {
  NEBULAS.forEach(([az,el,sz,r,g,b,op]) => {
    const mesh=new THREE.Mesh(
      new THREE.PlaneGeometry(sz,sz),
      new THREE.MeshBasicMaterial({map:makeNebulaTex(r,g,b),transparent:true,opacity:op,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide})
    )
    mesh.position.set(SKY_R*.96*Math.cos(el)*Math.sin(az),SKY_R*.96*Math.sin(el),SKY_R*.96*Math.cos(el)*Math.cos(az))
    mesh.lookAt(0,0,0); mesh.rotateZ(Math.random()*Math.PI*2); scene.add(mesh)
  })
}

// ─── Moon ─────────────────────────────────────────────────────────────
function buildMoon(scene: THREE.Scene): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(17, 128, 128),
    new THREE.MeshBasicMaterial({ map: makeMoonTex() })
  )
  const MAZ = 1.25, MEL = 0.44
  mesh.position.set(
    SKY_R*.71*Math.cos(MEL)*Math.sin(MAZ),
    SKY_R*.71*Math.sin(MEL),
    SKY_R*.71*Math.cos(MEL)*Math.cos(MAZ),
  )
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTex(225,215,168), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
  }))
  halo.position.copy(mesh.position); halo.scale.setScalar(120); scene.add(halo)
  return mesh
}

// ─── Earth ────────────────────────────────────────────────────────────
function buildEarth(scene: THREE.Scene): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(20, 128, 128),
    new THREE.MeshBasicMaterial({ map: makeEarthTex() })
  )
  const EAZ = 4.20, EEL = 0.60
  mesh.position.set(
    SKY_R*.78*Math.cos(EEL)*Math.sin(EAZ),
    SKY_R*.78*Math.sin(EEL),
    SKY_R*.78*Math.cos(EEL)*Math.cos(EAZ),
  )
  // Atmosphere glow
  const atmo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTex(90,155,255), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, opacity:.55,
  }))
  atmo.position.copy(mesh.position); atmo.scale.setScalar(140); scene.add(atmo)
  return mesh
}

// ─── Sun ──────────────────────────────────────────────────────────────
function buildSun(scene: THREE.Scene): THREE.Sprite {
  const SAZ = 5.80, SEL = 0.35
  const pos = new THREE.Vector3(
    SKY_R*.76*Math.cos(SEL)*Math.sin(SAZ),
    SKY_R*.76*Math.sin(SEL),
    SKY_R*.76*Math.cos(SEL)*Math.cos(SAZ),
  )
  const core = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeSunTex(), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
  }))
  core.position.copy(pos); core.scale.setScalar(220); scene.add(core)
  const corona = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTex(255,175,45), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, opacity:.38,
  }))
  corona.position.copy(pos); corona.scale.setScalar(460); scene.add(corona)
  return core
}

// ─── Shooting stars ───────────────────────────────────────────────────
interface Shooter {
  pts: THREE.Points; mat: THREE.ShaderMaterial; attr: THREE.BufferAttribute
  head: THREE.Vector3; dir: THREE.Vector3; speed: number
  life: number; maxLife: number; active: boolean
}
function makeShooter(scene: THREE.Scene): Shooter {
  const pos=new Float32Array(TRAIL_N*3), idx=new Float32Array(TRAIL_N), szA=new Float32Array(TRAIL_N)
  for (let i=0;i<TRAIL_N;i++){idx[i]=i/(TRAIL_N-1);szA[i]=3.8*(1-i/(TRAIL_N-1))+.4}
  const geo=new THREE.BufferGeometry()
  const attr=new THREE.BufferAttribute(pos,3).setUsage(THREE.DynamicDrawUsage)
  geo.setAttribute('position',attr)
  geo.setAttribute('aI',new THREE.BufferAttribute(idx,1))
  geo.setAttribute('aSz',new THREE.BufferAttribute(szA,1))
  const mat=new THREE.ShaderMaterial({
    uniforms:{uOp:{value:0}},
    vertexShader:`attribute float aI;attribute float aSz;varying float vI;void main(){vI=aI;vec4 mp=modelViewMatrix*vec4(position,1.);gl_PointSize=aSz*(520./length(mp.xyz));gl_Position=projectionMatrix*mp;}`,
    fragmentShader:`varying float vI;uniform float uOp;void main(){vec2 uv=gl_PointCoord-.5;float d=length(uv)*2.;if(d>1.)discard;float a=smoothstep(1.,0.,d)*(1.-vI)*uOp;gl_FragColor=vec4(1.,.97,.88,a);}`,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
  })
  const pts=new THREE.Points(geo,mat); scene.add(pts)
  return {pts,mat,attr,head:new THREE.Vector3(),dir:new THREE.Vector3(),speed:0,life:0,maxLife:1,active:false}
}
function spawnShooter(s: Shooter){
  const az=Math.random()*Math.PI*2,el=Math.random()*.75-.05
  s.head.set(SKY_R*Math.cos(el)*Math.sin(az),SKY_R*Math.sin(el),SKY_R*Math.cos(el)*Math.cos(az))
  const tan=new THREE.Vector3(Math.random()-.5,Math.random()*.15-.075,Math.random()-.5).normalize()
  const rad=s.head.clone().normalize()
  s.dir.copy(tan).sub(rad.multiplyScalar(tan.dot(rad))).normalize()
  s.speed=1.8+Math.random()*2.8;s.maxLife=.55+Math.random()*.75;s.life=0;s.active=true
}
function tickShooter(s: Shooter,dt: number){
  if(!s.active) return
  s.life+=dt
  const t=s.life/s.maxLife
  const op=t<.18?t/.18:t<.72?1:(1-t)/(1-.72)
  s.mat.uniforms.uOp.value=Math.max(0,op)
  s.head.addScaledVector(s.dir,s.speed*dt*58).normalize().multiplyScalar(SKY_R)
  const pa=s.attr.array as Float32Array
  for (let i=0;i<TRAIL_N;i++){
    const frac=i/(TRAIL_N-1)
    const tp=s.head.clone().addScaledVector(s.dir,-frac*9).normalize().multiplyScalar(SKY_R*(.984-frac*.005))
    pa[i*3]=tp.x;pa[i*3+1]=tp.y;pa[i*3+2]=tp.z
  }
  s.attr.needsUpdate=true
  if(s.life>=s.maxLife){s.active=false;s.mat.uniforms.uOp.value=0}
}

// ─── Component ────────────────────────────────────────────────────────
export default function NightSkyExperience() {
  const mountRef  = useRef<HTMLDivElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [explore, setExplore] = useState(false)
  const exploreRef = useRef(false)

  const S = useRef({
    renderer: null as THREE.WebGLRenderer|null,
    scene: null as THREE.Scene|null,
    camera: null as THREE.PerspectiveCamera|null,
    clock: null as THREE.Clock|null,
    starMats: [] as THREE.ShaderMaterial[],
    shooters: [] as Shooter[],
    raf: 0,
    phi:   DFLT_PHI, theta:  DFLT_EL,  fov:   DFLT_FOV,
    tPhi:  DFLT_PHI, tTheta: DFLT_EL,  tFov:  DFLT_FOV,
    vPhi: 0, vTheta: 0,
    down: false, lastX: 0, lastY: 0, lastTD: 0,
    nextShoot: 3,
  })

  useEffect(() => {
    if (!mountRef.current) return
    const s   = S.current
    const mob = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const el  = mountRef.current
    s.clock   = new THREE.Clock()

    const renderer = new THREE.WebGLRenderer({antialias:!mob,alpha:false,powerPreference:'high-performance'})
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mob?1.5:2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    el.appendChild(renderer.domElement)
    s.renderer = renderer

    const scene = new THREE.Scene()
    s.scene = scene
    scene.add(new THREE.AmbientLight(0x0d1220, .6))

    const cam = new THREE.PerspectiveCamera(DFLT_FOV, el.clientWidth/el.clientHeight, .1, SKY_R*2)
    cam.position.set(0,0,0); s.camera = cam

    scene.add(buildSkyDome())
    buildNebulae(scene)

    const bright = buildStars(mob?4800:9000, 1.2, 4.8, true)
    scene.add(bright); s.starMats.push(bright.material as THREE.ShaderMaterial)
    const faint = buildStars(mob?55000:155000, .25, 1.15, false)
    scene.add(faint); s.starMats.push(faint.material as THREE.ShaderMaterial)
    const mw = buildMilkyWay(mob?110000:260000)
    scene.add(mw); s.starMats.push(mw.material as THREE.ShaderMaterial)

    const moon  = buildMoon(scene);  scene.add(moon)
    const earth = buildEarth(scene); scene.add(earth)
    buildSun(scene)

    for (let i = 0; i < 5; i++) s.shooters.push(makeShooter(scene))

    // Pre-compute 3D label positions
    const labelVecs = ALL_LABELS.map(l => new THREE.Vector3(
      SKY_R * Math.cos(l.theta) * Math.sin(l.phi),
      SKY_R * Math.sin(l.theta),
      SKY_R * Math.cos(l.theta) * Math.cos(l.phi),
    ))
    const pv = new THREE.Vector3()

    function tick() {
      s.raf = requestAnimationFrame(tick)
      const dt = Math.min(s.clock!.getDelta(), .05)
      const t  = s.clock!.elapsedTime
      s.starMats.forEach(m => { if (m.uniforms.uTime) m.uniforms.uTime.value = t })
      moon.rotation.y  = t * .018
      earth.rotation.y = t * .008

      if (!s.down) {
        if (Math.abs(s.vPhi)>.00005 || Math.abs(s.vTheta)>.00005) {
          s.tPhi   += s.vPhi;   s.tTheta += s.vTheta
          s.vPhi   *= .90;      s.vTheta *= .90
          s.tTheta = Math.max(-1.47, Math.min(1.47, s.tTheta))
        }
      }
      if (exploreRef.current) {
        s.tPhi  += .00016
        s.tTheta += Math.sin(t*.07)*.00005
      }

      const k = .072
      s.phi   += (s.tPhi   - s.phi)   * k
      s.theta += (s.tTheta - s.theta) * k
      s.fov   += (s.tFov   - s.fov)   * .1
      s.theta = Math.max(-1.47, Math.min(1.47, s.theta))
      cam.fov = s.fov; cam.updateProjectionMatrix()
      cam.lookAt(
        Math.cos(s.theta)*Math.sin(s.phi)*200,
        Math.sin(s.theta)*200,
        Math.cos(s.theta)*Math.cos(s.phi)*200,
      )

      s.nextShoot -= dt
      if (s.nextShoot <= 0) {
        const free = s.shooters.find(sh => !sh.active)
        if (free) spawnShooter(free)
        s.nextShoot = 4 + Math.random()*11
      }
      s.shooters.forEach(sh => tickShooter(sh, dt))

      // ── Labels ───────────────────────────────────────────────────
      const lc = labelsRef.current
      if (lc) {
        const W = el.clientWidth, H = el.clientHeight
        labelVecs.forEach((vec, i) => {
          const div = lc.children[i] as HTMLElement
          if (!div) return
          pv.copy(vec).project(cam)
          if (pv.z < 1 && pv.x > -.92 && pv.x < .92 && pv.y > -.90 && pv.y < .90) {
            const sx = (pv.x*.5+.5)*W
            const sy = (-pv.y*.5+.5)*H
            const edge = Math.min(1, (0.90 - Math.max(Math.abs(pv.x), Math.abs(pv.y)))*5.5)
            div.style.left    = sx+'px'
            div.style.top     = sy+'px'
            div.style.opacity = String(Math.max(0,edge)*(ALL_LABELS[i].planet ? .95 : .68))
            div.style.display = 'block'
          } else {
            div.style.display = 'none'
          }
        })
      }

      renderer.render(scene, cam)
    }
    tick()
    setReady(true)

    const ro = new ResizeObserver(() => {
      renderer.setSize(el.clientWidth, el.clientHeight)
      cam.aspect = el.clientWidth/el.clientHeight
      cam.updateProjectionMatrix()
    })
    ro.observe(el)

    // ── Mouse (desktop): H inverted, V = Google Earth — drag down → sky descends ──
    const onDown = (e: MouseEvent) => {
      s.down = true; s.lastX = e.clientX; s.lastY = e.clientY
      s.vPhi = 0; s.vTheta = 0; el.style.cursor = 'grabbing'
    }
    const onMove = (e: MouseEvent) => {
      if (!s.down) return
      const sens = (s.fov/70)*.0022
      const dx = e.clientX - s.lastX, dy = e.clientY - s.lastY
      s.tPhi   += dx * sens           // inverted H: drag right → sky moves right
      s.tTheta += dy * sens           // Google Earth V: drag down → sky descends
      s.tTheta  = Math.max(-1.47, Math.min(1.47, s.tTheta))
      s.vPhi    =  dx * sens * .28
      s.vTheta  =  dy * sens * .28
      s.lastX   = e.clientX; s.lastY = e.clientY
    }
    const onUp  = () => { s.down = false; el.style.cursor = 'grab' }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      s.tFov = Math.max(MIN_FOV, Math.min(MAX_FOV, s.tFov + e.deltaY*.038))
    }
    const onDbl = (e: MouseEvent) => {
      const W=el.clientWidth,H=el.clientHeight
      const nx=(e.clientX/W-.5)*2, ny=-(e.clientY/H-.5)*2
      const hfv=(s.fov*Math.PI/180)/2
      s.tPhi   += nx*hfv*(W/H)*.55
      s.tTheta -= ny*hfv*.55
      s.tFov    = Math.max(MIN_FOV, s.tFov-18)
    }

    // ── Touch ─────────────────────────────────────────────────────
    const onTS = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length===1) {
        s.down=true; s.lastX=e.touches[0].clientX; s.lastY=e.touches[0].clientY
        s.vPhi=0; s.vTheta=0
      } else if (e.touches.length===2) {
        s.down=false
        s.lastTD=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)
      }
    }
    const onTM = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length===1&&s.down) {
        const sens=(s.fov/70)*.0028
        const dx=e.touches[0].clientX-s.lastX, dy=e.touches[0].clientY-s.lastY
        s.tPhi-=dx*sens; s.tTheta+=dy*sens
        s.tTheta=Math.max(-1.47,Math.min(1.47,s.tTheta))
        s.vPhi=-dx*sens*.22; s.vTheta=dy*sens*.22
        s.lastX=e.touches[0].clientX; s.lastY=e.touches[0].clientY
      } else if (e.touches.length===2) {
        const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)
        s.tFov=Math.max(MIN_FOV,Math.min(MAX_FOV,s.tFov*(s.lastTD/d))); s.lastTD=d
      }
    }
    const onTE = (e: TouchEvent) => { if (e.touches.length===0) s.down=false }

    // ── Keyboard ──────────────────────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      const sp = .04
      if (e.key==='ArrowLeft')  s.tPhi-=sp
      if (e.key==='ArrowRight') s.tPhi+=sp
      if (e.key==='ArrowUp')    s.tTheta+=sp
      if (e.key==='ArrowDown')  s.tTheta-=sp
      if (e.key==='+'||e.key==='=') s.tFov=Math.max(MIN_FOV,s.tFov-5)
      if (e.key==='-')              s.tFov=Math.min(MAX_FOV,s.tFov+5)
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
    el.style.cursor = 'grab'

    return () => {
      cancelAnimationFrame(s.raf); ro.disconnect()
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
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  const toggleExplore = () => { const n=!explore; setExplore(n); exploreRef.current=n }
  const resetView = () => {
    const s=S.current; s.tPhi=DFLT_PHI; s.tTheta=DFLT_EL; s.tFov=DFLT_FOV; s.vPhi=0; s.vTheta=0
  }
  const zoom = (d: number) => { const s=S.current; s.tFov=Math.max(MIN_FOV,Math.min(MAX_FOV,s.tFov+d)) }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      <div ref={mountRef} className="absolute inset-0" tabIndex={0} aria-label="Interactive night sky" />

      {/* Labels — always mounted */}
      <div ref={labelsRef} className="absolute inset-0 pointer-events-none z-10" style={{overflow:'hidden'}}>
        {ALL_LABELS.map((lbl, i) => (
          <div key={i} className="absolute" style={{display:'none',left:0,top:0}}>
            <div
              className="flex flex-col items-center gap-[3px]"
              style={{transform:'translate(-50%, calc(-100% - 5px))'}}
            >
              <span
                className="whitespace-nowrap font-light"
                style={{
                  fontSize: lbl.planet ? '11px' : '9px',
                  letterSpacing: lbl.planet ? '0.22em' : '0.18em',
                  textTransform: 'uppercase',
                  color: lbl.planet ? (lbl.name==='Sun'?'#FFD060': lbl.name==='Moon'?'#D8D0B8':'#7BB8FF') : 'rgba(255,255,255,.62)',
                  textShadow: '0 0 8px rgba(0,0,0,1),0 0 16px rgba(0,0,0,.8)',
                  fontWeight: lbl.planet ? 500 : 300,
                }}
              >
                {lbl.name}
              </span>
              <div className="w-[1px]" style={{height: lbl.planet?'7px':'5px', background: lbl.planet?'rgba(255,255,255,.30)':'rgba(255,255,255,.18)'}}/>
              <div style={{
                width: lbl.planet?'4px':'3px',
                height: lbl.planet?'4px':'3px',
                borderRadius:'50%',
                background: lbl.planet?'rgba(255,255,255,.45)':'rgba(255,255,255,.28)',
              }}/>
            </div>
          </div>
        ))}
      </div>

      {!ready&&(
        <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#D4A843] border-t-transparent rounded-full animate-spin mx-auto"/>
            <p className="text-[#D4A843]/80 text-xs tracking-[.25em] uppercase">Rendering the sky…</p>
          </div>
        </div>
      )}

      {ready&&(<>
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

        <div className="absolute right-4 sm:right-6 bottom-[5.5rem] sm:bottom-24 flex flex-col gap-2 z-20">
          {([{label:'+',fn:()=>zoom(-10),aria:'Zoom in'},{label:'−',fn:()=>zoom(+10),aria:'Zoom out'}] as {label:string;fn:()=>void;aria:string}[]).map(({label,fn,aria})=>(
            <button key={label} onClick={fn} aria-label={aria}
              className="w-10 h-10 rounded-sm bg-black/50 border border-white/12 text-white/55 hover:text-white hover:border-white/35 hover:bg-black/70 transition-all flex items-center justify-center text-xl font-light backdrop-blur-md">
              {label}
            </button>
          ))}
          <button onClick={resetView} aria-label="Reset view"
            className="w-10 h-10 rounded-sm bg-black/50 border border-white/12 text-white/40 hover:text-white hover:border-white/35 hover:bg-black/70 transition-all flex items-center justify-center text-base backdrop-blur-md">
            ⊙
          </button>
        </div>

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
