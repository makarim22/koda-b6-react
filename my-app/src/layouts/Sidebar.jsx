import React from 'react'
import Bag from '../assets/admin/Bag.svg'
import GlassTea from '../assets/admin/glass-tea.svg'
import Logout from '../assets/admin/logout.svg'
import Option from '../assets/admin/option.svg'
import Users from '../assets/admin/users.svg'

function Sidebar() {
  return (
    <div className='pt-5'>
      <aside>
        <div>
            <img src={Option} alt="" ></img>
            <span>Dashboard</span> 
        </div>
        <nav>
            <a href="">
                <img src={GlassTea}></img>
                <span>Product</span>
            </a>
            <a href="">
                <img src={Bag}></img>
                <span>Order</span>
            </a>
            <a href="">
                <img src={Users}></img>
                <span>User</span>
            </a>
            <a href="">
                <img src={Logout}></img>
                <span>Keluar</span>
            </a>
        </nav>
      </aside>
    </div>
  )
}

export default Sidebar
