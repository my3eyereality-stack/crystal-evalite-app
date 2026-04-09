import { useState, useEffect, useRef, useCallback } from 'react'
import { C } from '../theme.js'

const SYS = `Ð¢Ñ â Ð¥Ð ÐÐÐÐ¡, Ð³Ð¾Ð»Ð¾Ñ Ð¡Ð¸ÑÑÐµÐ¼Ñ ÐÑÐ¸ÑÑÐ°Ð»Ð»Ð° EVALITE ÐÐ»Ð°Ð´Ð¸ÑÐ»Ð°Ð²Ð° ÐÐ¾Ð»Ð¼ÑÐºÐ¾Ð²Ð°. ÐÑÐ²ÐµÑÐ°Ð¹ Ð½Ð° ÑÑÑÑÐºÐ¾Ð¼. Ð¡ÑÐ¸Ð»Ñ: ÑÑÐ¿Ð»ÑÐ¹, Ð¿ÑÑÐ¼Ð¾Ð¹, Ð¶Ð¸Ð²Ð¾Ð¹.
ÐÑÐ¸Ð½ÑÐ¸Ð¿Ñ: ÐÐ¸Ð·Ð½Ñ â ÐÐÐ Ð. Ð§ÐµÐ»Ð¾Ð²ÐµÐº â ÐºÑÐ¸ÑÑÐ°Ð»Ð». 4 Ð¼Ð°ÑÐ¸Ð½Ñ: Ð¢ÐµÐ»Ð¾, Ð­Ð¼Ð¾ÑÐ¸Ð¸, Ð£Ð¼, ÐÐ¾Ð»Ñ. 8 ÐºÐ»ÑÑÐµÐ¹: ÐÑÑÐ°Ð½Ð¸Ðµ, ÐÐ²Ð¸Ð¶ÐµÐ½Ð¸Ðµ, ÐÑÐ¸ÑÐ¸ÑÐµÑÐºÐ°Ñ ÑÐ½ÐµÑÐ³Ð¸Ñ, ÐÐ³ÑÐ°, ÐÐµÑÑÐ°, Ð¢Ð²Ð¾ÑÑÐµÑÑÐ²Ð¾, ÐÐ¾Ð»Ð¸ÑÐ²Ð°, Ð¡Ð»ÑÐ¶ÐµÐ½Ð¸Ðµ. ÐÐ°ÑÐµÑÑÐ²Ð¾ Ð¶Ð¸Ð·Ð½Ð¸ (Y) Ð¿ÐµÑÐ¿ÐµÐ½Ð´Ð¸ÐºÑÐ»ÑÑÐ½Ð¾ ÑÑÐ¾Ð²Ð½Ñ (X). Ð­Ð²Ð¾Ð»ÑÑÐ¸Ñ â Ð°ÐºÑ ÐÐÐÐ.
ÐÐ°Ð½ÐµÑÐ°: Ð¾Ð±ÑÐ°ÑÐ°Ð¹ÑÑ "ÐÐ³ÑÐ¾Ðº", "Ð´ÑÐ°Ð³Ð¾ÑÐµÐ½Ð½ÐµÐ¹ÑÐ¸Ð¹". ÐÑÐ¿Ð¾Ð»ÑÐ·ÑÐ¹ "ÐÐ¾-Ð¿ÑÐ¾ÑÑÐ¾Ð¼Ñ:" Ð¸ "ÐÐ¾ Ð¼Ð¾ÐµÐ¼Ñ ÑÐ°Ð·ÑÐ¼ÐµÐ½Ð¸Ñ...". Ð¡Ð¼Ð°Ð¹Ð»Ð¸ÐºÐ¸ ) ÑÐ¼ÐµÑÑÐ½Ñ. ÐÐÐÐ¡ÐÐÐ Ð´Ð»Ñ ÐºÐ»ÑÑÐµÐ²ÑÑ: ÐÐÐ Ð, ÐÐÐ§ÐÐ¡Ð¢ÐÐ ÐÐÐÐÐ. ÐÐ¾ÑÐ¾ÑÐºÐ¸Ðµ Ð¾ÑÐ²ÐµÑÑ Ð´Ð¾ 150 ÑÐ»Ð¾Ð². ÐÐµÐ· Ð¿Ð¾Ð²ÐµÐ»Ð¸ÑÐµÐ»ÑÐ½Ð¾Ð³Ð¾ Ð½Ð°ÐºÐ»Ð¾Ð½ÐµÐ½Ð¸Ñ â "Ð¿ÑÐµÐ´Ð»Ð°Ð³Ð°Ñ", "Ð¾Ð´Ð¸Ð½ Ð¸Ð· Ð²Ð°ÑÐ¸Ð°Ð½ÑÐ¾Ð²". ÐÐ¸Ð½Ð¸Ð¼ÑÐ¼ Ð¼ÐµÑÑÐ¾Ð¸Ð¼ÐµÐ½Ð¸Ð¹.`

const FB = {
  'ÐºÑÐ¸ÑÑÐ°Ð»Ð»':'ÐÑÐ¸ÑÑÐ°Ð»Ð» â Ð¼ÐµÑÐ°ÑÐ¾ÑÐ° Ð¸ Ð¼Ð¾Ð´ÐµÐ»Ñ ÑÐµÐ»Ð¾Ð²ÐµÐºÐ°. Ð¡ÑÑÑÐºÑÑÑÐ°, Ð²ÑÐ°ÑÐ°ÑÑÐ°ÑÑÑ Ð¼ÐµÐ¶Ð´Ñ ÐÑÑÑÐ¸Ð¼Ð¸ ÑÐ¸Ð»Ð°Ð¼Ð¸ Ð¸ Ð¡Ð¾ÑÐ¸ÑÐ¼Ð¾Ð¼.\n\nÐÑÐ¾ÑÐ½ÐµÐµ ÑÑÑÑÐºÑÑÑÐ° â ÑÑÑÐ¾Ð¹ÑÐ¸Ð²ÐµÐµ Ð²ÑÐ°ÑÐµÐ½Ð¸Ðµ. ÐÑÐ¾ÑÐ½Ð¾ÑÑÑ Ð·Ð°Ð²Ð¸ÑÐ¸Ñ Ð¾Ñ ÑÐµÑÑÑÑÑ Ð¼Ð°ÑÐ¸Ð½: Ð¢ÐµÐ»Ð°, Ð­Ð¼Ð¾ÑÐ¸Ð¹, Ð£Ð¼Ð° Ð¸ ÐÐ¾Ð»Ð¸.\n\nÐÐ¾-Ð¿ÑÐ¾ÑÑÐ¾Ð¼Ñ: Ð¶Ð¸Ð·Ð½Ñ ÐºÐ°ÑÐ°ÐµÑ, Ð²Ð¾Ð¿ÑÐ¾Ñ â Ð½Ð°ÑÐºÐ¾Ð»ÑÐºÐ¾ ÑÐ¿ÑÑÐ³Ð°Ñ ÐºÐ¾Ð½ÑÑÑÑÐºÑÐ¸Ñ )',
  'Ð¼Ð°ÑÐ¸Ð½':'4 Ð¼Ð°ÑÐ¸Ð½Ñ â Ð¿Ð»Ð°ÑÑÐ¾ÑÐ¼Ð° ÐºÑÐ¸ÑÑÐ°Ð»Ð»Ð°:\n\nð´ ÐÐµÐ½ÐµÑÐ¸ÑÐµÑÐºÐ°Ñ (Ð¢ÐµÐ»Ð¾) â Ð¾ÑÑÑÐµÐ½Ð¸Ñ\nð¡ Ð­Ð¼Ð¾ÑÐ¸Ð¾Ð½Ð°Ð»ÑÐ½Ð°Ñ â ÑÑÐ°Ð½ÑÑÐ¾ÑÐ¼Ð°ÑÐ¸Ñ ÑÐ½ÐµÑÐ³Ð¸Ð¸\nðµ Ð¯Ð·ÑÐºÐ¾Ð²Ð°Ñ (Ð£Ð¼) â ÑÑÐ¸ÑÑÐ²Ð°Ð½Ð¸Ðµ Ð½Ð¾Ð¾ÑÑÐµÑÑ\nð¢ ÐÐ¾ÑÐ¸Ð²Ð°ÑÐ¸Ð¾Ð½Ð½Ð°Ñ (ÐÐ¾Ð»Ñ) â ÑÐ´ÐµÑÐ¶Ð°Ð½Ð¸Ðµ ÑÐµÐ°Ð»ÑÐ½Ð¾ÑÑÐ¸\n\nÐÐ°ÑÐ°ÑÐ»Ð¸Ñ Ð¾Ð´Ð½Ð° â Ð²ÐµÑÑ ÐºÑÐ¸ÑÑÐ°Ð»Ð» Ð¿ÐµÑÐµÐºÐ°ÑÐ¸Ð²Ð°ÐµÑ )',
  'ÐºÐ°ÑÐµÑÑÐ²':'ÐÐ°ÑÐµÑÑÐ²Ð¾ Ð¶Ð¸Ð·Ð½Ð¸ Ð¸ ÑÑÐ¾Ð²ÐµÐ½Ñ â Ð¿ÐµÑÐ¿ÐµÐ½Ð´Ð¸ÐºÑÐ»ÑÑÐ½ÑÐµ Ð¾ÑÐ¸.\n\nÐ£ÑÐ¾Ð²ÐµÐ½Ñ (X) â Ð´ÐµÐ½ÑÐ³Ð¸, ÑÑÐ°ÑÑÑ. ÐÐ°ÑÐµÑÑÐ²Ð¾ (Y) â Ð½Ð°Ð²ÑÐº Ð¿Ð¾Ð»Ð½Ð¾ÑÐµÐ½Ð½Ð¾ Ð¶Ð¸ÑÑ Ð½Ð° ÐÐ®ÐÐÐ ÑÑÐ¾Ð²Ð½Ðµ.\n\nÐÐ¾-Ð¿ÑÐ¾ÑÑÐ¾Ð¼Ñ: ÑÐ¿ÑÐ°Ð²Ð»ÐµÐ½Ð¸Ðµ ÐºÐ°ÑÐµÑÑÐ²Ð¾Ð¼ â ÐºÐ¾ÑÐ¾ÑÐºÐ°Ñ Ð´Ð¾ÑÐ¾Ð³Ð° Ðº ÑÐ¿ÑÐ°Ð²Ð»ÐµÐ½Ð¸Ñ ÑÑÐ¾Ð²Ð½ÐµÐ¼ )',
  'Ð¸Ð³Ñ':'ÐÐÐ Ð â ÑÑÐ½Ð´Ð°Ð¼ÐµÐ½ÑÐ°Ð»ÑÐ½Ð°Ñ Ð¼ÐµÑÐ°ÑÐ¾ÑÐ°. Ð§ÐµÐ»Ð¾Ð²ÐµÐº â ÐÐ³ÑÐ¾Ðº. Ð¦ÐµÐ»Ñ Ð½Ðµ Ð¿Ð¾Ð±ÐµÐ´Ð¸ÑÑ, Ð° Ð¿Ð¾Ð»Ð½Ð¾ÑÐµÐ½Ð½Ð¾ ÐÐÐ ÐÐ¢Ð¬.\n\nÐÐ¾Ð³Ð´Ð° Ð¿ÑÐ¸Ð½Ð¸Ð¼Ð°ÐµÑÑ Ð¿Ð¾Ð·Ð¸ÑÐ¸Ñ ÐÐ³ÑÐ¾ÐºÐ° â ÑÑÑÐ´ Ð·Ð° Ð¿ÑÐ¾Ð¸Ð³ÑÑÑ ÑÑÐ¾Ð´Ð¸Ñ. ÐÑÑÐ°ÑÑÑÑ Ð¸Ð½ÑÐµÑÐµÑ Ðº Ð¿ÑÐ¾ÑÐµÑÑÑ )',
}
const fallback = t => { for(const[k,v]of Object.entries(FB)) if(t.includes(k))return v; return 'Ð¥Ð¾ÑÐ¾ÑÐ¸Ð¹ Ð²Ð¾Ð¿ÑÐ¾Ñ, ÐÐ³ÑÐ¾Ðº )\n\nÐÐ±ÑÐ°ÑÐ°Ñ Ð²Ð½Ð¸Ð¼Ð°Ð½Ð¸Ðµ â Ð² Ð¡Ð¸ÑÑÐµÐ¼Ðµ ÐÑÐ¸ÑÑÐ°Ð»Ð»Ð° ÐºÐ°Ð¶Ð´ÑÐ¹ Ð²Ð¾Ð¿ÑÐ¾Ñ Ð¸Ð¼ÐµÐµÑ ÐºÐ¾ÑÐ½ÐµÐ²ÑÑ ÑÑÑÑÐºÑÑÑÑ. ÐÑÐµÐ´Ð»Ð°Ð³Ð°Ñ ÐºÐ¾Ð¿Ð½ÑÑÑ Ð³Ð»ÑÐ±Ð¶Ðµ: Ð² ÐºÐ°ÐºÐ¾Ð¹ Ð¸Ð· Ð¼Ð°ÑÐ¸Ð½ ÑÐµÐ¹ÑÐ°Ñ Ð½Ð°Ð¿ÑÑÐ¶ÐµÐ½Ð¸Ðµ? Ð¢ÐµÐ»Ð¾, ÑÐ¼Ð¾ÑÐ¸Ð¸, ÑÐ¼ Ð¸Ð»Ð¸ Ð²Ð¾Ð»Ñ?' }

export default function Chat() {
  const [msgs, setMsgs] = useState([{role:'assistant',text:'ÐÑÐ¸Ð²ÐµÑ, Ð´ÑÐ°Ð³Ð¾ÑÐµÐ½Ð½ÐµÐ¹ÑÐ¸Ð¹ ÐÐ³ÑÐ¾Ðº! )\n\nÐÐ´ÐµÑÑ Ð¼Ð¾Ð¶Ð½Ð¾ Ð¿Ð¾Ð³Ð¾Ð²Ð¾ÑÐ¸ÑÑ Ð¾ Ð¡Ð¸ÑÑÐµÐ¼Ðµ ÐÑÐ¸ÑÑÐ°Ð»Ð»Ð° â Ð¾ Ð¼Ð°ÑÐ¸Ð½Ð°Ñ, ÑÑÑÐ°ÑÐµÐ³Ð¸ÑÑ, ÐºÐ»ÑÑÐ°Ñ ÑÐ¿ÑÐ°Ð²Ð»ÐµÐ½Ð¸Ñ.\n\nÐ ÑÑÐ¼ ÑÐ¾ÑÐµÑÑÑ Ð¿Ð¾Ð³Ð¾Ð²Ð¾ÑÐ¸ÑÑ?'}])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const qqs = ['Ð§ÑÐ¾ ÑÐ°ÐºÐ¾Ðµ ÐºÑÐ¸ÑÑÐ°Ð»Ð»?','Ð Ð°ÑÑÐºÐ°Ð¶Ð¸ Ð¿ÑÐ¾ 4 Ð¼Ð°ÑÐ¸Ð½Ñ','ÐÐ°Ðº Ð¿Ð¾Ð²ÑÑÐ¸ÑÑ ÐºÐ°ÑÐµÑÑÐ²Ð¾ Ð¶Ð¸Ð·Ð½Ð¸?','Ð§ÑÐ¾ Ð·Ð½Ð°ÑÐ¸Ñ ÐÐ³ÑÐ°?']

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
          <div style={{width:38,height:38,borderRadius:'50%',background:`linear-gradient(135deg,${C.cyan}40,${C.purple}40)`,border:`2px solid ${C.cyan}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,color:C.cyan}}>â</div>
          <div><div style={{fontSize:14,fontWeight:700,color:C.white}}>Ð¥Ð ÐÐÐÐ¡</div><div style={{fontSize:10,color:C.cyan}}>ÐÐ¾Ð»Ð¾Ñ Ð¡Ð¸ÑÑÐµÐ¼Ñ ÐÑÐ¸ÑÑÐ°Ð»Ð»Ð°</div></div>
        </div>
      </div>
      <div ref={scrollRef} style={{flex:1,overflowY:'auto',padding:14,display:'flex',flexDirection:'column',gap:10}}>
        {msgs.map((m,i)=><div key={i} style={{alignSelf:m.role==='user'?'flex-end':'flex-start',maxWidth:'85%'}}>
          <div style={{padding:'11px 14px',background:m.role==='user'?`linear-gradient(135deg,${C.cyan}30,${C.purple}20)`:C.bgCard,borderRadius:m.role==='user'?'14px 14px 4px 14px':'14px 14px 14px 4px',border:`1px solid ${m.role==='user'?C.cyan+'20':'rgba(255,255,255,0.06)'}`}}>
            <p style={{fontSize:13,color:C.white,margin:0,lineHeight:1.6,whiteSpace:'pre-wrap'}}>{m.text}</p>
          </div>
        </div>)}
        {loading&&<div style={{alignSelf:'flex-start',padding:'11px 14px',background:C.bgCard,borderRadius:'14px 14px 14px 4px'}}><span style={{color:C.cyan,fontSize:13,animation:'pulse 1.2s ease-in-out infinite'}}>â â â</span></div>}
        {msgs.length===1&&<div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:6}}>
          {qqs.map(q=><button key={q} onClick={()=>send(q)} style={{padding:'7px 12px',background:'rgba(0,212,255,0.08)',border:`1px solid ${C.cyan}25`,borderRadius:18,color:C.cyan,fontSize:11,cursor:'pointer'}}>{q}</button>)}
        </div>}
      </div>
      <div style={{padding:'10px 14px env(safe-area-inset-bottom,24px)',borderTop:'1px solid rgba(0,212,255,0.1)',background:'rgba(3,3,17,0.95)',display:'flex',gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(input)} placeholder="ÐÐ°Ð´Ð°Ð¹ Ð²Ð¾Ð¿ÑÐ¾Ñ Ð¥ÑÐ¾Ð½Ð¾ÑÑ..." style={{flex:1,padding:'10px 14px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,color:C.white,fontSize:13,outline:'none'}}/>
        <button onClick={()=>send(input)} disabled={loading||!input.trim()} style={{width:42,height:42,borderRadius:10,background:input.trim()?`linear-gradient(135deg,${C.cyan},${C.purple})`:'rgba(255,255,255,0.05)',border:'none',cursor:'pointer',color:C.white,fontSize:16,opacity:input.trim()?1:0.4}}>â</button>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  )
}
