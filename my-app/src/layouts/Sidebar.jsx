import React from 'react'
import Bag from '../assets/admin/Bag.svg'
import GlassTea from '../assets/admin/glass-tea.svg'
import Logout from '../assets/admin/logout.svg'
import Option from '../assets/admin/option.svg'
import Users from '../assets/admin/users.svg'

function Sidebar() {
  return (
    <div className='w-64 bg-white h-full shadow-lg p-4 pt-6'>
      <aside className='flex flex-col'>
        <div className='flex items-center gap-3 p-3 mb-2 bg-orange-400 text-black rounded-lg cursor-pointer'>
            <img src={Option} alt="" ></img>
            <span className='font-semibold'>Dashboard</span> 
        </div>
                <div className='flex items-center gap-3 p-3 mb-2 text-black rounded-lg cursor-pointer'>
            <img src={GlassTea} alt="" ></img>
            <span className='font-semibold'>Product</span> 
        </div>
                <div className='flex items-center gap-3 p-3 mb-2 text-black rounded-lg cursor-pointer'>
            <img src={Bag} alt="" ></img>
            <span className='font-semibold'>Order</span> 
        </div>
                <div className='flex items-center gap-3 p-3 mb-2 text-black rounded-lg cursor-pointer'>
            <img src={Users} alt="" ></img>
            <span className='font-semibold'>User</span> 
        </div>
                <div className='flex items-center gap-3 p-3 mb-2 text-black rounded-lg cursor-pointer'>
            <img src={Logout} alt="" ></img>
            <span className='font-semibold'>Keluar</span> 
        </div>

      </aside>
    </div>
  )
}

export default Sidebar
