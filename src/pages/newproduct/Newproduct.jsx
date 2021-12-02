import React, { useEffect, useState } from 'react';
import CustomInput from '../../CustomField/CustomInput';
import { APIAddProduct } from '../../apiCall';
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux';

const Newproduct = () => {
    const [input, setInput] = useState({
        status : "yes",
        stock : "Yes",
    });
    const dispatch = useDispatch();
    const [cate, setCate] = useState();
    const [photo,setPhoto] = useState();

    useEffect(()=> {


        return ()=> {
            photo && URL.revokeObjectURL(photo.preview);
        }
    }, [photo])

    const onChangeFile = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setPhoto(file);
    }
    const onChangeInput = (e) => {
        setInput({
                ...input,
                [e.target.name]: e.target.value
            })
    }
    const onChangeProps = (e) => {
        setCate({
            ...cate,
            [e.target.name] : [...e.target.value.split(',')]
        })
    }
    const onSelect = (e) =>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const handleCreate = ()=>{

        if(!photo) {
            const newProduct =  {...input, ...cate}
            APIAddProduct(newProduct)
        } else {
            const storage = getStorage(app);
            const filename = new Date().getTime() + photo?.name;
            const metadata = {
                contentType: 'image/jpeg'
            };
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, photo, metadata);
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
                        const newProduct = {
                           ...input, 
                           ...cate,
                           img : downloadURL
                        }
                        APIAddProduct(dispatch, newProduct);   
                    });
                }
                );
        }

        // const newProduct = {...input, ...cate, img : photo?.preview};
        // APIAddProduct(newProduct)
    }
    return (
        <div>
             <div className="newuser-container">
                <h3 className="newuser-title">NEW USER</h3>
                <div className="newuser-content">              
                    <div className="newuser-form">
                       
                        <div className="newuser-group-field">
                            <label htmlFor="title">Product name</label>
                            <input type="text" id="title" name="title" placeholder="Iphone 13 promax" onChange={onChangeInput}/>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="price">Price</label>
                            <input type="text" id="price" name="price" placeholder="$ 200" onChange={onChangeInput}/>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="desc">Description</label>
                            <input type="text" id="desc" name="desc" placeholder="That's so beautiful" onChange={onChangeInput}/>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="category">Category</label>
                            <input type="text" id="category" name="category" placeholder="Fashion, man" onChange={onChangeProps}/>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="size">Size</label>
                            <input type="text" id="size" name="size" placeholder="S, M, L" onChange={onChangeProps}/>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="color">Color</label>
                            <input type="text" id="color" name="color" placeholder="blue, red, #eee, fff" onChange={onChangeProps}/>
                        </div>
                        <div className="newuser-group-field">
                            <label>In stock</label>
                            <div className="newuser-group-radio" >
                                <input type="radio" name="stock" id="yes" value="Yes" onChange={onSelect}/>
                                <label htmlFor="yes">Yes</label>
                                <input type="radio" name="stock" id="no" value="No" onChange={onSelect}/>
                                <label htmlFor="no">No</label>
                            </div>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="status">Status</label>
                           <select name="status" onChange={onChangeInput}>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                           </select>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="newuser-file">Image</label>
                            <input type="file" style={{border:"none"}} onChange={onChangeFile}/>
                        </div>
                        <button className="newuser-button" onClick={handleCreate}>CREATE</button>
                        {photo?.preview && <div className="newproduct-img"><img src={photo?.preview}  style={{width:"250px", height:"250px",}} alt="" /></div>}
                    </div>             
           </div>
        </div>
        </div>
    );
};

export default Newproduct;