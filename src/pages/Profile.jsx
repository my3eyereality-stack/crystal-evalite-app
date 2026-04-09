import { useState } from 'react'
import { C, MC } from '../theme.js'
import { tgUser } from '../tg.js'

const MACHINES = [
  {id:'genetic',name:'Ð¢ÐµÐ»Ð¾',color:MC.genetic,level:65,keys:['ÐÑÑÐ°Ð½Ð¸Ðµ','ÐÐ²Ð¸Ð¶ÐµÐ½Ð¸Ðµ']},
  {id:'emotional',name:'Ð­Ð¼Ð¾ÑÐ¸Ð¸',color:MC.emotional,level:45,keys:['ÐÑÐ¸ÑÐ¸ÑÐµÑÐºÐ°Ñ ÑÐ½ÐµÑÐ³Ð¸Ñ','ÐÐ³ÑÐ°']},
  {id:'language',name:'Ð£Ð¼',color:MC.language,level:70,keys:['ÐÐµÑÑÐ°','Ð¢Ð²Ð¾ÑÑÐµÑÑÐ²Ð¾']},
  {id:'motivation',name:'ÐÐ¾Ð»Ñ',color:MC.motivation,level:55,keys:['ÐÐ¾Ð»Ð¸ÑÐ²Ð°','Ð¡Ð»ÑÐ¶ÐµÐ½Ð¸Ðµ']},
]
const STRATS = [
  {n:'ÐÐ¸ÑÐ½ÑÐµ Ð³ÑÐ°Ð½Ð¸ÑÑ',a:'Ð£Ð¿ÑÐ°Ð²Ð»ÐµÐ½Ð¸Ðµ',o:'inner'},
  {n:'ÐÐ³ÑÐµÑÑÐ¸Ñ ÑÐ°ÑÑÐ¸ÑÐµÐ½Ð¸Ñ',a:'Ð£Ð¿ÑÐ°Ð²Ð»ÐµÐ½Ð¸Ðµ',o:'social'},
  {n:'ÐÐ¾ÑÑÐ¸Ð¶ÐµÐ½Ð¸Ðµ ÑÐµÐ»ÐµÐ¹',a:'Ð Ð°ÑÑÐ¸ÑÐµÐ½Ð¸Ðµ',o:'social'},
  {n:'ÐÐ½ÑÑÑÐµÐ½Ð½Ð¸Ð¹ ÑÐ²ÐµÑ',a:'Ð Ð°ÑÑÐ¸ÑÐµÐ½Ð¸Ðµ',o:'inner'},
  {n:'Ð¡Ð²Ð¾Ð±Ð¾Ð´Ð° ÑÐ°Ð¼Ð¾Ð²ÑÑÐ°Ð¶ÐµÐ½Ð¸Ñ',a:'ÐÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ',o:'social'},
  {n:'ÐÐ½ÑÑÑÐµÐ½Ð½Ð¸Ðµ ÑÑÐ°Ð½ÑÑÐ¾ÑÐ¼Ð°ÑÐ¸Ð¸',a:'ÐÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ',o:'inner'},
  {n:'Ð¡Ð¾ÑÐ¸Ð°Ð»ÑÐ½Ð°Ñ Ð³Ð°ÑÐ¼Ð¾Ð½Ð¸Ñ',a:'Ð¡ÑÐ°ÑÑÑÐµ',o:'social'},
  {n:'ÐÐ¾Ð²ÐµÑÐ¸Ðµ Ð¼Ð¸ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ñ',a:'Ð¡ÑÐ°ÑÑÑÐµ',o:'inner'},
]

export default function Profile() {
  const [sel, setSel] = useState(null)
  const name = tgUser()?.first_name || 'ÐÐ³ÑÐ¾Ðº'
  return (
    <div style={{padding:'20px 16px 100px'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:22}}>
        <div style={{width:50,height:50,borderRadius:'50%',background:`linear-gradient(135deg,${C.cyan}40,${C.purple}40)`,border:`2px solid ${C.cyan}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,color:C.cyan}}>â</div>
        <div><div style={{fontSize:17,fontWeight:700,color:C.white}}>{name}</div><div style={{fontSize:11,color:C.cyan,marginTop:2}}>Ð£ÑÐ¾Ð²ÐµÐ½Ñ: ÐÑÑÐ»ÐµÐ´Ð¾Ð²Ð°ÑÐµÐ»Ñ</div></div>
      </div>
      <h3 style={{fontSize:12,fontWeight:600,color:C.gold,letterSpacing:2,textTransform:'uppercase',margin:'0 0 10px'}}>4 ÐÐ°ÑÐ¸Ð½Ñ</h3>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:20}}>
        {MACHINES.map(m=>(
          <button key={m.id} onClick={()=>setSel(sel===m.id?null:m.id)} style={{background:sel===m.id?`${m.color}15`:C.bgCard,border:`1px solid ${sel===m.id?m.color+'40':'rgba(255,255,255,0.06)'}`,borderRadius:12,padding:12,cursor:'pointer',textAlign:'left'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}><span style={{fontSize:13,fontWeight:600,color:C.white}}>{m.name}</span><span style={{fontSize:11,fontWeight:700,color:m.color}}>{m.level}%</span></div>
            <div style={{height:3,background:'rgba(255,255,255,0.06)',borderRadius:2}}><div style={{height:'100%',width:`${m.level}%`,borderRadius:2,background:`linear-gradient(to right,${m.color},${m.color}80)`,boxShadow:`0 0 8px ${m.color}40`}}/></div>
            {sel===m.id&&<div style={{marginTop:8,display:'flex',flexDirection:'column',gap:3}}>{m.keys.map(k=><span key={k} style={{fontSize:10,color:C.grayLight}}>â {k}</span>)}</div>}
          </button>
        ))}
      </div>
      <h3 style={{fontSize:12,fontWeight:600,color:C.gold,letterSpacing:2,textTransform:'uppercase',margin:'0 0 10px'}}>8 Ð¡ÑÑÐ°ÑÐµÐ³Ð¸Ð¹</h3>
      <div style={{display:'flex',flexDirection:'column',gap:5}}>
        {STRATS.map((s,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',background:C.bgCard,borderRadius:8}}>
            <div><span style={{fontSize:12,color:C.white}}>{s.n}</span><span style={{fontSize:9,color:C.gray,marginLeft:6}}>{s.a}</span></div>
            <span style={{fontSize:9,color:s.o==='social'?C.cyan:C.purpleLight,padding:'2px 6px',borderRadius:3,background:s.o==='social'?`${C.cyan}12`:`${C.purpleLight}12`}}>{s.o==='social'?'Ð¡Ð¾ÑÐ¸ÑÐ¼':'ÐÐ½ÑÑÑÐµÐ½Ð½Ð¸Ð¹ Ð¼Ð¸Ñ'}</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:16,padding:14,textAlign:'center',background:C.bgCard,borderRadius:12,border:`1px solid ${C.gold}15`}}>
        <span style={{fontSize:32,color:`${C.gold}30`,lineHeight:1}}>"</span>
        <p style={{fontSize:12,color:C.grayLight,margin:'2px 0 6px',lineHeight:1.5,fontStyle:'italic'}}>ÐÑÐµ Ð¿Ð°Ð»ÐºÐ¸ ÑÐ¾Ð¶Ð´Ð°ÑÑÑÑ Ð²ÐµÑÐºÐ°Ð¼Ð¸. ÐÐ°Ð»ÐµÐ½ÑÐºÐ¸Ðµ ÑÐ¿Ð¾Ð½ÑÐ°Ð½Ð½ÑÐµ ÑÐ°Ð´Ð¾ÑÑÐ¸ â Ð½ÐµÐ¾ÑÑÐµÐ¼Ð»ÐµÐ¼ÑÐ¹ ÑÐ°ÐºÑÐ¾Ñ ÐºÐ°ÑÐµÑÑÐ²Ð° Ð¶Ð¸Ð·Ð½Ð¸.</p>
        <span style={{fontSize:10,color:C.gold}}>â ÐÐ»Ð°Ð´Ð¸ÑÐ»Ð°Ð² ÐÐ¾Ð»Ð¼ÑÐºÐ¾Ð²</span>
      </div>
    </div>
  )
}
