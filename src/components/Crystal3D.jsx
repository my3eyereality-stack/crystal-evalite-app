import { useEffect, useRef } from 'react'
import { MC, C } from '../theme.js'

export default function Crystal3D({ size=320, height=380, autoSpin=true, showLabels=true, onTapFace=null }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const angle = useRef({x:0.3,y:0})
  const drag = useRef(false)
  const last = useRef({x:0,y:0})

  useEffect(()=>{
    const cv = canvasRef.current; if(!cv) return
    const ctx = cv.getContext('2d')
    const W=size, H=height; cv.width=W*2; cv.height=H*2; ctx.scale(2,2)

    const proj=(x,y,z)=>{const s=400/(400+z);return{x:W/2+x*s,y:H/2+y*s,s}}
    const rY=(x,y,z,a)=>({x:x*Math.cos(a)-z*Math.sin(a),y,z:x*Math.sin(a)+z*Math.cos(a)})
    const rX=(x,y,z,a)=>({x,y:y*Math.cos(a)-z*Math.sin(a),z:y*Math.sin(a)+z*Math.cos(a)})

    const SZ=size*0.28, ST=1.4
    const verts=[[0,-SZ*ST,0],[SZ,0,0],[0,0,SZ],[-SZ,0,0],[0,0,-SZ],[0,SZ*ST,0]]
  2 const faces=[[0,1,2],[0,2,3],[0,3,4],[0,4,1],[5,2,1],[5,3,2],[5,4,3],[5,1,4]]
    const fC=['rgba(0,212,255,0.18)','rgba(124,58,237,0.18)','rgba(212,160,23,0.18)','rgba(0,212,255,0.14)',
      'rgba(212,160,23,0.18)','rgba(0,212,255,0.18)','rgba(124,58,237,0.18)','rgba(212,160,23,0.14)']
    const edges=[[0,1],[0,2],[0,3],[0,4],[1,2],[2,3],[3,4],[4,1],[5,1],[5,2],[5,3],[5,4]]

    const draw=()=>{
      if(autoSpin)angle.current.y+=0.008
      const ax=angle.current.x,ay=angle.current.y; ctx.clearRect(0,0,W,H)
      const grd=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.56)
      grd.addColorStop(0,'rgba(0,212,255,0.06)');grd.addColorStop(0.5,'rgba(124,58,237,0.03)');grd.addColorStop(1,'transparent')
      ctx.fillStyle=grd;ctx.fillRect(0,0,W,H)
      const tf=verts.map(([vx,vy,vz])=>{let r=rY(vx,vy,vz,ay);return rX(r.x,r.y,r.z,ax)})
      faces.map((f,i)=>({f,i,z:(tf[f[0]].z+tf[f[1]].z+tf[f[2]].z)/3})).sort((a,b)=>b.z-a.z).forEach(({f,i})=>{
        const pts=f.map(vi=>proj(tf[vi].x,tf[vi].y,tf[vi].z))
        ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);pts.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.closePath()
        ctx.fillStyle=fC[i];ctx.fill();ctx.strokeStyle='rgba(0,212,255,0.35)';ctx.lineWidth=1;ctx.stroke()
      })
      edges.forEach(([a,b])=>{const pa=proj(tf[a].x,tf[a].y,tf[a].z),pb=proj(tf[b].x,tf[b].y,tf[b].z);ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.strokeStyle='rgba(0,212,255,0.5)';ctx.lineWidth=1.5;ctx.stroke()})
      // vertex glows
      const tp=proj(tf[0].x,tf[0].y,tf[0].z),bp=proj(tf[5].x,tf[5].y,tf[5].z)
      ;[{p:tp,c:'rgba(212,160,23,0.7)'},{p:bp,c:'rgba(0,212,255,0.7)'}].forEach(({p,c})=>{const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,25);g.addColorStop(0,c);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(p.x-25,p.y-25,50,50)})
      // machine dots
      const ml=[{vi:1,c:MC.genetic,l:'Тело'},{vi:2,c:MC.emotional,l:'Эмоции'},{vi:3,c:MC.language,l:'Ум'},{vi:4,c:MC.motivation,l:'Воля'}]
      ml.forEach(({vi,c,l})=>{const p=proj(tf[vi].x,tf[vi].y,tf[vi].z);const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,12);g.addColorStop(0,c);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,12,0,Math.PI*2);ctx.fill();if(showLabels){ctx.fillStyle=c;ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText(l,p.x,p.y+22)}})
      if(showLabels){ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillStyle=C.goldLight;ctx.fillText('Кристалл Веры',tp.x,tp.y-18);ctx.fillStyle=C.cyan;ctx.fillText('Кристалл Реализации',bp.x,bp.y+24)}
      animRef.current=requestAnimationFrame(draw)
    }
    draw()

    const onS=e=>{drag.current=true;const p=e.touches?e.touches[0]:e;last.current={x:p.clientX,y:p.clientY}}
    const onM=e=>{if(!drag.current)return;const p=e.touches?e.touches[0]:e;angle.current.y+=(p.clientX-last.current.x)*0.01;angle.current.x+=(p.clientY-last.current.y)*0.01;last.current={x:p.clientX,y:p.clientY}}
    const onE=()=>{drag.current=false}
    const onClick=e=>{if(onTapFace){const rect=cv.getBoundingClientRect();const cx=(e.clientX-rect.left)/rect.width*W;const cy=(e.clientY-rect.top)/rect.height*H;const ml2=[{vi:1,n:'genetic'},{vi:2,n:'emotional'},{vi:3,n:'language'},{vi:4,n:'motivation'}];for(const m of ml2){const p=proj(tf[m.vi].x,tf[m.vi].y,tf[m.vi].z);if(Math.hypot(cx-p.x,cy-p.y)<30){onTapFace(m.n);return}}}}

    cv.addEventListener('mousedown',onS);cv.addEventListener('mousemove',onM);cv.addEventListener('mouseup',onE)
    cv.addEventListener('touchstart',onS,{passive:true});cv.addEventListener('touchmove',onM,{passive:true});cv.addEventListener('touchend',onE)
    if(onTapFace)cv.addEventListener('click',onClick)
    return()=>{cancelAnimationFrame(animRef.current);cv.removeEventListener('mousedown',onS);cv.removeEventListener('mousemove',onM);cv.removeEventListener('mouseup',onE);cv.removeEventListener('touchstart',onS);cv.removeEventListener('touchmove',onM);cv.removeEventListener('touchend',onE);if(onTapFace)cv.removeEventListener('click',onClick)}
  },[autoSpin,size,height,showLabels,onTapFace])

  return <canvas ref={canvasRef} style={{width:size,height,touchAction:'none',cursor:'grab'}}/>
}
