import { useState } from 'react'
import TabBar from './components/TabBar.jsx'
import Home from './pages/Home.jsx'
import CrystalFull from './pages/CrystalFull.jsx'
import Diagnose from './pages/Diagnose.jsx'
import Learn from './pages/Learn.jsx'
import Chat from './pages/Chat.jsx'
import Profile from './pages/Profile.jsx'

const PAGES = {
  home: Home,
  crystal: CrystalFull,
  diagnose: Diagnose,
  learn: Learn,
  chat: Chat,
  profile: Profile,
}

export default function App() {
  const [page, setPage] = useState('home')
  const Page = PAGES[page] || Home

  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      height:'100%',
      width:'100%',
      overflow:'hidden',
      background:'#030311',
    }}>
      <div style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}>
        <Page onNav={setPage} />
      </div>
      <TabBar active={page} onNav={setPage} />
    </div>
  )
}
