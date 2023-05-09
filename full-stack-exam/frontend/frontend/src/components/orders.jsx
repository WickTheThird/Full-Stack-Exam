import {useState} from "react";



function Orders() {

    //? part 1: we need to set up some statuses (O, P, S, D)
    //? part 2: create an onclock function to view all oreders by status
    const [orders, setOrders] = useState(null);
    const [isFetching, setIsFetching] = useState(null);
    const [status, setStatus] = useState(null);

    //? part 3: view single order
    const [viewSingle, setViewSingle] = useState(null);
    const [singleOrder, setSingleOrder] = useState(null);

    //? fetch orders by status
    const seeOrderes = async (status) => {

        let caller = `http://127.0.0.1:8000/api/order/?status=${status}`;

        const requestBody = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }};

        const response = await fetch(caller, requestBody);
        const data = await response.json();

        if (data) {
            setOrders(data);
            setIsFetching(false);
        }

    };

    return (


        <div>
            <h2 className="mb-3">Orders</h2>


            <div className="card mb-3" style={{cursor: 'pointer'}} onClick={() => {setIsFetching(true); seeOrderes("O"); setStatus("Ordered");}} data-bs-toggle="modal" data-bs-target="#orders">
                <div className="card-body">
                    <h5 className="card-title">View Ordered</h5>
                </div>
            </div>

            <div className="card mb-3" style={{cursor: 'pointer'}} onClick={() => {setIsFetching(true); seeOrderes("P"); setStatus("Processing");}} data-bs-toggle="modal" data-bs-target="#orders">
                <div className="card-body">
                    <h5 className="card-title">View Processing</h5>
                </div>
            </div>

            <div className="card mb-3" style={{cursor: 'pointer'}} onClick={() => {setIsFetching(true); seeOrderes("S"); setStatus("Shipped");}} data-bs-toggle="modal" data-bs-target="#orders">
                <div className="card-body">
                    <h5 className="card-title">View Shipped</h5>
                </div>
            </div>

            <div className="card mb-3" style={{cursor: 'pointer'}} onClick={() => {setIsFetching(true); seeOrderes("D"); setStatus("Delivered");}} data-bs-toggle="modal" data-bs-target="#orders">
                <div className="card-body">
                    <h5 className="card-title">View Delivered</h5>
                </div>
            </div>


            <div class="modal fade" id="orders" tabindex="-1" aria-labelledby="ordersLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="ordersLabel">Modal title</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                   
                                        {isFetching ?

                                            <div className="spinner-border text-primary my-3" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>

                                            :
                                            <>
                                            {orders !== null ?
                                                <>

                                                {!viewSingle ?

                                                <>

                                                {orders.map((item) =>
                                                                                                            
                                                        <div className="card mb-3" key={item.customer} style={{cursor: 'pointer'}} onClick={() => {setViewSingle(true); setSingleOrder(item)}}>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{item.date_ordered}</h5>
                                                                <p className="card-text btn btn-primary">{status}</p>
                                                                <p className="card-text">{item.shipping_addr}</p>
                                                            </div>
                                                        </div>
                                                    
                                                    )}

                                                </>

                                                : 
                                                
                                                <div className="card mb-3">
                                                <div className="card-body">
                                                    <h5 className="card-title">{singleOrder.date_ordered}</h5>
                                                    <p className="card-text btn btn-primary">{singleOrder.status}</p>
                                                    <p className="card-text">{singleOrder.shipping_addr}</p>
                                                </div>
                                            </div>
                                                
                                                }
                                            </>
                                            :
                                            null

                                        }

                                            </>

                                        }


                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                    </div>
        </div>


    );

}

export default {Orders};