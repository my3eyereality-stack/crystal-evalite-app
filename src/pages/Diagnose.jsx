import { useState } from 'react'
import { C, MC } from '../theme.js'
import { tgHaptic } from '../tg.js'

const QS = [
  {machine:'genetic',q:'Как часто двигаешься и высыпаешься?',opts:['Регулярно','Бывает по-разному','Редко','Почти никогда']},
  {machine:'emotional',q:'Умеешь управлять эмоциями и играть?',opts:['Легко','Чаще да','Сложно','Постоянно штормит']},
  {machine:'language',q:'Есть мечта и творческая реализация?',opts:['Горю идеей','Что-то есть','Пока ищу','Пусто']},
  {machine:'motivation',q:'Доверяешь процессу и действуешь?',opts:['Полностью','В целом да','Сомневаюсь','Стою на месте']},
]

const NAMES = {genetic:'Тело',emotional:'Эмоции',language:'Ум',motivation:'Воля'}

export default function Diagnose({onNav}) {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({})

  const done = step >= QS.length
  const q = QS[step]

  const answer = (idx) => {
    const val = [90,65,40,20][idx]
    setScores(p => ({...p, [q.machine]: val}))
    tgHaptic()?.impactOccurred?.('light')
    setTimeout(() => setStep(s=>s+1), 200)
  }

  if (!done) {
    return (
      <div style={{padding:'40px 20px 100px',minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <span style={{fontSize:11,letterSpacing:3,color:C.gold,textTransform:'uppercase'}}>диагностика кристалла</span>
          <div style={{display:'flex',justifyContent:'center',gap:6,marginTop:12}}>
            {QS.map((_,i)=><div key={i} style={{width:i===step?24:8,height:4,borderRadius:2,background:i<step?C.cyan:i===step?C.gold:'rgba(255,255,255,0.1)',transition:'all 0.3s'}}/>)}
          </div>
        </div>

        <div style={{marginBottom:8}}>
          <div style={{width:10,height:10,borderRadius:'50%',background:MC[q.machine],boxShadow:`0 0 10px ${MC[q.machine]}`,margin:'0 auto 12px'}}/>
          <h2 style={{fontSize:20,fontWeight:700,color:C.white,textAlign:'center',margin:'0 0 8px'}}>{NAMES[q.machine]}</h2>
          <p style={{fontSize:16,color:C.grayLight,textAlign:'center',lineHeight:1.5,margin:0}}>{q.q}</p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:24}}>
          {q.opts.map((o,i)=>(
            <button key={i} onClick={()=>answer(i)} style={{
              padding:'16px',background:C.bgCard,border:'1px solid rgba(255,255,255,0.06)',
              borderRadius:12,cursor:'pointer',color:C.white,fontSize:15,textAlign:'left',
              transition:'border-color 0.2s',
            }}
            onMouseOver={e=>e.target.style.borderColor=MC[q.machine]+'60'}
            onMouseOut={e=>e.target.style.borderColor='rgba(255,255,255,0.06)'}
            >{o}</button>
          ))}
        </div>
      </div>
    )
  }

  // Results
  const entries = Object.entries(scores)
  const weakest = entries.reduce((a,b)=>a[1]<b[1]?a:b)
  const avg = Math.round(entries.reduce((s,e)=>s+e[1],0)/entries.length)

  return (
    <div style={{padding:'30px 20px 100px',minHeight:'100vh'}}>
      <div style={{textAlign:'center',marginBottom:24}}>
        <span style={{fontSize:11,letterSpacing:3,color:C.gold,textTransform:'uppercase'}}>карта кристалла</span>
        <h2 style={{fontSize:22,fontWeight:700,color:C.white,margin:'8px 0 4px'}}>Устойчивость: {avg}%</h2>
        <p style={{fontSize:13,color:C.gray}}>Диагностика четырёх машин</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:24}}>
        {entries.map(([k,v])=>(
          <div key={k} style={{background:C.bgCard,borderRadius:14,padding:'14px',border:`1px solid ${k===weakest[0]?MC[k]+'50':'rgba(255,255,255,0.06)'}`}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
              <span style={{fontSize:14,fontWeight:600,color:C.white}}>{NAMES[k]}</span>
              <span style={{fontSize:12,fontWeight:700,color:MC[k]}}>{v}%</span>
            </div>
            <div style={{height:4,background:'rgba(255,255,255,0.06)',borderRadius:2}}>
              <div style={{height:'100%',width:`${v}%`,borderRadius:2,background:`linear-gradient(to right,${MC[k]},${MC[k]}80)`,boxShadow:`0 0 8px ${MC[k]}40`,transition:'width 0.8s ease'}}/>
            </div>
            {k===weakest[0] && <span style={{fontSize:10,color:MC[k],marginTop:6,display:'block'}}>← узкое место</span>}
          </div>
        ))}
      </div>

      <div style={{background:C.bgCard,borderRadius:14,padding:'16px',border:`1px solid ${MC[weakest[0]]}25`,marginBottom:16}}>
        <p style={{fontSize:14,color:C.grayLight,lineHeight:1.6,margin:0}}>
          Обращаю внимание: слабое звено — <span style={{color:MC[weakest[0]],fontWeight:600}}>{NAMES[weakest[0]]}</span>.
          Когда одна машина барахлит — весь кристалл перекашивает. Предлагаю начать с прокачки именно этой машины )
        </p>
      </div>

      <button onClick={()=>onNav('learn')} style={{
        width:'100%',padding:'16px',background:`linear-gradient(135deg,${MC[weakest[0]]},${C.purple})`,
        border:'none',borderRadius:12,cursor:'pointer',color:C.white,fontSize:15,fontWeight:600,
        boxShadow:`0 0 24px ${MC[weakest[0]]}30`,
      }}>Перейти к обучению →</button>

      <button onClick={()=>onNav('chat')} style={{
        width:'100%',padding:'14px',marginTop:10,background:'rgba(255,255,255,0.06)',
        border:`1px solid ${C.cyan}25`,borderRadius:12,cursor:'pointer',color:C.cyan,fontSize:14,
      }}>Обсудить с Хроносом</button>
    </div>
  )
}
