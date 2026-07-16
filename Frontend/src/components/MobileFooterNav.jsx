import React from 'react'
import { FiMessageCircle, FiBell, FiUser } from 'react-icons/fi'
import { FaPeopleGroup } from 'react-icons/fa6'
import { IoCallSharp } from "react-icons/io5";

const MobileFooterNav = () => {
  const footerItems = [
    { id: 2, chatIcon: FiMessageCircle, text: 'Chats' },
    { id: 1, chatIcon: FaPeopleGroup, text: 'status' },
    { id: 3, chatIcon: FiBell, text: 'Alerts' },
    { id: 4, chatIcon: IoCallSharp, text: 'Call' }
  ] 

  return (
    <div className='md:hidden sticky bottom-0 left-0 right-0 flex w-full items-center justify-between bg-[#344e41] py-1 px-10'>
      {footerItems.map((item) => {
        const Icon = item.chatIcon
        return ( 
          <div key={item.id} className='flex flex-col items-center gap-1 text-[#dad7cd]'>
            <Icon size={15} />
            <span className='text-[12px]'>{item.text}</span>
          </div>
        )
      })}
    </div>
  )
}

export default MobileFooterNav
