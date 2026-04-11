
import { ChevronRight, MessageSquare} from 'lucide-react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useEffect, useState } from 'react';
import Calendar from '../assets/user/Calendar.svg'
import { useNavigate } from 'react-router-dom';
import http from '../lib/http'

export default function HistoryOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  

  const getActiveUser = () => {
    try {
      const activeUser = JSON.parse(localStorage.getItem('currentUserSession'));
      console.log('Active user:', activeUser);
      return activeUser;
    } catch (error) {
      console.warn("Tidak bisa mengambil data user", error);
      return null;
    }
  };


  const user = getActiveUser();

  const token = user?.user?.token || user?.token
  console.log('token', token);

  const fetchOrders = async () => {
  try {
    const response = await http(`/api/orders`, null, { method: 'GET', token });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    console.log('data', data);
    setOrders(data.data || []);
  } catch (error) {
    console.error('Gagal mengambil data pesanan:', error);
    setOrders([]);
  }
};

useEffect(() => {
  if (token) {
    fetchOrders();
  }
}, [token]);

  console.log('orders', orders);


   function convertISOToReadable(isoString) {
    if (!isoString) return "—";
    try {
      return new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-10">
      <Header bgColor="bg-black" />


      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="grid grid-cols-3 gap-8">
  
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <h1 className="text-4xl font-bold">History Order</h1>
              <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm">{orders.length}</span>
            </div>

            <div className="flex flex-row justify-between gap-4 mb-8">
              <div className='flex flex-row gap-4 h-15'>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">On Progress</button>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Sending Goods</button>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Finish Order</button>
              </div>
              <div className="mb-8 flex items-center gap-2 text-gray-700">
              <span><img src={Calendar} alt="Calendar" className="w-6 h-6" /></span>
              <select className="bg-white border border-gray-300 rounded px-4 py-2">
                <option>January 2023</option>
              </select>
            </div>

            </div>

 
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={index} onClick={() => {navigate(`/detail-order/${order?.id}`);}} className="bg-white rounded-lg p-6 flex gap-6 hover:shadow-md transition">
                  <img 
                    src={order.image} 
                    alt="Coffee" 
                    className="w-24 h-24 rounded object-cover bg-gray-300"
                  />
                  
                  <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">No. Order</div>
                      <div className="font-semibold text-gray-900">{order.id}</div>
                      <a href="#" className="text-orange-500 text-sm font-medium hover:underline">Views Order Detail</a>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-1">Date</div>
                      <div className="font-semibold text-gray-900">({convertISOToReadable(order.created_at)})</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-1">Total</div>
                      <div className="font-semibold text-gray-900">Rp{order.subtotal}</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-1">Status</div>
                      <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              <button className="w-10 h-10 rounded-full bg-orange-500 text-white font-semibold">1</button>
              <button className="w-10 h-10 rounded-full bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400">2</button>
              <button className="w-10 h-10 rounded-full bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400">3</button>
              <button className="w-10 h-10 rounded-full bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400">4</button>
              <button className="w-10 h-10 rounded-full bg-orange-500 text-white font-semibold"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                  <MessageSquare size={32} className="text-gray-600" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-center mb-4">Send Us Message</h3>
              
              <p className="text-gray-600 text-sm text-center mb-6">
                If your unable to find answer or find your product quickly, please describe your problem and tell us. we will give you solution.
              </p>

              <button className="w-full bg-orange-500 text-white font-semibold py-3 rounded hover:bg-orange-600 transition">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </main>

   <Footer />
    </div>
  );
}