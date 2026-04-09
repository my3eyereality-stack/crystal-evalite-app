import { useState } from 'react'
import { C } from './theme.js'
import TabBar from './components/TabBar.jsx'
import Particles from './components/Particles.jsx'
import Home from './pages/Home.jsx'
import CrystalFull from './pages/CrystalFull.jsx'
import Diagnose from './pages/Diagnose.jsx'
import Learn from './pages/Learn.jsx'
import Chat from './pages/Chat.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  const [screen, setScreen] = useState('home')

  const isTab = ['home','learn','chat','profile'].includes(screen)
  const tabId = isTab ? screen : null

  const navigate = (s) => setScreen(s)

  return (
    <div style={{
      minHeight:'100vh',
      background:`linear-gradient(180deg,${C.bg} 0%,#060820 50%,${C.bg} 100%)`,
      color:C.white, maxWidth:430, margin:'0 auto', position:'relative', overflow:'hidden',
    }}>
      <Particles/>
      <div style={{position:'relative',zIndex:1,height:'100vh',overflowY:screen==='chat'?'hidden':'auto'}}>
        {screen==='home' && <Home onNav={navigate}/>}
        {screen==='crystal' && <CrystalFull onBack={()=>navigate('home')}/>}
        {screen==='diagnose' && <Diagnose onNav={navigate}/>}
        {screen==='learn' && <Learn/>}
        {screen==='chat' && <Chat/>}
        {screen==='profile' && <Profile/>}
      </div>
      <TabBar active={tabId} onChange={navigate}/>
    </div>
  )
}
