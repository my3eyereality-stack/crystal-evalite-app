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
  const name = tgUser()?.first_name || 'Игрок'
  return (
    <div style={{padding:'20px 16px 100px',textAlign:'center'}}>
      <span style={{fontSize:11,letterSpacing:4,color:C.gold,fontWeight:600,textTransform:'uppercase'}}>система кристалла</span>
      <h1 style={{fontSize:28,fontWeight:700,color:C.white,margin:'6px 0 2px'}}>EVALITE</h1>
      <p style={{fontSize:13,color:C.gray,margin:'0 0 4px'}}>Привет, {name} )</p>
      <p style={{fontSize:12,color:C.gray,margin:'0 0 12px',opacity:0.7}}>Управление персональной эволюцией</p>

      <div style={{display:'flex',justifyContent:'center',margin:'0 -16px'}}>
        <Crystal3D autoSpin={true}/>
      </div>
      <p style={{fontSize:11,color:C.gray,marginTop:-8,marginBottom:16,opacity:0.6}}>вращай кристалы пальцем</p>

      <div style={{display:'flex',gap:10,marginBottom:16}}>
        <button onClick={()=>onNav('diagnose')} style={{
          flex:1,padding:'14px 12px',background:`linear-gradient(135deg,${C.cyan},${C.purple})`,
          border:'none',borderRadius:12,cursor:'pointer',color:C.white,fontSize:14,fontWeight:600,
          boxShadow:'0 0 24px rgba(0,212,255,0.25)',
        }}>Начать путь Игрока</button>
        <button onClick={()=>onNav('crystal')} style={{
          flex:1,padding:'14px 12px',background:'rgba(255,255,255,0.06)',
          border:`1px solid ${C.cyan}30`,borderRadius:12,cursor:'pointer',color:C.cyan,fontSize:14,fontWeight:600,
        }}>Вращать кристалы</button>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <Card color={C.gold} title="Жизнь — это ИГРА" text="Цель не победить, а полноценно играть на любом уровне обстоятельств"/>
        <Card color={C.cyan} title="Человек — кристалл" text="Чем прочнее внутренняя структура, тем устойчивее вращение между высшими силами и социумом"/>
        <Card color={C.purpleLight} title="Эволюция — акт ВОЛИ" text="Любая открытая система стремится к усложнению. Это биологическая потребность"/>
      </div>
    </div>
  )
}
