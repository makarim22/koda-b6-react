import React from 'react'
import NavbarAdmin from '../layouts/NavbarAdmin'
import Sidebar from '../layouts/Sidebar'
import UserTable from '../component/userTable'

function ListUsers() {
    const users = [
        {
            id: 1,
            image: '/src/assets/user/user1.png',
            name: 'Eleanor Pena',
            phone: '(205) 555-0100',
            address: '3517 W. Gray St. Utica, Pennsylvania 57867',
            email: 'cikaracak@gmail.com',   
        },
        {
            id: 2,
            name: 'Eleanor Pena',
            image: '/src/assets/user/user2.png',
            phone: '(205) 555-0100',
            address: '3517 W. Gray St. Utica, Pennsylvania 57867',
            email: 'cikaracak@gmail.com',   
        },
        {
            id: 3,
            name: 'Eleanor Pena',
            image: '/src/assets/user/user3.png',
            phone: '(205) 555-0100',
            address: '3517 W. Gray St. Utica, Pennsylvania 57867',
            email: 'cikaracak@gmail.com',   
        },
        {
            id: 4,
            name: 'Eleanor Pena',
            image: '/src/assets/user/user4.png',
            phone: '(205) 555-0100',
            address: '3517 W. Gray St. Utica, Pennsylvania 57867',
            email: 'cikaracak@gmail.com',   
        },
        {
            id: 5,
            name: 'Eleanor Pena',
            image: '/src/assets/user/user5.png',
            phone: '(205) 555-0100',
            address: '3517 W. Gray St. Utica, Pennsylvania 57867',
            email: 'cikaracak@gmail.com',   
        },
    ];
  return (
    <div>
      <NavbarAdmin />
      <Sidebar />
      <UserTable users={users}/>
    </div>
  )
}

export default ListUsers
