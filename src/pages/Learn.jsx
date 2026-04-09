import { useState } from 'react'
import { C, MC } from '../theme.js'

const COURSES = [
  {id:1,st:'Хит',stC:C.gold,title:'Кристалы. Основы',sub:'4 машины, 8 ключей, ось вращения',price:'Бесплатно',prC:C.green,lessons:12,dur:'3 часа',
    desc:'Вводный курс в Систему Кристалла EVALITE. Разбираем структуру, четыре машины, базовые аспекты и ось вращения.',
    mods:['Что такое кристалл','Генетическая машина — Тело','Эмоциональная машина','Языковая машина — Ум','Мотивационная машина — Воля','Кристалл Веры и Реализации']},
  {id:2,st:'Новый',stC:C.cyan,title:'8 Стратегий Игрока',sub:'Управление, Расширение, Исследование, Счастье',price:'4 990 ₽',prC:C.white,lessons:24,dur:'8 часов',
    desc:'Глубокое погружение в каждую из 8 стратегий с практическими инструментами.',
    mods:['Личные границы','Агрессия расширения','Достижение целей','Внутренный свет','Свобода самовыражения','Внутренние трансформации','Социальная гармония','Доверие мирозданию']},
  {id:3,st:'Скоро',stC:C.purpleLight,title:'Качество жизни. Мастер',sub:'Персональная программа трансформации',price:'14 990 ₽',prC:C.white,lessons:48,dur:'3 месяца',
    desc:'Мастерская программа с диагностикой, планом прокачки, разборами и сообществом Игроков.',
    mods:['Полная диагностика кристалла','Персональный план по машинам','Работа с 8 ключами','Еженедельные разборы','Закрытое сообщество','Доступ к ХРОНОС']},
]

export default function Learn() {
  const [exp, setExp] = useState(null)
  return (
    <div style={{padding:'20px 16px 100px'}}>
      <h2 style={{fontSize:22,fontWeight:700,color:C.white,margin:'0 0 4px'}}>Обучение</h2>
      <p style={{fontSize:13,color:C.gray,margin:'0 0 16px'}}>Путь от понимания к управлению кристаллом</p>
      <div style={{display:'flex',justifyContent:'space-between',background:C.bgCard,borderRadius:10,padding:'10px 12px',marginBottom:16,border:'1px solid rgba(255,255,255,0.06)'}}>
        {[{c:MC.genetic,l:'Тело'},{c:MC.emotional,l:'Эмоции'},{c:MC.language,l:'Ум'},{c:MC.motivation,l:'Воля'}].map(m=>
          <div key={m.l} style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:7,height:7,borderRadius:'50%',background:m.c,boxShadow:`0 0 5px ${m.c}`}}/><span style={{fontSize:10,color:C.grayLight}}>{m.l}</span></div>
        )}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {COURSES.map(c=>(
          <div key={c.id} style={{background:C.bgCard,borderRadius:14,border:`1px solid ${c.stC}18`,overflow:'hidden'}}>
            <div style={{padding:'14px 16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <span style={{fontSize:9,letterSpacing:2,color:c.stC,textTransform:'uppercase',fontWeight:600,padding:'2px 7px',borderRadius:4,background:`${c.stC}15`}}>{c.st}</span>
                <span style={{fontSize:13,color:c.prC,fontWeight:700}}>{c.price}</span>
              </div>
              <h3 style={{fontSize:15,fontWeight:700,color:C.white,margin:'0 0 3px'}}>{c.title}</h3>
              <p style={{fontSize:11,color:C.gray,margin:'0 0 10px'}}>{c.sub}</p>
              <div style={{display:'flex',gap:14}}><span style={{fontSize:10,color:C.grayLight}}>◈ {c.lessons} уроков</span><span style={{fontSize:10,color:C.grayLight}}>◷ {c.dur}</span></div>
              <button onClick={()=>setExp(exp===c.id?null:c.id)} style={{marginTop:10,background:'none',border:'none',cursor:'pointer',color:C.cyan,fontSize:11,padding:0}}>{exp===c.id?'Свернуть ▲':'Подробнее ▼'}</button>
            </div>
            {exp===c.id&&<div style={{padding:'0 16px 14px',borderTop:'1px solid rgba(255,255,255,0.05)'}}>
              <p style={{fontSize:12,color:C.grayLight,lineHeight:1.5,margin:'12px 0'}}>{c.desc}</p>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {c.mods.map((m,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:9,color:C.cyan,fontWeight:700,minWidth:18,textAlign:'right'}}>{String(i+1).padStart(2,'0')}</span><span style={{fontSize:11,color:C.grayLight}}>{m}</span></div>)}
              </div>
              <button style={{marginTop:14,width:'100%',padding:'12px',background:c.st==='Скоро'?'rgba(255,255,255,0.06)':`linear-gradient(135deg,${c.stC},${C.purple})`,border:'none',borderRadius:10,cursor:'pointer',color:C.white,fontSize:13,fontWeight:600,opacity:c.st==='Скоро'?0.6:1}}>
                {c.st==='Скоро'?'Скоро будет доступно':c.price==='Бесплатно'?'Начать бесплатно':'Записаться на курс'}
              </button>
            </div>}
          </div>
        ))}
      </div>
    </div>
  )
}
