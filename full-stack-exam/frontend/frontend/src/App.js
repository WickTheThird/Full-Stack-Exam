import './App.css';
import React from 'react';
import { useState } from 'react';
import customers from './components/customers.jsx'
import orders from './components/orders.jsx'
import products from './components/products.jsx'

function App() {

  const [seeProducts, setSeeProducts] = useState(false);
  const [seeOrders, setSeeOrders] = useState(false);
  const [seeCustomers, setSeeCustomers] = useState(false);

  return (

    <div className='card mx-auto border-0 shadow-lg rounded-3 text-center p-5 d-flex flex-wrap'>


      {seeProducts && <products.Products/>}
      {seeOrders && <orders.Orders/>}
      {seeCustomers && <customers.Customers/>}


      <div className="card d-inline-block border-0">

          {!seeProducts ? 
            <button type="submit" className="btn btn-outline-primary mx-1" onClick={() => {setSeeOrders(false); setSeeCustomers(false); setSeeProducts(true)}}>
              Products
            </button> 
            : 
            <button type="submit" className="btn btn-outline-success mx-1">
              Products
            </button>
          }

          {!seeOrders ? 
            <button type="submit" className="btn btn-outline-primary mx-1" onClick={() => {setSeeOrders(true); setSeeCustomers(false); setSeeProducts(false)}}>
              Orders
            </button> 
            : 
            <button type="submit" className="btn btn-outline-success mx-1">
              Orders
            </button>
          }

          {!seeCustomers ? 
            <button type="submit" className="btn btn-outline-primary mx-1" onClick={() => {setSeeOrders(false); setSeeCustomers(true); setSeeProducts(false)}}>
              Customers
            </button> 
            : 
            <button type="submit" className="btn btn-outline-success mx-1">
              Customers
            </button>
          }

      </div>

    </div>

  );
}

export default App;
