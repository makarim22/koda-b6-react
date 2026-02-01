import React from 'react'
import NavbarAdmin from '../layouts/NavbarAdmin'
import Sidebar from '../layouts/Sidebar'
import { OrderTable } from '../component/OrderTable'
import OrderSidebar from '../component/OrderSidebar';

function AdminOrderDetail() {
       const orders = [
    {
      id: '1',
      orderNumber: '#12354-09893',
      date: '2023-01-26',
      items: [
        { name: 'Hazelnut Latte', quantity: 1 },
        { name: 'Mocha', quantity: 1 }
      ],
      status: 'Done',
      total: '  IDR 40000'
    },
    {
      id: '2',
      orderNumber: '#12354-09893',
      date: '2023-01-26',
      items: [
        { name: 'Hazelnut Latte', quantity: 1 },
        { name: 'Mocha', quantity: 1 }
      ],
      status: 'Done',
      total: '  IDR 40000'
    },
    {
      id: '3',
      orderNumber: '#12354-09893',
      date: '2023-01-26',
      items: [
        { name: 'Hazelnut Latte', quantity: 1 },
        { name: 'Mocha', quantity: 1 }
      ],
      status: 'Done',
      total: '  IDR 40000'
    },
    {
      id: '4',
      orderNumber: '#12354-09893',
      date: '2023-01-26',
      items: [
        { name: 'Hazelnut Latte', quantity: 1 },
        { name: 'Mocha', quantity: 1 }
      ],
      status: 'Done',
      total: '  IDR 40000'
    },
    {
      id: '5',
      orderNumber: '#12354-09893',
      date: '2023-01-26',
      items: [
        { name: 'Hazelnut Latte', quantity: 1 },
        { name: 'Mocha', quantity: 1 }
      ],
      status: 'Done',
      total: '  IDR 40000'
    },
   
  ];
  return (
    <div>
      <NavbarAdmin />
      <Sidebar />
      <OrderTable  orders={orders} />
      <OrderSidebar />
    </div>
  )
}

export default AdminOrderDetail
