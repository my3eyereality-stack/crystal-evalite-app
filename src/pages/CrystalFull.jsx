import { useState } from 'react'
import { C, MC } from '../theme.js'
import Crystal3D from '../components/Crystal3D.jsx'

const INFO = {
  genetic:    {name:'Genetic Machine',   icon:'Body',    keys:['Energy','Movement'],  desc:'Physical body as the instrument of life. Foundation of all other machines.'},
  emotional:  {name:'Emotional Machine', icon:'Emotion', keys:['Feeling','Play'],     desc:'Transforms chemical energy into electromagnetic. The ability to feel and play.'},
  language:   {name:'Language Machine',  icon:'Mind',    keys:['Dream','Create'],     desc:'Reading reality through symbols. Creative self-expression and thinking.'},
  motivation: {name:'Motivation Machine',icon:'Will',    keys:['Trust','Action'],     desc:'Converts intention into movement. Belief in the process and readiness to act.'},
}

const MACHINES = ['genetic','emotional','language','motivation']

export default function CrystalFull() {
  const [active, setActive] = useState(null)
  const info = active ? INFO[active] : null

  return (
    <div style={{flex:1,overflowY:'auto',padding:'20px 20px 100px'}}>
      <p style={{color:C.accent,fontSize:12,letterSpacing:2,textTransform:'uppercase',marginBottom:4}}>CRYSTAL EVALITE</p>
      <h2 style={{color:C.text,fontSize:20,fontWeight:700,marginBottom:20}}>Your 4 Machines</h2>

      <Crystal3D activeKey={active} />

      <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:16,marginBottom:24}}>
        {MACHINES.map(k => (
          <div
            key={k}
            onClick={() => setActive(active === k ? null : k)}
            style={{
              width:active===k?28:10,height:10,borderRadius:5,
              background:MC[k],
              boxShadow:'0 0 8px '+MC[k],
              transition:'all 0.3s',cursor:'pointer'
            }}
          />
        ))}
      </div>

      {info && (
        <div style={{
          background:C.surface,borderRadius:16,padding:'20px',
          border:'1px solid '+MC[active]+'40',
          marginBottom:16
        }}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
            <div style={{width:10,height:10,borderRadius:'50%',background:MC[active],boxShadow:'0 0 10px '+MC[active]}} />
            <h3 style={{color:C.text,fontSize:17,fontWeight:700,margin:0}}>{info.name}</h3>
          </div>
          <p style={{color:C.textSecondary,fontSize:14,lineHeight:1.6,margin:'0 0 16px'}}>{info.desc}</p>
          <div style={{display:'flex',gap:8}}>
            {info.keys.map(k => (
              <span key={k} style={{
                padding:'4px 12px',borderRadius:20,fontSize:12,
                background:MC[active]+'20',color:MC[active],
                border:'1px solid '+MC[active]+'40'
              }}>{k}</span>
            ))}
          </div>
        </div>
      )}

      {!info && (
        <div style={{textAlign:'center',padding:'20px 0'}}>
          <p style={{color:C.textSecondary,fontSize:14}}>Tap a dot above to explore a machine</p>
        </div>
      )}

      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {MACHINES.map(k => (
          <button
            key={k}
            onClick={() => setActive(active === k ? null : k)}
            style={{
              display:'flex',alignItems:'center',gap:14,padding:'14px 16px',
              background:active===k ? C.surface : 'rgba(255,255,255,0.03)',
              border:'1px solid '+(active===k ? MC[k]+'60' : C.border),
              borderRadius:12,cursor:'pointer',textAlign:'left',
              transition:'all 0.2s'
            }}
          >
            <div style={{width:8,height:8,borderRadius:'50%',background:MC[k],boxShadow:'0 0 6px '+MC[k],flexShrink:0}} />
            <div>
              <p style={{color:C.text,fontSize:14,fontWeight:600,margin:'0 0 2px'}}>{INFO[k].name}</p>
              <p style={{color:C.textSecondary,fontSize:12,margin:0}}>{INFO[k].icon}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
