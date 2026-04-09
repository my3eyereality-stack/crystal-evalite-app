import { useState } from 'react'
import { C, MC } from '../theme.js'
import Crystal3D from '../components/Crystal3D.jsx'

const INFO = {
  genetic: {name:'Генетическая машина',color:MC.genetic,icon:'Тело',keys:['Дыхание','Движение'],
    desc:'Самовоспроизведение, ощущения, эмпирический опыт. Фундамент — физическое тело как инструмент проживания жизни.'},
  emotional: {name:'Эмоциональная машина',color:MC.emotional,icon:'Эмоции',keys:['Психическая энергия','Игра'],
    desc:'Трансформация химической энергии в электромагнитную. Способность чувствовать, переживать, играть.'},
  language: {name:'Языковая машина',color:MC.language,icon:'Ум',keys:['Мечта','Творчество'],
    desc:'Считывание и запись в ноосферу. Различение Я/не-Я. Способность мыслить, анализировать, творить.'},
  motivation: {name:'Мотивационная машина',color:MC.motivation,icon:'Воля',keys:['Молитва','Служение'],
    desc:'Удержание реальности, принятие благодати. Способность удерживать намерение и действовать.'},
}

export default function CrystalFull({onBack}) {
  const [sel, setSel] = useState(null)
  const info = sel ? INFO[sel] : null

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',background:C.bg}}>
      <div style={{padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={onBack} style={{background:'none',border:'none',color:C.cyan,fontSize:14,cursor:'pointer'}}>← Назад</button>
        <span style={{fontSize:12,color:C.gray}}>Тапни по грани кристалла</span>
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
            <div key={k} style={{width:8,height:8,borderRadius:'50%',background:c,boxShadow:`0 0 6px ${c}`}}/>
          ))}
        </div>
      )}

      <style>{`@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  )
}
