import { C } from '../theme.js'
const tabs = [
  {id:'home',icon:'\u25C7',label:'\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u043B'},
  {id:'learn',icon:'\u25B2',label:'\u041E\u0431\u0443\u0447\u0435\u043D\u0438\u0435'},
  {id:'chat',icon:'\u25CE',label:'\u0425\u0440\u043E\u043D\u043E\u0441'},
  {id:'profile',icon:'\u2B21',label:'\u0418\u0433\u0440\u043E\u043A'},
]
export default function TabBar({active, onChange}) {
  return (
    <div style={{
      position:'fixed',bottom:0,left:0,right:0,zIndex:100,
      background:'linear-gradient(to top,rgba(3,3,17,0.98),rgba(3,3,17,0.9))',
      backdropFilter:'blur(20px)',borderTop:'1px solid rgba(0,212,255,0.1)',
      display:'flex',justifyContent:'space-around',padding:'8px 0 env(safe-area-inset-bottom,20px)',
    }}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>onChange(t.id)} style={{
          background:'none',border:'none',cursor:'pointer',
          display:'flex',flexDirection:'column',alignItems:'center',gap:2,
          color:active===t.id?C.cyan:C.gray,transition:'transform 0.2s,color 0.2s',
        }}>
          <span style={{fontSize:22,filter:active===t.id?`drop-shadow(0 0 6px ${C.cyan})`:'none'}}>{t.icon}</span>
          <span style={{fontSize:10,letterSpacing:1}}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}
