import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center bg-[#344e41] p-15'>
      <div className='w-full max-w-lg bg-gradient-to-br from-[#3a5a40] to-[#a3b18a] rounded-2xl shadow-[0_10px_50px_rgba(0,55,0,0.55)] p-10 sm:p-14 text-center'>

        <h1 className='text-4xl font-bold mb-4 text-[#dad7cd]'>
          Welcome to
          <span className='text-black ml-2 text-2xl'>PulseUp</span>
        </h1>

        <p className='text-[#dad7cd] text-lg mb-10 leading-8'>
          Connect and chat with people, anytime, anywhere.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto'>
          <Link
            to='/login'
            className='flex-1 text-center py-3 rounded-xl bg-[#315140] text-[#dad7cd] font-semibold shadow-sm shadow-[#dad7cd] hover:bg-[#26402f] transition-all'
          >
            Login
          </Link>
          <Link
            to='/register'
            className='flex-1 text-center py-3 rounded-xl bg-[#dad7cd] text-[#315140] font-semibold shadow-sm shadow-[#dad7cd] hover:bg-[#c7c4ba] transition-all'
          >
            Register
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Landing
