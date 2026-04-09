import { useState } from 'react'
import { C, MC } from '../theme.js'
import Crystal3D from '../components/Crystal3D.jsx'

const INFO = {
  genetic: {name:'ÐÐµÐ½ÐµÑÐ¸ÑÐµÑÐºÐ°Ñ Ð¼Ð°ÑÐ¸Ð½Ð°',color:MC.genetic,icon:'Ð¢ÐµÐ»Ð¾',keys:['ÐÑÑÐ°Ð½Ð¸Ðµ','ÐÐ²Ð¸Ð¶ÐµÐ½Ð¸Ðµ'],
    desc:'Ð¡Ð°Ð¼Ð¾Ð²Ð¾ÑÐ¿ÑÐ¾Ð¸Ð·Ð²ÐµÐ´ÐµÐ½Ð¸Ðµ, Ð¾ÑÑÑÐµÐ½Ð¸Ñ, ÑÐ¼Ð¿Ð¸ÑÐ¸ÑÐµÑÐºÐ¸Ð¹ Ð¾Ð¿ÑÑ. Ð¤ÑÐ½Ð´Ð°Ð¼ÐµÐ½Ñ â ÑÐ¸Ð·Ð¸ÑÐµÑÐºÐ¾Ðµ ÑÐµÐ»Ð¾ ÐºÐ°ÐºÐ¾ Ð¸Ð½ÑÑÑÑÐ¼ÐµÐ½Ñ Ð¿ÑÐ¾Ð¶Ð¸Ð²Ð°Ð½Ð¸Ñ Ð¶Ð¸Ð·Ð½Ð¸'},
  emotional: {name:'Ð­Ð¼Ð¾ÑÐ¸Ð¾Ð½Ð°Ð»ÑÐ½Ð°Ñ Ð¼Ð°ÑÐ¸Ð½Ð°',color:MC.emotional,icon:'Ð­Ð¼Ð¾ÑÐ¸Ð¸',keys:['áÐÑÐ¸ÑÐ¸ÑÐµÑÐºÐ°Ñ ÑÐ½ÐµÑÐ³Ð¸Ñ','ÐÐ³ÑÐ°'],
    desc:'Ð¢ÑÐ°Ð½ÑÑÐ¾ÑÐ¼Ð°ÑÐ¸Ñ ÑÐ¸Ð¼Ð¸ÑÐµÑÐºÐ¾Ð¹ ÑÐ½ÐµÑÐ³Ð¸Ð¸ Ð² ÑÐ»ÐµÐºÑÑÐ¾Ð¼Ð°Ð³Ð½Ð¸ÑÐ½ÑÑ. ÐÐ¿Ð¾ÑÐ¾Ð±Ð½Ð¾ÑÑÑ ÑÑÐ²ÑÑÐ²Ð¾Ð²Ð°ÑÑ, Ð¿ÐµÑÐµÐ¶Ð¸Ð²Ð°ÑÑ, Ð¸Ð³ÑÐ°ÑÑ.'},
  language: {name:'Ð¯Ð·ÑÐºÐ¾Ð²Ð°Ñ Ð¼Ð°ÑÐ¸Ð½Ð°',color:MC.language,icon:'Ð£Ð¼',keys:['ÐÐµÑÑÐ°','Ð¢Ð²Ð¾ÑÑÐµÑÑÐ²Ð¾'],
    desc:'Ð¡ÑÐ¸ÑÑÐ²Ð°Ð½Ð¸Ðµ Ð¸ Ð·Ð°Ð¿Ð¸ÑÑ Ð² Ð½Ð¾Ð¾ÑÑÐµÑÑ. Ð Ð°Ð·Ð»Ð¸ÑÐµÐ½Ð¸Ðµ Ñ/Ð½Ð´-Ñ. Ð¡Ð¿Ð¾ÑÐ¾Ð±Ð½Ð¾ÑÑÑ Ð¼ÑÑÐ»Ð¸ÑÑ, Ð°Ð½Ð°Ð»Ð¸Ð·Ð¸ÑÐ¾Ð²Ð°ÑÑ, ÑÐ²Ð¾ÑÐ¸ÑÑ.'},
  motivation: {name:'ÐÐ¾ÑÐ¸Ð²Ð°ÑÐ¸Ð¾Ð½Ð½Ð°Ñ Ð¼Ð°ÑÐ¸Ð½Ð°',color:MC.motivation,icon:'ÐÐ¾Ð»Ñ',keys:['ÐÐ¾Ð»Ð¸ÑÐ²Ð°','Ð¡Ð»ÑÐ¶ÐµÐ½Ð¸Ðµ'],
    desc:'Ð£Ð´ÐµÑÐ¶Ð°Ð½Ð¸Ðµ ÑÐµÐ°Ð»ÑÐ½Ð¾ÑÑÐ¸, Ð¿ÑÐ¸Ð½ÑÑÐ¸Ðµ Ð±Ð»Ð°Ð³Ð¾Ð´Ð°ÑÐ¸. ÐÐ¿Ð¾ÑÐ¾Ð±Ð½Ð¾ÑÑÑ ÑÐ´ÐµÑÐ¶Ð¸Ð²Ð°ÑÑ Ð½Ð°Ð¼ÐµÑÐµÐ½Ð¸Ðµ Ð¸ Ð´ÐµÐ¹ÑÑÐ²Ð¾Ð²Ð°ÑÑ.'},
}

export default function CrystalFull({onBack}) {
  const [sel, setSel] = useState(null)
  const info = sel ? INFO[sel] : null

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',background:C.bg}}>
      <div style={{padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={onBack} style={{background:'none',border:'none',color:C.cyan,fontSize:14,cursor:'pointer'}}>â ÐÐ°Ð·Ð°Ð´</button>
        <span style={{fontSize:12,color:C.gray}}>Ð¢Ð°Ð¿Ð½Ð¸ Ð¿Ð¾ Ð³ÑÐ°Ð½ÑÐ¼ ÐºÑÐ¸ÑÑÐ°Ð»Ð»Ð°Ð¼</span>
      </div>

      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Crystal3D size={340} height={420} autoSpin={!sel} showLabels={true} onTapFace={(id)=>setSel(sel===id?null:id)}/>
      </div>

      {info && (
        <div style={{
          padding:'20px',margin:'0 16px 24px',background:C.bgCard,borderRadius:16,
          border:`1px solid ${info.color}30`,
          animation:'slideUp 0.2s ease-out',
        }}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
            <div style={{width:10,height:10,borderRadius:'50%',background:info.color,boxShadow:`0 0 10px ${info.color}`}}/>
            <h3 style={{fontSize:16,fontWeight:700,color:C.white,margin:0}}>{info.name}</h3>
          </div>
          <p style={{fontSize:13,color:C.grayLight,lineHeight:1.6,margin:'0 0 12px'}}>{info.desc}</p>
          <div style={{display:'flex',gap:8}}>
            {info.keys.map(k=>(
              <span key={k} style={{fontSize:11,color:info.color,padding:'4px 10px',borderRadius:8,background:`${info.color}12`,border:`1px solid ${info.color}20`}}>
                {k}
              </span>
            ))}
          </div>
        </div>
      )}

      {!info && (
        <div style={{padding:'0 16px 24px',display:'flex',justifyContent:'center',gap:8}}>
          {Object.entries(MC).map(([k,c])=>(
            <div key={k} style={{width:8,height:8,borderRadius0'50%',background:c,boxShadow:`0 0 6px ${c}`}}/>
          ))}
        </div>
      )}

      <style>{`@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  )
}
