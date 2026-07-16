import React from 'react'
import { useParams } from 'react-router-dom'
import MobileNav from '../components/MobileNav'
import MobileFooterNav from '../components/MobileFooterNav'
import ChatList from '../components/ChatList'
import ConversassionUI from '../components/ConversassionUI'

const Home = () => {
  const { userId } = useParams()

  return (
    <div className='h-screen w-full max-w-8xl md:p-4 bg-[#344E41] '>
      <div className='h-full w-full rounded-xl md:flex shadow-sm shadow-[#DAD7CD]'>

        {/* LEFT — List section */}
        <div className={`${userId ? 'hidden md:flex' : 'flex'} h-full w-full md:w-[40%] flex-col justify-between  bg-[#3A5A40] md:rounded-tl-xl md:rounded-bl-xl overflow-hidden`}>
          <MobileNav />
          <ChatList />
          <MobileFooterNav />
        </div>

        {/* RIGHT — Conversation section */}
        <div className={`${userId ? 'flex' : 'hidden'} md:flex w-full md:w-[60%] bg-[#A3B18A] h-full md:rounded-tr-xl md:rounded-br-xl overflow-hidden`}>
          <ConversassionUI />
        </div>

      </div>
    </div>
  )
}

export default Home