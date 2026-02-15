import React from 'react'
import Bag from '../assets/admin/Bag.svg'
import GlassTea from '../assets/admin/glass-tea.svg'
import Logout from '../assets/admin/logout.svg'
import Option from '../assets/admin/option.svg'
import Users from '../assets/admin/users.svg'
import { Link } from 'react-router-dom' 
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();
  console.log('locationnya', location);
  const [activeSection, setActiveSection] = useState(''); 
  console.log('active session', activeSection)

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

  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin-dashboard') {
      setActiveSection('dashboard');
    } else if (path === '/admin-products') {
      setActiveSection('product');
    } else if (path === '/admin-orders') {
      setActiveSection('order');
    } else if (path === '/admin-users') {
      setActiveSection('user');
    } else {
      setActiveSection('');
    }
  }, [location.pathname]);

   const getSectionClasses = (sectionName) => {
    return `flex items-center gap-3 p-3 mb-2 text-black rounded-lg cursor-pointer ${
      activeSection === sectionName ? 'bg-orange-400' : ''
    }`;
  };
  return (
    <div className='w-64 bg-white h-full shadow-lg p-4 pt-6'>
      <aside className='flex flex-col'>
        <div className={getSectionClasses('dashboard')}>
            <img src={Option} alt="" ></img>
            <Link to={'/admin-dashboard'}>
            <span className='font-semibold'>Dashboard</span> 
            </Link>
            
        </div>
                <div 
                className={getSectionClasses('product')}>
            <img src={GlassTea} alt="" ></img>
            <Link to={'/admin-products'}>
            <span className='font-semibold'>Product</span> 
            </Link>
            
        </div>
                <div 
                className={getSectionClasses('order')}>
            <img src={Bag} alt="" ></img>
            <Link to={'/admin-orders'}>
            <span className='font-semibold'>Order</span> 
            </Link>
        </div>
                <div 
                className={getSectionClasses('user')}>
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
