import { Publish } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Chart from '../../components/chart/Chart';
import { chartProduct } from '../../dummy';
import './product.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'
import { APIEditProduct } from '../../apiCall';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Product = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2];
    const products = useSelector(state=>state.products.products);
    const product = products.find(item=>item._id == id)
    const dispatch = useDispatch();
    var date = new Date();
    const [inputs,setInputs] = useState({
        status : "yes",
    });
    const [file, setFile] = useState();



    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.previewURL);
        }
    }, [file])

    const filename = date.getTime() + file?.name;
    const metadata = {
        contentType: 'image/jpeg'
    };
    
    const storage = getStorage(app);
    const handleUpdate = () => {
        

        if(!file) {
            const newproduct = {
                _id : id,
                ...inputs,
            }
            APIEditProduct(dispatch, newproduct)     
        } else {

        


        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const newproduct = {
            _id : id,
            ...inputs,
            img : downloadURL
        }
        APIEditProduct(dispatch, newproduct)      
    });
  }
  );
}
}




    const handleChangeInput = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name] : e.target.value
            }
        )
    }


    const hanldUploadFile = (e) => {
        const filePhoto = e.target.files[0]
        filePhoto.previewURL = URL.createObjectURL(filePhoto);
        setFile(filePhoto);

    }


  
    

    return (
        <div className="product-detail">
            <div className="heading">
            <h3>PRODUCT</h3>
            <Link to="/newproduct">
                <button>Create</button>
            </Link>
            </div>
                <div className="product-detail-top">
                    <div className="product-detail-topleft">
                        <Chart data={chartProduct} dataKey="Sales" />
                    </div>
                    <div className="product-detail-topright">
                        <div className="product-detail-title">
                            <img 
                            src={ product?.img}
                            alt="" 
                            className="product-detail-image"
                            />
                            <span className="product-detail-name">{product?.title}</span>
                        </div>
                        <div className="product-detail-info">
                            <div className="product-detail-item">
                                <span className="product-detail-item-title">Id :</span>
                                <span className="product-detail-item-value">{product?._id}</span>
                            </div>
                            <div className="product-detail-item">
                                <span className="product-detail-item-title">Sales :</span>
                                <span className="product-detail-item-value">300</span>
                            </div>
                            <div className="product-detail-item">
                                <span className="product-detail-item-title">Price :</span>
                                <span className="product-detail-item-value"> ${product?.price}</span>
                            </div>
                            <div className="product-detail-item">
                                <span className="product-detail-item-title">Active :</span>
                                <span className="product-detail-item-value">Yes</span>
                            </div>
                            <div className="product-detail-item">
                                <span className="product-detail-item-title">In stock :</span>
                                <span className="product-detail-item-value">Yes</span>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="product-detail-bottom">
                    <div className="product-detail-form">
                        <div className="product-detail-group-field">
                            <label htmlFor="title">Product Name</label>
                            <input onChange={handleChangeInput} id="title" name="title" placeholder="Iphone 11 Promax" />
                        </div>
                        <div className="product-detail-group-field">
                            <label htmlFor="price">Price</label>
                            <input onChange={handleChangeInput} id="price" name="price"  type="number" placeholder="$300.00" />
                        </div>
                        <div className="product-detail-group-field">
                            <label htmlFor="desc">Desc</label>
                            <input onChange={handleChangeInput} id="desc" name="desc" placeholder="Bla bla..." />
                        </div>
                        <div className="product-detail-group-field">
                            <label htmlFor="instock">In stock</label>
                            <select name="stock" id="stock">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div  onChange={handleChangeInput} className="product-detail-group-field">
                            <label htmlFor="instock">Active</label>
                            <select name="active" id="active">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        
                    </div>
                    <div className="product-detail-right">
                        <div className="product-detail-upload">
                            <img 
                            src={ file ? file.previewURL :product?.img}
                             alt="Iphone 11 Promax" 
                            className="product-detail-file-img"
                            />
                           <div className="product-detail-file">
                               <label htmlFor="file"><Publish/></label>
                               <input type="file" id="file" onChange={hanldUploadFile} name="file" />
                           </div>
                        </div>
              
                        <button onClick={handleUpdate} className="product-detail-button">Update</button>
                    </div>
                </div>
        </div>
    );
};

export default Product;

