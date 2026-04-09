import { useState } from 'react'
import { C, MC } from '../theme.js'
import { tgUser } from '../tg.js'

const MACHINES = [
  {id:'genetic',name:'Тело',color:MC.genetic,level:65,keys:['Дыхание','Движение']},
  {id:'emotional',name:'Эмоции',color:MC.emotional,level:45,keys:['Психическая энергия','Игра']},
  {id:'language',name:'Ум',color:MC.language,level:70,keys:['Мечта','Творчество']},
  {id:'motivation',name:'Воля',color:MC.motivation,level:55,keys:['Молитва','Служение']},
]
const STRATS = [
  {n:'Личные границы',a:'Управление',o:'inner'},
  {n:'Агрессия расширения',a:'Управление',o:'social'},
  {n:'Достижение целей',a:'Расширение',o:'social'},
  {n:'Внутренний свет',a:'Расширение',o:'inner'},
  {n:'Свобода самовыражения',a:'Исследование',o:'social'},
  {n:'Внутренние трансформации',a:'Исследование',o:'inner'},
  {n:'Социальная гармония',a:'Счастье',o:'social'},
  {n:'Доверие мирозданию',a:'Счастье',o:'inner'},
]

export default function Profile() {
  const [sel, setSel] = useState(null)
  const name = tgUser()?.first_name || 'Игрок'
  return (
    <div style={{padding:'20px 16px 100px'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:22}}>
        <div style={{width:50,height:50,borderRadius:'50%',background:`linear-gradient(135deg,${C.cyan}40,${C.purple}40)`,border:`2px solid ${C.cyan}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,color:C.cyan}}>◇</div>
        <div><div style={{fontSize:17,fontWeight:700,color:C.white}}>{name}</div><div style={{fontSize:11,color:C.cyan,marginTop:2}}>Уровень: Исследователь</div></div>
      </div>
      <h3 style={{fontSize:12,fontWeight:600,color:C.gold,letterSpacing:2,textTransform:'uppercase',margin:'0 0 10px'}}>4 Машины</h3>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:20}}>
        {MACHINES.map(m=>(
          <button key={m.id} onClick={()=>setSel(sel===m.id?null:m.id)} style={{background:sel===m.id?`${m.color}15`:C.bgCard,border:`1px solid ${sel===m.id?m.color+'40':'rgba(255,255,255,0.06)'}`,borderRadius:12,padding:12,cursor:'pointer',textAlign:'left'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}><span style={{fontSize:13,fontWeight:600,color:C.white}}>{m.name}</span><span style={{fontSize:11,fontWeight:700,color:m.color}}>{m.level}%</span></div>
            <div style={{height:3,background:'rgba(255,255,255,0.06)',borderRadius:2}}><div style={{height:'100%',width:`${m.level}%`,borderRadius:2,background:`linear-gradient(to right,${m.color},${m.color}80)`,boxShadow:`0 0 8px ${m.color}40`}}/></div>
            {sel===m.id&&<div style={{marginTop:8,display:'flex',flexDirection:'column',gap:3}}>{m.keys.map(k=><span key={k} style={{fontSize:10,color:C.grayLight}}>◈ {k}</span>)}</div>}
          </button>
        ))}
      </div>
      <h3 style={{fontSize:12,fontWeight:600,color:C.gold,letterSpacing:2,textTransform:'uppercase',margin:'0 0 10px'}}>8 Стратегий</h3>
      <div style={{display:'flex',flexDirection:'column',gap:5}}>
        {STRATS.map((s,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',background:C.bgCard,borderRadius:8}}>
            <div><span style={{fontSize:12,color:C.white}}>{s.n}</span><span style={{fontSize:9,color:C.gray,marginLeft:6}}>{s.a}</span></div>
            <span style={{fontSize:9,color:s.o==='social'?C.cyan:C.purpleLight,padding:'2px 6px',borderRadius:3,background:s.o==='social'?`${C.cyan}12`:`${C.purpleLight}12`}}>{s.o==='social'?'Социум':'Внутренний мир'}</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:16,padding:14,textAlign:'center',background:C.bgCard,borderRadius:12,border:`1px solid ${C.gold}15`}}>
        <span style={{fontSize:32,color:`${C.gold}30`,lineHeight:1}}>"</span>
        <p style={{fontSize:12,color:C.grayLight,margin:'2px 0 6px',lineHeight:1.5,fontStyle:'italic'}}>Все палки рождаются ветками. Маленькие спонтанные радости — неотъемлемый фактор качества жизни.</p>
        <span style={{fontSize:10,color:C.gold}}>— Владислав Колмыков</span>
      </div>
    </div>
  )
}
