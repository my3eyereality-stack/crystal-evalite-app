import { useRef } from 'react'
import { C } from '../theme.js'
export default function Particles() {
  const ps = useRef(Array.from({length:20},(_,i)=>({
    i,x:Math.random()*100,y:Math.random()*100,
    sz:Math.random()*2+0.5,op:Math.random()*0.3+0.1,
    d:Math.random()*8+6,dl:Math.random()*-10,
  }))).current
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}>
      {ps.map(p=><div key={p.i} style={{
        position:'absolute',left:`${p.x}%`,top:`${p.y}%`,width:p.sz,height:p.sz,
        borderRadius:'50%',opacity:p.op,
        background:p.i%3===0?C.cyan:p.i%3===1?C.gold:C.purpleLight,
        animation:`fp ${p.d}s ease-in-out ${p.dl}s infinite`,
      }}/>)}
      <style>{`@keyframes fp{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px) translateX(5px)}}`}</style>
    </div>
  )
}
