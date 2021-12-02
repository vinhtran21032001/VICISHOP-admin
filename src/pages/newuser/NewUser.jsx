import React, { useState } from 'react';
import './newuser.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { APIAddUsers, APIEditUsers } from '../../apiCall';
import { useDispatch } from 'react-redux';

const NewUser = () => {
    const dispatch = useDispatch();
    const [newUser, setNewUser] = useState();
    const [file,setFile] = useState();

    const handleChangeInput = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name] : e.target.value
        })
    }
    const handleChangeUsername = (e) => {
        const fullname = e.target.value.split(" ");
        const lastname = fullname[0];
        const [oke , ...name] = fullname
        const firstname = name.join("");
        setNewUser({
            ...newUser,
            name : firstname,
            lastname : lastname
        })
    }
    const handleChangeFile = (e) => {
        const fileInput = e.target.files[0];
        fileInput.preview = URL.createObjectURL(fileInput);
        setFile(fileInput);
    }
    const handleClickUpdate = (e) => {
        if(!file) {
            const aNewUser = {
                ...newUser,
            }
            APIAddUsers(dispatch, aNewUser)
        }else {
            const filename = new Date().getTime() + file.name;
            const storage = getStorage();
            const metadata = {
                contentType: 'image/jpeg'
            };
            const storageRef = ref(storage,  filename);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            uploadTask.on('state_changed',
                (snapshot) => {
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
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }
                }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const aNewUser = {
                            ...newUser, 
                            img : downloadURL,
                        }
                        console.log(aNewUser)
                        APIAddUsers (dispatch, aNewUser)
                    });
                }
                );

        }
    }

    return (
        <div className="newuser-container">
           <h3 className="newuser-title">NEW USER</h3>
           <div className="newuser-content">              
                    <div className="newuser-form">
                        <div className="newuser-group-field">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" placeholder="vinhtran" onChange={handleChangeInput}/>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="fullname">Fullname</label>
                            <input type="text" id="fullname" name="fullname" placeholder="Tran Vinh" onChange={handleChangeUsername}/>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" placeholder="vicidev@gmail.com" onChange={handleChangeInput}/>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="password" onChange={handleChangeInput}/>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" name="phone" placeholder="+ 98 995 1609" onChange={handleChangeInput}/>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" placeholder="Ninh Thuan | Viet Nam" onChange={handleChangeInput}/>
                        </div>
                        <div className="newuser-group-field">
                            <label>Gender</label>
                            <div className="newuser-group-radio">
                                <input type="radio" name="gender" id="male" value="male" onChange={handleChangeInput}/>
                                <label htmlFor="male">Male</label>
                                <input type="radio" name="gender" id="female" value="female" onChange={handleChangeInput}/>
                                <label htmlFor="female">Female</label>
                                <input type="radio" name="gender" id="orther" value="orther" onChange={handleChangeInput}/>
                                <label htmlFor="orther">Orther</label>
                            </div>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="status">Status</label>
                           <select name="status" onChange={handleChangeInput}>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                           </select>
                        </div>
                        <div className="newuser-group-field">
                            <label htmlFor="address">User Photo</label>
                            <input type="file" id="file" name="file" onChange={handleChangeFile} style={{border:"none"}}/>
                        </div>
                        <button className="newuser-button" onClick={handleClickUpdate}>CREATE</button>
                        <div className="newproduct-img">
                        {file?.preview && <img src={file?.preview || ""} width="200px" height="200px" alt="" />}
                        </div>
                    </div>             
           </div>
        </div>
    );
};


export default NewUser;