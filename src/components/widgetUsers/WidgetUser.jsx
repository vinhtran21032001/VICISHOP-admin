import React, { useEffect, useState } from 'react';
import './widgetUser.css'
import {SettingsBluetoothSharp, VisibilityOutlined} from '@material-ui/icons'
import { adminRequest } from '../../methodRequest';

const WidgetUser = () => {

    const [user,setUser] = useState([]);



    useEffect(()=> {
        const getUser = async () => {
            try {
                const res = await adminRequest.get('/user?new=true')
                setUser(res.data);
            }
            catch {}
        }
        getUser();
    }, [])

    return (
        <div className="widget-user">
            <h3 className="widget-user-title">
                New join Members
            </h3>

            {user.slice(0,7).map(item => (
                <div className="widget-user-item" key={item._id}>
                <img 
                src={user?.img  || "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/245644941_1283167755466710_9204084801773221917_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=A0DykAPulfIAX8TbA38&_nc_ht=scontent.fdad3-1.fna&oh=357b969a946c0d93cda73e648386c70d&oe=61A26686"} 
                alt="Avater" 
                className="widget-user-avatar"
                />
                <div className="widget-user-info">
                    <span className="widget-username">{item.name  + " " + item.lastname}</span>
                    <span className="widget-desc">{item.email}</span>
                </div>
                <button className="widget-user-button">
                    <VisibilityOutlined className="widget-user-icon"/>
                    <span>Display</span>
                </button>
            </div>

            ))}
        </div>
    );
};

export default WidgetUser;