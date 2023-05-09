import {useState, useEffect} from "react";



function Products() {

    //? part 1: grab category and set is fetching
    const [category, setCategory] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    //? part 2: see all the product by that category
    const [loadingProd, setLoadingProd] = useState(false);
    const [singleCat, setSingleCat] = useState(null);
    const [product, setProduct] = useState([]);


    //? now, we need to fetch the categories
    useEffect(() => {

        async function fetchCategories() {

            try {

                const response = await fetch("http://localhost:8000/api/category");
                const data = await response.json();

                if (data) {
                    setCategory(data);
                    setIsFetching(false);
                }

            } catch (error) {

                setCategory(null);
                setIsFetching(false);
            }

        }

        fetchCategories();


    }, []);

    //? lets fetch those products
    const products = async (shortcode) => {

        let caller = `http://127.0.0.1:8000/api/product/?category=${shortcode}`;

        const requestBody = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(caller, requestBody);
        const data = await response.json();

        if (data) {
            setProduct(data);
            setLoadingProd(false);
        }

    };


    return (


        <div>

            <h2 className="mb-3">Category</h2>

            {!isFetching && category !== null? 
            
            <div>

                {category !== null?
                
                
                category.map((item) => 
                
                    <div className="card mb-3" key={item.id} style={{cursor: 'pointer'}} onClick={() => {products(item.shortcode); setLoadingProd(true); setSingleCat(item.display_name)}}  data-bs-toggle="modal" data-bs-target="#category">
                        <div className="card-body">
                            <h5 className="card-title">{item.display_name}</h5>
                            <p className="card-text">{item.shortcode}</p>
                        </div>

                        <div class="modal fade" id="category" tabindex="-1" aria-labelledby="categoryLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="categoryLabel">Modal title</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                   

                                        {loadingProd?

                                            <div className="spinner-border text-primary my-3" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>

                                            :
                                            <>
                                            {product !== null ?

                                                product.map((item) =>
                                                                                                            
                                                        <div className="card mb-3" key={item.id}>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{item.name}</h5>
                                                                <p className="card-text btn btn-primary">{singleCat}</p>
                                                                <p className="card-text">{item.price}</p>
                                                            </div>
                                                        </div>
                                                    
                                                    )

                                                : null
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

                )
                
                : 

                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title text-danger">Error loading categories</h5>
                    </div>
                </div>

                }

            </div>
            
            
            : 
            <div className="spinner-border text-primary my-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            }

        </div>


    );

}

export default {Products};