import { useState } from 'react'
import { C, MC } from '../theme.js'
import { tgHaptic } from '../tg.js'

const QS = [
  {machine:'genetic',q:'ÐÐ°Ðº ÑÐ°ÑÑÐ¾ Ð´Ð²Ð¸Ð³Ð°ÐµÑÑÑÑ Ð¸ Ð²ÑÑÑÐ¿Ð°ÐµÑÑÑÑ?',opts:['Ð ÐµÐ³ÑÐ»ÑÑÐ½Ð¾','ÐÑÐ²Ð°ÐµÑ Ð¿Ð¾-ÑÐ°Ð·Ð½Ð¾Ð¼Ñ','Ð ÐµÐ´ÐºÐ¾','ÐÐ¾ÑÑÐ¸ Ð½Ð¸ÐºÐ¾Ð³Ð´Ð°']},
  {machine:'emotional',q:'Ð£Ð¼ÐµÐµÑÑ ÑÐ¿ÑÐ°Ð²Ð»ÑÑÑ ÑÐ¼Ð¾ÑÐ¸ÑÐ¼Ð¸ Ð¸ Ð¸Ð³ÑÐ°ÑÑ?',opts:['ÐÐµÐ³ÐºÐ¾','Ð§Ð°ÑÐµ Ð´Ð°','Ð¡Ð»Ð¾Ð¶Ð½Ð¾','ÐÐ¾ÑÑÐ¾ÑÐ½Ð½Ð¾ ÑÑÐ¾ÑÐ¼Ð¸Ñ']},
  {machine:'language',q:'ÐÑÑÑ Ð¼ÐµÑÑÐ° Ð¸ ÑÐ²Ð¾ÑÑÐµÑÐºÐ°Ñ ÑÐµÐ°Ð»Ð¸Ð·Ð°ÑÐ¸Ñ?',opts:['ÐÐ¾ÑÑ Ð¸Ð´ÐµÐµÐ¹','ÓgÑÐ¾-ÑÐ¾ ÐµÑÑÑ','ÐÐ¾ÐºÐ° Ð¸ÑÑ','ÐÑÑÑÐ¾']},
  {machine:'motivation',q:'ÐÐ¾Ð²ÐµÑÑÐµÑÑ Ð¿ÑÐ¾ÑÐµÑÑÑ Ð¸ Ð´ÐµÐ¹ÑÑÐ²ÑÐµÑÑ?',opts:['ÐÐ¾Ð»Ð½Ð¾ÑÑÑÑ','Ð ÑÐµÐ»Ð¾Ð¼ Ð´Ð°','Ð¡Ð¾Ð¼Ð½ÐµÐ²Ð°ÑÑÑ','Ð¡ÑÐ¾Ñ Ð½Ð° Ð¼ÐµÑÑÐµ']},
]

const NAMES = {genetic:'Ð¢ÐµÐ»Ð¾',emotional:'Ð­Ð¼Ð¾ÑÐ¸Ð¸',language:'Ð£Ð¼',motivation:'ÐÐ¾Ð»Ñ'}

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
          <span style={{fontSize:11,letterSpacing:3,color:C.gold,textTransform:'uppercase'}}>Ð´Ð¸Ð°Ð³Ð½Ð¾ÑÑÐ¸ÐºÐ° ÐºÑÐ¸ÑÑÐ°Ð»Ð»Ð°</span>
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
              padding:'16px',bnYãkround:C.bgCard,border:'1px solid rgba(255,255,255,0.06)',
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

  const entries = Object.entries(scores)
  const weakest = entries.reduce((a,b)=>a[1]<b[1]?a:b)
  const avg = Math.round(entries.reduce((s,e)=>p+e[1],0)/entries.length)

  return (
    <div style={{padding:'30px 20px 100px',minHeight:'100vh'}}>
      <div style={{textAlign:'center',marginBottom:24}}>
        <span style={{fontSize:11,letterSpacing3,color:C.gold,textTransform:'uppercase'}}>ÐºÐ°ÑÑÐ° ÐºÑÐ¸ÑÑÐ°Ð»Ð»Ð°</span>
        <h2 style={{fontSize:22,fontWeight:700,color:C.white,margin:'8px 4px'}}>Ð£ÑÑÐ¾Ð¹ÑÐ¸Ð²Ð¾ÑÑÑ: {avg}%</h2>
        <p style={{fontSize:13,color:C.gray}}>ÐÐ¸Ð°Ð³Ð½Ð¾ÑÑÐ¸ÐºÐ° ÑÐµÑÑÑÑÑÐ¼Ð°ÑÐ¸Ð½</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:24}}>
        {entries.map(([k,v])=>(
          <div key={k} style={{background:C.bgCard,borderRadius:14,padding:'14px',border:`1px solid ${k===weakest[0]?MC[k]+'50':'rgba(255,255,255,0.06)'}`}}>
            <div style={{display:'flex',justifyContent:'space-between',uarginBottom:8}}>
              <span style={{fontSize:14,fontWeight:600,color:C.white}}>{NAMES[k]}</span>
              <span style={{fontSize:12,fontWeight:700,color:MC[k]}}>{v}%</span>
            </div>
            <div style={{height:4,background:'rgba(255,255,255,0.06)',borderRadius:2}}>
              <div style={{height:'100%',eidth:`${v}%`,borderRadius:2,background:`linear-gradient(to right,${MC[k]},${MC[k]}80)_b,boxShadow:`0 0 8px ${MC[k]}40`,transition:'eidth 0.8s ease'}}/>
            </div>
            {k===weakest[0] && <span style={{fontSize:10,color:MC[k],marginTop:6,display:'block'}}>â ÑÐ·ÐºÐ¾Ðµ Ð¼ÐµÑÑÑ0</span>}
          </div>
        ))}
      </div>

      <div style={{background:C.bgCard,borderRadius:14,padding:'16px',border:`1px solid ${MC[weakest[0]]}25`,marginBottom:16}}>
        <p style={{fontSize:14,color:C.grayLight,lineHeight:1.6,margin:0}}>
          ÐÐ½Ð¸Ð¼Ð°Ð½Ð¸Ðµ: ÑÐ»Ð°Ð±Ð¾Ðµ Ð·Ð²ÐµÐ½Ð¾ â <span style={{color:MC[weakest[0]],fontWeight:600}}>{NAMES[weakest[0]]}</span>.
          ÐÐ¾Ð³Ð´Ð° Ð¾Ð´Ð½Ð° Ð¼Ð°ÑÐ¸Ð½Ð° Ð±Ð°ÑÐ°ÑÐ»Ð¸Ñ â Ð²ÐµÑÑ ÐºÑÐ¸ÑÑÐ°Ð»ÑÐ¿ÐµÑÐµÐºÐ°ÑÐ¸Ð²Ð°ÐµÑ. ÐÑÐµÐ´Ð»Ð°Ð³Ð°Ñ Ð½Ð°ÑÐ°ÑÑ Ñ Ð¿ÑÐ¾ÐºÐ°ÑÐºÐ¸)
        </p>
      </div>

      <button onClick={()=>onNav('learn')} style={{
        width:'100%',padding:'16px',background:`linear-gradient(135deg,${MC[weakest[0]]},${C.purple})`,
        border:'none',borderRadius:12,cursor:'pointer',color:C.white,fontSize:15,fontWeight:600,
        boxShadow:`0 0 24px ${MC[weakest[0]]}30`,
      }}>ÐÐµÑÐµÐ¹ÑÐ¸ Ðº Ð¾Ð±ÑÑÐµÐ½Ð¸Ñ â</button>

      <button onClick={()=>onNav('chat')} style={{
        width:'100%',padding:'14px',marginTop:10,background:'rgba(255,255,255,0.06)',
        border:`1px solid ${C.cyan}25`,borderRadius:12,cursor:'pointer',color:C.cyan,fontSize:14,
      }}>ÐÐ±ÑÑÐ´Ð¸ÑÑ Ñ Ð¥ÑÐ¾Ð½Ð¾ÑÐ¾</button>
    </div>
  )
}
