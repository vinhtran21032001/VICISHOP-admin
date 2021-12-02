import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './productlist.css';
import React, {useState}from 'react';

function Productlist(props) {
    const [products, setProduct] = useState([]);

    const dispatch =  useDispatch()


    const handleDelete = (id) => {
        setProduct(
            products.filter(item=>item.id !== id)
        )
        }
    
    const columns = [
        { field: '_id', headerName: 'ID', width: 270 },

        {
          field: 'product',
          headerName: 'Product',
          width: 240,
          renderCell : (params) =>
          (
              <div className="product-info">
                  <img 
                  src={params.row.img} 
                  alt="" 
                  className="user-avartar"
                  />
                  <span>
                      {params.row.title}
                  </span>
              </div>
          ),
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 130,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 160,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell : (params) => (
                <div className="productlist-action">
                    <Link to={`/product/${params.row._id}`}>
                        <button className="productlist-button">
                            Edit
                        </button>
                    </Link>
                    <DeleteOutline onClick={()=>handleDelete(params.row._id)} className="productlist-icon-delete"/>
                </div>
            )
        },
      ];
   

    return (
        <div className="productlist-container">
            <h3>PRODUCT LIST</h3>
            <DataGrid
            rows={products}
            columns={columns}
            getRowId = {(row=>row._id)}
            pageSize={9}

            checkboxSelection
            disableSelectionOnClick
            />
        </div>
    );
}

export default Productlist;

