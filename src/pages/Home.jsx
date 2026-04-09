import { C, MC } from '../theme.js'
import Particles from '../components/Particles.jsx'
import Crystal3D from '../components/Crystal3D.jsx'

const MACHINES = ['genetic','emotional','language','motivation']
const LABELS = {genetic:'Genetic',emotional:'Emotional',language:'Language',motivation:'Motivation'}

export default function Home({onNav}) {
  return (
    <div style={{flex:1,position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'0 24px'}}>
      <Particles />

      <div style={{position:'relative',zIndex:1,textAlign:'center',width:'100%'}}>
        <p style={{color:C.accent,fontSize:11,letterSpacing:3,textTransform:'uppercase',marginBottom:8}}>CRYSTAL EVALITE</p>

        <Crystal3D />

        <h1 style={{color:C.text,fontSize:28,fontWeight:700,margin:'16px 0 8px',lineHeight:1.2}}>
          Your Personal Crystal
        </h1>
        <p style={{color:C.textSecondary,fontSize:15,lineHeight:1.6,margin:'0 0 32px',maxWidth:280}}>
          4 machines. One system. Evolve consciously.
        </p>

        <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:32}}>
          {MACHINES.map(k => (
            <div key={k} style={{
              display:'flex',flexDirection:'column',alignItems:'center',gap:4
            }}>
              <div style={{width:8,height:8,borderRadius:'50%',background:MC[k],boxShadow:'0 0 8px '+MC[k]}} />
              <span style={{color:C.textSecondary,fontSize:9,letterSpacing:1}}>{LABELS[k].substring(0,3).toUpperCase()}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNav('diagnose')}
          style={{
            padding:'16px 48px',
            background:'linear-gradient(135deg,'+C.accent+','+C.accentAlt+')',
            border:'none',borderRadius:14,
            color:'#fff',fontSize:16,fontWeight:700,cursor:'pointer',
            boxShadow:'0 0 32px '+C.accent+'40',
            marginBottom:12,width:'100%',maxWidth:280
          }}
        >
          Start Diagnosis
        </button>

        <button
          onClick={() => onNav('crystal')}
          style={{
            padding:'14px 48px',
            background:'rgba(255,255,255,0.05)',
            border:'1px solid '+C.border,borderRadius:14,
            color:C.textSecondary,fontSize:15,cursor:'pointer',
            width:'100%',maxWidth:280
          }}
        >
          Explore Crystal
        </button>
      </div>
    </div>
  )
}
