import React from 'react'
import Bag from '../assets/admin/Bag.svg'
import GlassTea from '../assets/admin/glass-tea.svg'
import Logout from '../assets/admin/logout.svg'
import Option from '../assets/admin/option.svg'
import Users from '../assets/admin/users.svg'
import { Link } from 'react-router-dom' 
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const usersString = localStorage.getItem('user-data');
    if (usersString) {
      try {
        let allUsers = JSON.parse(usersString);
        const loggedInUserIndex = allUsers.findIndex(user => user.isLoggedIn === true);
        if (loggedInUserIndex !== -1) {
          allUsers[loggedInUserIndex].isLoggedIn = false;
          localStorage.setItem('user-data', JSON.stringify(allUsers));
        }
        navigate('/login');
      } catch (error) {
        console.error('Error parsing or updating users data during logout:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };
  return (
    <div className='w-64 bg-white h-full shadow-lg p-4 pt-6'>
      <aside className='flex flex-col'>
        <div className='flex items-center gap-3 p-3 mb-2 bg-orange-400 text-black rounded-lg cursor-pointer'>
            <img src={Option} alt="" ></img>
            <Link to={'/admin-dashboard'}>
            <span className='font-semibold'>Dashboard</span> 
            </Link>
            
        </div>
                <div className='flex items-center gap-3 p-3 mb-2 text-black rounded-lg cursor-pointer'>
            <img src={GlassTea} alt="" ></img>
            <Link to={'/admin-products'}>
            <span className='font-semibold'>Product</span> 
            </Link>
            
        </div>
                <div className='flex items-center gap-3 p-3 mb-2 text-black rounded-lg cursor-pointer'>
            <img src={Bag} alt="" ></img>
            <Link to={'/admin-orders'}>
            <span className='font-semibold'>Order</span> 
            </Link>
        </div>
                <div className='flex items-center gap-3 p-3 mb-2 text-black rounded-lg cursor-pointer'>
            <img src={Users} alt="" ></img>
            <Link to={'/admin-users'}>
            <span className='font-semibold'>User</span> 
            </Link>
        </div>
                <div className='flex items-center gap-3 p-3 mb-2 text-black rounded-lg cursor-pointer'>
            <img src={Logout} alt="" ></img>
            <button
             onClick={handleLogout}
             className='font-semibold'>Keluar</button> 
        </div>

      </aside>
    </div>
  )
}

export default Sidebar
