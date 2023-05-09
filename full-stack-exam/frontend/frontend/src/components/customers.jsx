import {useState, useEffect} from "react";


function Customers() {

    //? part 1: grab all the customers
    const [customers, setCustomers] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    //? part 2: grab a single customer
    const [singleCustomer, setSingleCustomer] = useState(null);
    const [isFetchingSingle, setIsFetchingSingle] = useState(false);
    const [orders, setOrders] = useState(null);


    //? fetch customers
    useEffect (() => {


        async function fetchAllCustomers() {

            try {

                const response = await fetch("http://127.0.0.1:8000/api/customer/");
                const data = await response.json();

                if (data) {
                    setCustomers(data);
                    setIsFetching(false);
                }

            } catch (error) {

                setCustomers(null);
                setIsFetching(false);
            }

        }

        fetchAllCustomers();


    }, []);

    //? view single customer
    const grabSingleCustomer = async (url) => {

            const requestBody = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            const callSingle = await fetch(url, requestBody);
            const singleData = await callSingle.json();

            if (singleData) {
                setSingleCustomer(singleData);
                console.log(singleCustomer);
            };


            if (singleData) {
                let orderCaller = `http://127.0.0.1:8000/api/order/`;

                const response = await fetch(orderCaller, requestBody);
                const data = await response.json();

                if (data) {
                    setOrders(data);
                    console.log(orders);
                    setIsFetchingSingle(false);
                };
        }

    };

    return (


        <div>
            <h2 className="mb-3">Customers</h2>

            {!isFetching && customers !== null? 

            <div>
                {customers.map((customer) => (
                    <div className="card mb-3" style={{cursor: 'pointer'}} onClick={() => {grabSingleCustomer(customer.url);setIsFetchingSingle(true)}} data-bs-toggle="modal" data-bs-target="#customers">
                        <div className="card-body">
                            <h5 className="card-title">{customer.name}</h5>

                            <p className="card-text">{customer.email}</p>

                            <p className="card-text"><small className="text-muted">{customer.address}</small></p>

                        </div>
                    </div>
                ))}

                <div class="modal fade" id="customers" tabindex="-1" aria-labelledby="customersLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="customersLabel">Modal title</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">                                        
                                             
                                                {!isFetchingSingle && singleCustomer ?
                                                
                                                <div>

                                                    
                                                    <h5 className="card-title">{singleCustomer.name}</h5>
                                                    <p className="card-text">{singleCustomer.email}</p>

                                                    
                                                    {orders !== null ?
                                                    <>
                                                    {orders.map((order) => (
                                                        <>
                                                        {order.customer == singleCustomer.url ?
                                                            <div className="card mb-3">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{order.date_ordered}</h5>
                                                                    <p className="card-text">{order.status}</p>
                                                                    <p className="card-text"><small className="text-muted">{order.shipping_addr}</small></p>
                                                                </div>
                                                            </div> : null}
                                                            </>
                                                    ))}
                                                    </>

                                                    : null
                                                    
                                                    }


                                                </div>
                                                
                                                : 
                                                
                                                <div className="d-flex justify-content-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                                }



                                            </div>
                                            <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                            </div>

            </div>


            

            
            : 
            
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            
            }

        </div>


    );

}

export default {Customers};
