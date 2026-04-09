import { C, MC } from '../theme.js'

const TABS = [
  {key:'home',    label:'Home',    icon:'◈'},
  {key:'crystal', label:'Crystal', icon:'💎'},
  {key:'diagnose',label:'Diagnose',icon:'⚡'},
  {key:'learn',   label:'Learn',   icon:'📖'},
  {key:'chat',    label:'Chat',    icon:'✦'},
  {key:'profile', label:'Profile', icon:'◉'},
]

export default function TabBar({active, onNav}) {
  return (
    <div style={{
      display:'flex',
      justifyContent:'space-around',
      alignItems:'center',
      padding:'8px 4px',
      background:'rgba(3,3,17,0.95)',
      borderTop:'1px solid rgba(255,255,255,0.06)',
      backdropFilter:'blur(20px)',
      WebkitBackdropFilter:'blur(20px)',
      flexShrink:0,
    }}>
      {TABS.map(tab => {
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onNav(tab.key)}
            style={{
              display:'flex',flexDirection:'column',alignItems:'center',
              gap:2,padding:'4px 8px',
              background:'none',border:'none',cursor:'pointer',
              opacity:isActive ? 1 : 0.4,
              transition:'opacity 0.2s',
              minWidth:44,
            }}
          >
            <span style={{fontSize:16,lineHeight:1}}>{tab.icon}</span>
            <span style={{
              fontSize:9,letterSpacing:0.5,
              color:isActive ? C.accent : C.textSecondary,
              fontWeight:isActive ? 700 : 400,
            }}>{tab.label.toUpperCase()}</span>
            {isActive && (
              <div style={{
                width:4,height:4,borderRadius:'50%',
                background:C.accent,
                boxShadow:'0 0 6px '+C.accent,
                marginTop:1,
              }} />
            )}
          </button>
        )
      })}
    </div>
  )
}
