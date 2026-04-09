import { useState, useEffect, useRef, useCallback } from 'react'
import { C } from '../theme.js'

const SYS = `Ты — ХРОНОС, голос Системы Кристалла EVALITE Владислава Колмыкова. Отвечай на русском. Стиль: тёплый, прямой, живой.
Принципы: Жизнь — ИГРА. Человек — кристалл. 4 машины: Тело, Эмоции, Ум, Воля. 8 ключей: Дыхание, Движение, Психическая энергия, Игра, Мечта, Творчество, Молитва, Служение. Качество жизни (Y) перпендикулярно уровню (X). Эволюция — акт ВОЛИ.
Манера: обращайся "Игрок", "драгоценнейший". Используй "По-простому:" и "По моему разумению...". Смайлики ) уместны. КАПСЛОК для ключевых: ИГРА, КАЧЕСТВО ЖИЗНИ. Короткие ответы до 150 слов. Без повелительного наклонения — "предлагаю", "один из вариантов". Минимум местоимений.`

const FB = {
  'кристалл':'Кристалл — метафора и модель человека. Структура, вращающаяся между Высшими силами и Социумом.\n\nПрочнее структура — устойчивее вращение. Прочность зависит от четырёх машин: Тела, Эмоций, Ума и Воли.\n\nПо-простому: жизнь качает, вопрос — насколько упругая конструкция )',
  'машин':'4 машины — платформа кристалла:\n\n🔴 Генетическая (Тело) — ощущения\n🟡 Эмоциональная — трансформация энергии\n🔵 Языковая (Ум) — считывание ноосферы\n🟢 Мотивационная (Воля) — удержание реальности\n\nБарахлит одна — весь кристалл перекашивает )',
  'качеств':'Качество жизни и уровень — перпендикулярные оси.\n\nУровень (X) — деньги, статус. Качество (Y) — навык полноценно жить на ЛЮБОМ уровне.\n\nПо-простому: управление качеством — короткая дорога к управлению уровнем )',
  'игр':'ИГРА — фундаментальная метафора. Человек — Игрок. Цель не победить, а полноценно ИГРАТЬ.\n\nКогда принимаешь позицию Игрока — стыд за проигрыш уходит. Остаётся интерес к процессу )',
}
const fallback = t => { for(const[k,v]of Object.entries(FB)) if(t.includes(k))return v; return 'Хороший вопрос, Игрок )\n\nОбращаю внимание — в Системе Кристалла каждый вопрос имеет корневую структуру. Предлагаю копнуть глубже: в какой из машин сейчас напряжение? Тело, эмоции, ум или воля?' }

export default function Chat() {
  const [msgs, setMsgs] = useState([{role:'assistant',text:'Привет, драгоценнейший Игрок! )\n\nЗдесь можно поговорить о Системе Кристалла — о машинах, стратегиях, ключах управления.\n\nО чём хочется поговорить?'}])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const qqs = ['Что такое кристалл?','Расскажи про 4 машины','Как повысить качество жизни?','Что значит Игра?']

  useEffect(()=>{scrollRef.current?.scrollTo({top:scrollRef.current.scrollHeight,behavior:'smooth'})},[msgs])

  const send = useCallback(async(text)=>{
    if(!text.trim()||loading)return
    const um={role:'user',text:text.trim()}; setMsgs(p=>[...p,um]); setInput(''); setLoading(true)
    try {
      const h=[...msgs,um].map(m=>({role:m.role==='assistant'?'assistant':'user',content:m.text}))
      const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:600,system:SYS,messages:h})})
      if(!r.ok)throw new Error('api')
      const d=await r.json(); const reply=d.content?.map(b=>b.type==='text'?b.text:'').join('')||fallback(text.toLowerCase())
      setMsgs(p=>[...p,{role:'assistant',text:reply}])
    } catch{setMsgs(p=>[...p,{role:'assistant',text:fallback(text.toLowerCase())}])}
    finally{setLoading(false)}
  },[loading,msgs])

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh'}}>
      <div style={{padding:'14px 16px 10px',borderBottom:'1px solid rgba(0,212,255,0.1)',background:'rgba(3,3,17,0.95)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:38,height:38,borderRadius:'50%',background:`linear-gradient(135deg,${C.cyan}40,${C.purple}40)`,border:`2px solid ${C.cyan}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,color:C.cyan}}>◇</div>
          <div><div style={{fontSize:14,fontWeight:700,color:C.white}}>ХРОНОС</div><div style={{fontSize:10,color:C.cyan}}>Голос Системы Кристалла</div></div>
        </div>
      </div>
      <div ref={scrollRef} style={{flex:1,overflowY:'auto',padding:14,display:'flex',flexDirection:'column',gap:10}}>
        {msgs.map((m,i)=><div key={i} style={{alignSelf:m.role==='user'?'flex-end':'flex-start',maxWidth:'85%'}}>
          <div style={{padding:'11px 14px',background:m.role==='user'?`linear-gradient(135deg,${C.cyan}30,${C.purple}20)`:C.bgCard,borderRadius:m.role==='user'?'14px 14px 4px 14px':'14px 14px 14px 4px',border:`1px solid ${m.role==='user'?C.cyan+'20':'rgba(255,255,255,0.06)'}`}}>
            <p style={{fontSize:13,color:C.white,margin:0,lineHeight:1.6,whiteSpace:'pre-wrap'}}>{m.text}</p>
          </div>
        </div>)}
        {loading&&<div style={{alignSelf:'flex-start',padding:'11px 14px',background:C.bgCard,borderRadius:'14px 14px 14px 4px'}}><span style={{color:C.cyan,fontSize:13,animation:'pulse 1.2s ease-in-out infinite'}}>◇ ◇ ◇</span></div>}
        {msgs.length===1&&<div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:6}}>
          {qqs.map(q=><button key={q} onClick={()=>send(q)} style={{padding:'7px 12px',background:'rgba(0,212,255,0.08)',border:`1px solid ${C.cyan}25`,borderRadius:18,color:C.cyan,fontSize:11,cursor:'pointer'}}>{q}</button>)}
        </div>}
      </div>
      <div style={{padding:'10px 14px env(safe-area-inset-bottom,24px)',borderTop:'1px solid rgba(0,212,255,0.1)',background:'rgba(3,3,17,0.95)',display:'flex',gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(input)} placeholder="Задай вопрос Хроносу..." style={{flex:1,padding:'10px 14px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,color:C.white,fontSize:13,outline:'none'}}/>
        <button onClick={()=>send(input)} disabled={loading||!input.trim()} style={{width:42,height:42,borderRadius:10,background:input.trim()?`linear-gradient(135deg,${C.cyan},${C.purple})`:'rgba(255,255,255,0.05)',border:'none',cursor:'pointer',color:C.white,fontSize:16,opacity:input.trim()?1:0.4}}>→</button>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  )
}
