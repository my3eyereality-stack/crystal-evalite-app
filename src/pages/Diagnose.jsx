import { useState } from 'react'
import { C, MC } from '../theme.js'
import { tgHaptic } from '../tg.js'

const QS = [
  {machine:'genetic', q:'How often do you move / exercise physically?', opts:['Almost never','1-2 times/week','3-5 times/week','Every day']},
  {machine:'genetic', q:'How do you feel in the morning when you wake up?', opts:['Exhausted','Normal','Alert','Energised']},
  {machine:'emotional', q:'How easily do you get upset by criticism?', opts:['Very easily','Often','Rarely','Almost never']},
  {machine:'emotional', q:'How long does it take you to recover from stress?', opts:['Several days','A day','A few hours','Less than an hour']},
  {machine:'language', q:'How often do you read books or articles?', opts:['Almost never','Sometimes','Regularly','Every day']},
  {machine:'language', q:'How easily do you express your thoughts in words?', opts:['With difficulty','Sometimes hard','Usually easy','Always easy']},
  {machine:'motivation', q:'Do you have clear goals for the next 3 months?', opts:['No goals','Vague ideas','Clear goals','Written plan']},
  {machine:'motivation', q:'How often do you complete what you start?', opts:['Rarely','Sometimes','Often','Almost always']},
]

const MACHINES = ['genetic','emotional','language','motivation']
const LABELS = {genetic:'Genetic',emotional:'Emotional',language:'Language',motivation:'Motivation'}

export default function Diagnose() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

  const done = step >= QS.length

  function choose(idx) {
    tgHaptic('light')
    const next = [...answers, idx]
    setAnswers(next)
    setStep(step + 1)
  }

  function getScore(machine) {
    const qs = QS.map((q,i) => ({...q,i})).filter(q => q.machine === machine)
    if (!qs.length) return 0
    const sum = qs.reduce((a, q) => a + (answers[q.i] !== undefined ? answers[q.i] : 0), 0)
    const max = qs.length * 3
    return Math.round((sum / max) * 100)
  }

  if (done) {
    return (
      <div style={{flex:1,overflowY:'auto',padding:'24px 20px'}}>
        <p style={{color:C.accent,fontSize:12,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>DIAGNOSIS COMPLETE</p>
        <h2 style={{color:C.text,fontSize:22,fontWeight:700,marginBottom:24}}>Your Crystal Profile</h2>
        {MACHINES.map(k => {
          const v = getScore(k)
          const col = MC[k]
          return (
            <div key={k} style={{marginBottom:20}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span style={{color:C.textSecondary,fontSize:13}}>{LABELS[k]}</span>
                <span style={{color:col,fontSize:13,fontWeight:700}}>{v}%</span>
              </div>
              <div style={{height:4,background:'rgba(255,255,255,0.06)',borderRadius:2}}>
                <div style={{height:'100%',width:v+'%',borderRadius:2,background:'linear-gradient(to right,'+col+','+col+'80)'}} />
              </div>
            </div>
          )
        })}
        <button
          onClick={() => { setStep(0); setAnswers([]) }}
          style={{marginTop:24,width:'100%',padding:'14px',background:C.surface,border:'1px solid '+C.border,borderRadius:12,color:C.text,fontSize:15,cursor:'pointer'}}
        >
          Restart
        </button>
      </div>
    )
  }

  const q = QS[step]
  const progress = step / QS.length

  return (
    <div style={{flex:1,overflowY:'auto',padding:'24px 20px'}}>
      <p style={{color:C.accent,fontSize:12,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>
        {LABELS[q.machine]} machine
      </p>
      <div style={{height:2,background:'rgba(255,255,255,0.06)',borderRadius:1,marginBottom:24}}>
        <div style={{height:'100%',width:(progress*100)+'%',borderRadius:1,background:C.accent,transition:'width 0.3s'}} />
      </div>
      <h3 style={{color:C.text,fontSize:18,fontWeight:600,marginBottom:32,lineHeight:1.4}}>{q.q}</h3>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {q.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => choose(i)}
            style={{padding:'16px',background:C.surface,border:'1px solid '+C.border,borderRadius:12,color:C.text,fontSize:15,textAlign:'left',cursor:'pointer'}}
          >
            {opt}
          </button>
        ))}
      </div>
      <p style={{color:C.textSecondary,fontSize:12,marginTop:24,textAlign:'center'}}>{step+1} / {QS.length}</p>
    </div>
  )
}
