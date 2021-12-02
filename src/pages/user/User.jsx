import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { APIEditUsers } from '../../apiCall';
import './user.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const User = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2];
    const users = useSelector(state=>state.users.users);
    const user = users.find(item=>item._id == id);
    const dispatch = useDispatch();
    const [editUser, setEditUser] = useState();
    const [file , setFile] = useState();

    console.log(editUser)
    const handleChangeInput = (e) => {
        setEditUser({
            ...editUser,
            [e.target.name] : e.target.value
        })
    }
    const handleChangeUsername = (e) => {
        const fullname = e.target.value.split(" ");
        const lastname = fullname[0];
        const [oke , ...name] = fullname
        const firstname = name.join("");
        setEditUser({
            ...editUser,
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
            const newUser = {
                ...editUser,
                _id : id
            }
            APIEditUsers(dispatch, newUser)
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
                        const newUser = {
                            ...editUser, 
                            img : downloadURL,
                            _id : id
                        }
                        APIEditUsers(dispatch, newUser)
                    });
                }
                );

        }
    }
    return (
        <div className="user-container">
                <div className="user-top">
                    <h3 className="user-top-title">USER INFOMATION</h3>
                   <Link to="/newuser">
                     <button className="user-top-button">CREATE</button>
                   </Link>
                </div>
                <div className="user-bottom">
                    <div className="user-show-info">
                        <div className="user-info">
                            <img 
                            src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/245644941_1283167755466710_9204084801773221917_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=A0DykAPulfIAX8TbA38&_nc_ht=scontent.fdad3-1.fna&oh=357b969a946c0d93cda73e648386c70d&oe=61A26686"
                            alt="" 
                            className="user-avatar"
                            />
                            <div className="user-desc">
                                <span className="user-fullname">
                                    {user.lastname + " " + user.name}
                                </span>
                                <span className="user-title">
                                    Web deverloper
                                </span>
                            </div>
                        </div>
                        <div className="user-detail">
                            <div className="user-detail-title">
                                Account details
                            </div>
                            <div className="user-detail-desc">
                                <PermIdentity className="user-detail-icon"/>
                                <span className="user-detail-username">
                                    {user.username}
                                </span>
                            </div>
                            <div className="user-detail-desc">
                                <CalendarToday className="user-detail-icon"/>
                                <span className="user-detail-username">
                                        2001-03-21
                                </span>
                            </div>                  
                            <div className="user-detail-title">
                                Contact details
                            </div>
                            <div className="user-detail-desc">
                                <PhoneAndroid className="user-detail-icon"/>
                                <span className="user-detail-username">
                                    +84 98 995 1609
                                </span>
                            </div>
                            <div className="user-detail-desc">
                                <MailOutline className="user-detail-icon"/>
                                <span className="user-detail-username">
                                    {user.email}
                                </span>
                            </div>
                            <div className="user-detail-desc">
                                <LocationSearching className="user-detail-icon"/>
                                <span className="user-detail-username">
                                    Ninh Thuan | Viet Nam
                                </span>
                            </div>                                                
                        </div>
                    </div>
                    <div className="user-update">
                        <h3 className="user-update-title">
                            EDIT
                        </h3>
                        <div className="user-update-container">
                            <div className="user-update-form">
                                <div className="user-field-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" name="username" placeholder="vinhtran1" onChange={handleChangeInput}/>
                                </div>
                                <div className="user-field-group">
                                    <label htmlFor="fullname">Fullname</label>
                                    <input type="text" id="fullname" name="fullname" placeholder="Tran Vinh" onChange={handleChangeUsername}/>
                                </div>
                                <div className="user-field-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email" name="email" placeholder="vinhtran.vicidev@gmail.com" onChange={handleChangeInput}/>
                                </div>
                                <div className="user-field-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" id="phone" name="phone" placeholder="+ 98 995 1609" onChange={handleChangeInput}/>
                                </div>
                                <div className="user-field-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" id="address" name="address" placeholder="Ninh Thuan | Viet Nam" onChange={handleChangeInput}/>
                                </div>
                            </div>
                            <div className="user-update-right">
                                <div className="user-update-content">
                                    <img
                                        src={file && file.preview  || ""}
                                        alt="Avatar"
                                        className="user-update-avatar"
                                    />
                                    <div className="user-update-upload">
                                        <label htmlFor="uploadfile"><Publish/></label>
                                        <input type="file" name="uploadfile" id="uploadfile" style={{display:"none"}}  onChange={handleChangeFile}/>
                                    </div>
                                </div>
                                <button className="user-update-button" onClick={handleClickUpdate}>
                                    Update
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
    );
};

export default User;