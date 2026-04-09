import { C } from '../theme.js'
import { tgUser } from '../tg.js'
import Crystal3D from '../components/Crystal3D.jsx'

function Card({color,title,text}) {
  return <div style={{background:C.bgCard,borderRadius:14,padding:'16px 18px',textAlign:'left',border:`1px solid ${color}22`,position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',top:-20,right:-20,width:80,height:80,background:`radial-gradient(circle,${color}15,transparent)`,borderRadius:'50%'}}/>
    <div style={{width:6,height:6,borderRadius:'50%',background:color,boxShadow:`0 0 8px ${color}`,marginBottom:10}}/>
    <h3 style={{fontSize:15,fontWeight:700,color:C.white,margin:'0 0 6px'}}>{title}</h3>
    <p style={{fontSize:13,color:C.grayLight,margin:0,lineHeight:1.5}}>{text}</p>
  </div>
}

export default function Home({onNav}) {
  const name = tgUser()?.first_name || 'ÐÐ³ÑÐ¾Ðº'
  return (
    <div style={{padding:'20px 16px 100px',textAlign:'center'}}>
      <span style={{fontSize:11,letterSpacing:4,color:C.gold,fontWeight:600,textTransform:'uppercase'}}>ÑÐ¸ÑÑÐµÐ¼Ð° ÐºÑÐ¸ÑÑÐ°Ð»Ð»Ð°</span>
      <h1 style={{fontSize:28,fontWeight:700,color:C.white,margin:'6px 0 2px'}}>EVALITE</h1>
      <p style={{fontSize:13,color:C.gray,margin:'0 0 4px'}}>ÐÑÐ¸Ð²ÐµÑ, {name} !</p>
      <p style={{fontSize:12,color:C.gray,margin:'0 0 12px',opacity:0.7}}>Ð£Ð¿ÑÐ°Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿ÐµÑÑÐ¾Ð½Ð°Ð»ÑÐ½Ð¾Ð¹ ÑÐ²Ð¾Ð»ÑÑÐ¸ÐµÐ¹</p>

      <div style={{display:'flex',justifyContent:'center',margin:'0 -16px'}}>
        <Crystal3D autoSpin={true}/>
      </div>
      <p style={{fontSize:11,color:C.gray,marginTop:-8,marginBottom:16,opacity:0.6}}>Ð²ÑÐ°ÑÐ°Ð¹ ÐºÑÐ¸ÑÑÐ°Ð»Ð»Ð³ Ð¿Ð°Ð»ÑÑÐµÐ¼</p>

      <div style={{display:'flex',gap:10,marginBottom:16}}>
        <button onClick={()=>onNav('diagnose')} style={{
          flex:1,padding:'14px 12px',background:`linear-gradient(135deg,${C.cyan},${C.purple})`,
          border:'none',borderRadius:12,cursor:'pointer',color:C.white,fontSize:14,fontWeight:600,
          boxShadow:'0 0 24px rgba(0,212,255,0.25)',
        }}>ÐÐ°ÑÐ°ÑÑ Ð¿ÑÑÑ ÐÐ³ÑÐ¾ÐºÐ°</button>
        <button onClick={()=>onNav('crystal')} style={{
          flex:1,padding:'14px 12px',background:'rgba(255,255,255,0.06)',
          border:`1px solid ${C.cyan}30`,borderRadius:12,cursor:'pointer',color:C.cyan,fontSize:14,fontWeight:600,
        }}>ÐÑÐ°ÑÐ°ÑÑ ÐºÑÐ¸ÑÑÐ°Ð»Ð»</button>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <Card color={C.gold} title="ÐÐ¸Ð·Ð½Ñ â ÐµÑÐ¾ ÐÐÐ Ð" text="Ð¦ÐµÐ»Ñ Ð½Ðµ Ð¿Ð¾Ð±ÐµÐ´Ð¸ÑÑ, Ð° Ð¿Ð¾Ð»Ð½Ð¾ÑÐµÐ½Ð½Ð¾ Ð¸Ð³ÑÐ°ÑÑ Ð½Ð° Ð»ÑÐ±Ð¾Ð¼ ÑÑÐ¾Ð²Ð½Ðµ Ð¾Ð±ÑÑÐ¾ÑÑÐµÐ»ÑÑÑÐ²"/>
        <Card color={C.cyan} title="Ð§ÐµÐ»Ð¾Ð²ÐµÐ â ÐºÑÐ¸ÑÑÐ°Ð»Ð»" text="Ð§ÐµÐ¼ Ð¿ÑÐ¾ÑÐ½ÐµÐµ Ð²Ð½ÑÑÑÐµÐ½Ð½ÑÑ ÑÑÑÑÐºÑÑÑÐ°, ÑÐµÐ¼ ÑÑÑÐ¾Ð¹ÑÐ¸Ð²ÐµÐ´ Ð²ÑÐ°ÑÐµÐ½Ð¸Ðµ Ð¼ÐµÐ¶Ð´Ñ Ð²ÑÑÑÐ¸Ð¼Ð¸ ÑÐ¸Ð»Ð°Ð¼Ð¸ BáÐ¾ÑÐ¸ÑÐ¼Ð¾Ð¼"/>
        <Card color={C.purpleLight} title="Ð­Ð²Ð¾Ð»ÑÑÐ¸Ñ â Ð°ÐºÑ ÐÐÐÐ" text="ÐÑÐ±Ð°Ñ Ð¾ÑÐºÑÑÑÐ°Ñ ÑÐ¸ÑÑÐµÐ¼Ð° ÑÑÑÐµÐ¼Ð¸ÑÑÑ Ðº ÑÑÐ»Ð¾Ð¶Ð½ÐµÐ½Ð¸Ñ. Ð­ÑÐ¾ Ð±Ð¸Ð¾Ð»Ð¾Ð³Ð¸ÑÐµÑÐºÐ°Ñ Ð¿Ð¾ÑÑÐµÐ±Ð½Ð¾ÑÑÑ"/>
      </div>
    </div>
  )
}
