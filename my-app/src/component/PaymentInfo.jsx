import React from 'react'

import mailIcon from '../assets/icons/mail.svg';
import passwordIcon from '../assets/icons/Password.svg';
import { Input } from './input';

function PaymentInfo() {
    
  return (
    <div>
      <h1>Payment Info & delivery</h1>
      <form>
            <div className="mb-2">
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                required
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                icon={mailIcon}
                iconAlt="Email Icon"
              />
            </div>
            <div className="mb-2">
              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                required
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                icon={passwordIcon}
                iconAlt="Password Icon"
              />
            </div>
                        <div className="mb-2">
              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                required
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                icon={passwordIcon}
                iconAlt="Password Icon"
              />
            </div>
            <div className="flex flex-row justify-between">
                <button>Dine In</button>  
                <button>Door Delivery</button>
                <button>Pick Up</button>
            </div>
      </form>
    </div>
  )
}

export default PaymentInfo
