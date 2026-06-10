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
  { name: 'Earth', phi: 0.80, theta:  0.52 },
  { name: 'Sun',   phi: 5.80, theta:  0.35 },
]
const ALL_LABELS = [
  ...STAR_LABELS.map(s => ({ ...s, planet: false })),
  ...PLANET_LABELS.map(p => ({ ...p, planet: true })),
]

// ─── Moon texture ─────────────────────────────────────────────────────
function makeMoonTex(): THREE.CanvasTexture {
  const S = 1024
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const cx = cv.getContext('2d')!

  // Dark charcoal base — matches real lunar photography
  cx.fillStyle = '#3A3838'
  cx.fillRect(0, 0, S, S)

  // Coarse albedo variation across the surface
  for (let i = 0; i < 600; i++) {
    const px = Math.random()*S, py = Math.random()*S
    const r = 8 + Math.random()*80
    const bright = Math.random() > .48
    const a = .018 + Math.random()*.038
    const v = bright ? 90 : 20
    const g = cx.createRadialGradient(px,py,0,px,py,r)
    g.addColorStop(0, `rgba(${v},${v},${v},${a})`)
    g.addColorStop(1, `rgba(${v},${v},${v},0)`)
    cx.fillStyle = g; cx.fillRect(0,0,S,S)
  }

  // ── Maria — very dark volcanic plains ──
  const maria: [number,number,number,number,number][] = [
    [.22,.45,.24,1.60,.92],  // Oceanus Procellarum
    [.43,.30,.14,1.00,.88],  // Mare Imbrium
    [.58,.33,.11,1.00,.85],  // Mare Serenitatis
    [.61,.44,.11,1.00,.85],  // Mare Tranquillitatis
    [.73,.37,.08,1.38,.88],  // Mare Crisium
    [.66,.55,.10,1.00,.80],  // Mare Fecunditatis
    [.63,.63,.060,1.00,.82], // Mare Nectaris
    [.50,.41,.060,1.00,.68], // Mare Vaporum
    [.38,.42,.060,1.00,.68], // Mare Insularum
    [.28,.38,.045,1.00,.60], // Sinus Iridum
    [.68,.25,.060,1.00,.72], // Mare Frigoris
    [.18,.50,.080,1.00,.55], // Mare Orientale edge
  ]
  maria.forEach(([mx,my,mr,sy,op]) => {
    const g = cx.createRadialGradient(mx*S,my*S,0,mx*S,my*S,mr*S)
    g.addColorStop(0, `rgba(18,17,16,${op})`)
    g.addColorStop(.55,`rgba(28,27,25,${op*.60})`)
    g.addColorStop(1, `rgba(40,38,36,0)`)
    cx.fillStyle = g
    cx.save(); cx.scale(1, sy)
    cx.beginPath(); cx.arc(mx*S, my*S/sy, mr*S, 0, Math.PI*2)
    cx.fill(); cx.restore()
  })

  // Helper: draw a single crater
  const crater = (px: number, py: number, r: number, hasPeak = false) => {
    // Bright ejecta blanket
    const g0 = cx.createRadialGradient(px,py,r*.6,px,py,r*2.0)
    g0.addColorStop(0,'rgba(110,108,104,0)')
    g0.addColorStop(.35,'rgba(95,93,88,.28)')
    g0.addColorStop(.7, 'rgba(75,73,68,.12)')
    g0.addColorStop(1,  'rgba(55,53,50,0)')
    cx.fillStyle = g0; cx.beginPath(); cx.arc(px,py,r*2.0,0,Math.PI*2); cx.fill()
    // Bright rim
    const g1 = cx.createRadialGradient(px,py,r*.72,px,py,r*1.25)
    g1.addColorStop(0,  'rgba(120,118,114,0)')
    g1.addColorStop(.42,'rgba(128,126,120,.55)')
    g1.addColorStop(.75,'rgba(118,115,110,.30)')
    g1.addColorStop(1,  'rgba(80,78,74,0)')
    cx.fillStyle = g1; cx.beginPath(); cx.arc(px,py,r*1.28,0,Math.PI*2); cx.fill()
    // Dark floor
    const g2 = cx.createRadialGradient(px,py,0,px,py,r*.82)
    g2.addColorStop(0, 'rgba(14,13,12,.82)')
    g2.addColorStop(.6,'rgba(22,21,20,.45)')
    g2.addColorStop(1, 'rgba(35,33,31,0)')
    cx.fillStyle = g2; cx.beginPath(); cx.arc(px,py,r*.85,0,Math.PI*2); cx.fill()
    // Central peak
    if (hasPeak) {
      const g3 = cx.createRadialGradient(px,py,0,px,py,r*.18)
      g3.addColorStop(0,'rgba(130,128,124,.65)'); g3.addColorStop(1,'rgba(130,128,124,0)')
      cx.fillStyle = g3; cx.beginPath(); cx.arc(px,py,r*.22,0,Math.PI*2); cx.fill()
    }
  }

  // Large named craters
  [[.78,.72,22,true],[.42,.68,20,true],[.28,.72,16,false],[.55,.65,15,false],
   [.25,.28,14,false],[.65,.22,12,false],[.44,.22,13,true],[.35,.52,11,false],
   [.80,.48,10,false],[.70,.60,11,false],[.48,.55,9,false],[.62,.28,8,false]
  ].forEach(([x,y,r,p])=>crater(x as number*S,y as number*S,r as number,p as boolean))

  // Tycho rays
  const tyX=.78*S, tyY=.72*S
  for (let i=0;i<20;i++) {
    const ang=(i/20)*Math.PI*2, len=80+Math.random()*180
    cx.save(); cx.translate(tyX,tyY); cx.rotate(ang)
    const g=cx.createLinearGradient(0,0,len,0)
    g.addColorStop(0,'rgba(140,138,132,.38)'); g.addColorStop(.5,'rgba(130,128,122,.16)'); g.addColorStop(1,'rgba(110,108,104,0)')
    cx.strokeStyle=g; cx.lineWidth=1.8+Math.random()*2.8
    cx.beginPath(); cx.moveTo(18,0); cx.lineTo(len,0); cx.stroke(); cx.restore()
  }

  // Medium craters
  for (let i=0;i<180;i++) crater(Math.random()*S, Math.random()*S, 5+Math.random()*15)
  // Small craters
  for (let i=0;i<700;i++) crater(Math.random()*S, Math.random()*S, 1.5+Math.random()*5)
  // Micro craters — gives the grainy texture seen in photos
  for (let i=0;i<1800;i++) {
    const px=Math.random()*S, py=Math.random()*S, r=0.6+Math.random()*2
    const g=cx.createRadialGradient(px,py,0,px,py,r*1.4)
    g.addColorStop(0,'rgba(8,8,8,.55)'); g.addColorStop(.6,'rgba(100,98,95,.22)'); g.addColorStop(1,'rgba(60,58,55,0)')
    cx.fillStyle=g; cx.beginPath(); cx.arc(px,py,r*1.4,0,Math.PI*2); cx.fill()
  }

  return new THREE.CanvasTexture(cv)
}

// ─── Earth texture (equirectangular 2:1) ─────────────────────────────
function makeEarthTex(): THREE.CanvasTexture {
  const W = 1024, H = 512
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const cx = cv.getContext('2d')!

  // Vivid deep-ocean base
  cx.fillStyle = '#1165C8'
  cx.fillRect(0, 0, W, H)

  // Ocean tone variation: tropical brighter, polar deeper
  const od = cx.createLinearGradient(0,0,0,H)
  od.addColorStop(0,   'rgba(5,18,68,.55)')
  od.addColorStop(.18, 'rgba(0,0,0,0)')
  od.addColorStop(.40, 'rgba(30,120,210,.14)')  // equatorial sunlit
  od.addColorStop(.65, 'rgba(0,0,0,0)')
  od.addColorStop(1,   'rgba(5,18,68,.55)')
  cx.fillStyle = od; cx.fillRect(0,0,W,H)

  // Shallow-water / sunlit-surface highlights (Caribbean, Pacific atolls)
  const shallow = [
    [.220,.430,.065,.028],[.230,.390,.045,.020],[.205,.460,.038,.018],
    [.840,.520,.040,.015],[.890,.480,.030,.012],
  ]
  shallow.forEach(([x,y,rx,ry]) => {
    const g = cx.createRadialGradient(x*W,y*H,0,x*W,y*H,rx*W)
    g.addColorStop(0,'rgba(55,185,240,.30)'); g.addColorStop(.5,'rgba(30,150,210,.14)'); g.addColorStop(1,'rgba(0,0,0,0)')
    cx.fillStyle=g; cx.beginPath(); cx.ellipse(x*W,y*H,rx*W,ry*H,0,0,Math.PI*2); cx.fill()
  })

  const L = (x: number, y: number, rx: number, ry: number, rot: number, col: string, a=1.0) => {
    cx.save(); cx.globalAlpha=a; cx.fillStyle=col
    cx.translate(x*W,y*H); cx.rotate(rot)
    cx.beginPath(); cx.ellipse(0,0,rx*W,ry*H,0,0,Math.PI*2)
    cx.fill(); cx.restore()
  }

  // ── Africa ──
  L(.555,.54,.050,.200,-.10,'#2E6015')   // equatorial rain forest
  L(.555,.43,.043,.095, .12,'#6A8820')   // N savanna
  L(.562,.30,.038,.052,  .0,'#C89030')   // Sahara
  L(.538,.31,.030,.045,-.08,'#BB8828')   // W Sahara
  L(.578,.30,.020,.032, .22,'#CC9838')   // Libya/Egypt
  L(.610,.47,.015,.026, .32,'#888828')   // Horn
  L(.553,.68,.024,.032,  .0,'#306010')   // S Africa
  // ── Arabia ──
  L(.620,.390,.022,.040, .12,'#C08C30')
  // ── Europe ──
  L(.528,.268,.035,.060, .18,'#4A7820')
  L(.524,.212,.016,.042,-.15,'#406A1A')  // Scandinavia
  L(.508,.288,.013,.022,  .0,'#528022')  // Iberia
  // ── Asia ──
  L(.718,.278,.130,.110,-.07,'#468018')  // main landmass
  L(.742,.192,.102,.078,-.05,'#345E14')  // Siberia
  L(.675,.275,.060,.050,  .0,'#A08228')  // C Asia arid
  L(.628,.316,.034,.040,  .0,'#B88828')  // Middle East
  L(.648,.420,.028,.072, .04,'#508020')  // Indian sub
  L(.793,.458,.037,.042, .10,'#387818')  // SE Asia
  L(.845,.463,.020,.022,  .0,'#387818')
  L(.834,.278,.011,.023,-.10,'#407020')  // Japan
  // ── North America ──
  L(.208,.285,.080,.125,-.18,'#427820')  // E forests + center
  L(.175,.255,.048,.065,-.22,'#886825')  // W deserts/Rockies
  L(.232,.192,.042,.055,-.28,'#3A6518')  // Canada forests
  L(.206,.382,.023,.032, .08,'#4A8018')  // Mexico
  L(.158,.118,.026,.060,-.10,'#C2D5EA')  // Greenland ice
  // ── South America ──
  L(.282,.618,.043,.150, .12,'#246010')  // Amazon — very dark green
  L(.280,.442,.027,.053, .06,'#347018')
  L(.312,.692,.022,.032, .15,'#487820')  // Patagonia
  L(.295,.565,.018,.025, .05,'#8A7830')  // Atacama
  // ── Australia ──
  L(.877,.652,.048,.054, .08,'#A87020')  // red interior
  L(.858,.612,.020,.020,  .0,'#986818')
  L(.902,.632,.015,.020,  .0,'#906015')
  L(.870,.682,.016,.022, .10,'#507820')  // E green coast
  // ── Madagascar ──
  L(.597,.607,.011,.024, .05,'#4A7818')
  // ── New Zealand ──
  L(.938,.722,.007,.017,-.10,'#457020')

  // Antarctica — bright ice
  const ant = cx.createLinearGradient(0,H*.74,0,H)
  ant.addColorStop(0,  'rgba(190,212,240,0)')
  ant.addColorStop(.22,'rgba(210,228,248,.92)')
  ant.addColorStop(1,  'rgba(232,245,255,1.0)')
  cx.fillStyle=ant; cx.fillRect(0,H*.72,W,H*.28)
  // Arctic
  const arc = cx.createLinearGradient(0,0,0,H*.16)
  arc.addColorStop(0,  'rgba(232,245,255,.96)')
  arc.addColorStop(.5, 'rgba(210,228,248,.55)')
  arc.addColorStop(1,  'rgba(190,212,240,0)')
  cx.fillStyle=arc; cx.fillRect(0,0,W,H*.16)

  // Atmospheric polar haze (blue)
  const ph = cx.createLinearGradient(0,0,0,H)
  ph.addColorStop(0,   'rgba(60,110,200,.18)'); ph.addColorStop(.13,'rgba(60,110,200,0)')
  ph.addColorStop(.87, 'rgba(60,110,200,0)');   ph.addColorStop(1,  'rgba(60,110,200,.18)')
  cx.fillStyle=ph; cx.fillRect(0,0,W,H)

  // ── Clouds — large swirling systems, ~45% coverage ──
  // Big cloud masses
  for (let i=0;i<18;i++) {
    const cx_=Math.random()*W, cy_=H*.08+Math.random()*H*.84
    const rx=80+Math.random()*140, ry=rx*(0.25+Math.random()*.35)
    const rot=(Math.random()-.5)*.9
    const op=0.55+Math.random()*.30
    const g=cx.createRadialGradient(cx_,cy_,0,cx_,cy_,rx)
    g.addColorStop(0,`rgba(255,255,255,${op})`); g.addColorStop(.4,`rgba(252,252,255,${op*.6})`); g.addColorStop(1,'rgba(255,255,255,0)')
    cx.fillStyle=g; cx.beginPath(); cx.ellipse(cx_,cy_,rx,ry,rot,0,Math.PI*2); cx.fill()
  }
  // Medium cloud patches
  for (let i=0;i<45;i++) {
    const cx_=Math.random()*W, cy_=H*.06+Math.random()*H*.88
    const rx=30+Math.random()*80, ry=rx*(0.15+Math.random()*.25)
    const rot=(Math.random()-.5)*.7
    const op=0.35+Math.random()*.40
    const g=cx.createRadialGradient(cx_,cy_,0,cx_,cy_,rx)
    g.addColorStop(0,`rgba(255,255,255,${op})`); g.addColorStop(.5,`rgba(250,252,255,${op*.5})`); g.addColorStop(1,'rgba(255,255,255,0)')
    cx.fillStyle=g; cx.beginPath(); cx.ellipse(cx_,cy_,rx,ry,rot,0,Math.PI*2); cx.fill()
  }
  // Wispy cloud streaks
  for (let i=0;i<60;i++) {
    const cx_=Math.random()*W, cy_=H*.05+Math.random()*H*.90
    const rx=18+Math.random()*55, ry=rx*(0.08+Math.random()*.14)
    const rot=(Math.random()-.5)*.55
    const op=0.20+Math.random()*.28
    const g=cx.createRadialGradient(cx_,cy_,0,cx_,cy_,rx)
    g.addColorStop(0,`rgba(255,255,255,${op})`); g.addColorStop(1,'rgba(255,255,255,0)')
    cx.fillStyle=g; cx.beginPath(); cx.ellipse(cx_,cy_,rx,ry,rot,0,Math.PI*2); cx.fill()
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
    new THREE.SphereGeometry(22, 128, 128),
    new THREE.MeshPhongMaterial({ map: makeMoonTex(), shininess: 3, specular: new THREE.Color(0x0a0a0a) })
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
    new THREE.SphereGeometry(32, 128, 128),
    new THREE.MeshPhongMaterial({ map: makeEarthTex(), shininess: 35, specular: new THREE.Color(0x1a4080) })
  )
  const EAZ = 0.80, EEL = 0.52
  mesh.position.set(
    SKY_R*.78*Math.cos(EEL)*Math.sin(EAZ),
    SKY_R*.78*Math.sin(EEL),
    SKY_R*.78*Math.cos(EEL)*Math.cos(EAZ),
  )
  // Atmosphere glow
  const atmo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTex(90,155,255), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, opacity:.65,
  }))
  atmo.position.copy(mesh.position); atmo.scale.setScalar(220); scene.add(atmo)
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
    // Directional sun light — gives 3D shading to moon & earth
    const _sunDL = new THREE.DirectionalLight(0xFFF5E0, 3.5)
    _sunDL.position.set(
      Math.cos(0.35)*Math.sin(5.80)*400,
      Math.sin(0.35)*400,
      Math.cos(0.35)*Math.cos(5.80)*400
    )
    scene.add(_sunDL)

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

      const k = s.down ? 1.0 : 0.088
      s.phi   += (s.tPhi   - s.phi)   * k
      s.theta += (s.tTheta - s.theta) * k
      s.fov   += (s.tFov   - s.fov)   * (s.down ? 1.0 : 0.1)
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
        const fovRad = s.fov * Math.PI / 180
        const hFovRad = 2 * Math.atan(Math.tan(fovRad/2) * (el.clientWidth/el.clientHeight))
        const sensH = hFovRad / el.clientWidth
        const sensV = fovRad / el.clientHeight
        const dx=e.touches[0].clientX-s.lastX, dy=e.touches[0].clientY-s.lastY
        s.tPhi+=dx*sensH; s.tTheta+=dy*sensV
        s.tTheta=Math.max(-1.47,Math.min(1.47,s.tTheta))
        s.vPhi=dx*sensH*.25; s.vTheta=dy*sensV*.25
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

        <div className="absolute inset-x-0 flex flex-col items-center gap-3 z-20 px-4"
          style={{bottom:'max(5.5rem, calc(env(safe-area-inset-bottom, 0px) + 4.5rem))'}}>
          <button onClick={toggleExplore}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border text-[11px] tracking-[.16em] uppercase transition-all duration-300 backdrop-blur-md ${
              explore
                ? 'bg-[#D4A843]/18 border-[#D4A843]/45 text-[#D4A843]'
                : 'bg-black/45 border-white/12 text-white/45 hover:text-white/75 hover:border-white/28'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${explore?'bg-[#D4A843] animate-pulse':'bg-white/25'}`}/>
            {explore?'Exploring…':'Explore Mode'}
          </button>
          <p className="text-white/22 text-[9px] tracking-[.18em] uppercase">
            Created by Ruben Uzan
          </p>
        </div>
      </>)}
    </div>
  )
}
