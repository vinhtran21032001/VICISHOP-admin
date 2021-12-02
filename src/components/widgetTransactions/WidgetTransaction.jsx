import React, { useEffect, useState } from 'react';
import { adminRequest } from '../../methodRequest';
import './widgetTransactions.css'
import {format} from 'timeago.js';

// English.

const WidgetTransaction = () => {

    const [order, setOrder] = useState([]);

    useEffect(()=> {
        const getOrder = async () => {
            try {
                const res = await adminRequest.get('order');
                setOrder(res.data);
            }
            catch{}
        }
        getOrder();
    }, [])
    return (
        <div className="widget-transaction">
            <h3 className="widget-transaction-title">Lastest transactions</h3>
            <table className="widget-transaction-table">
                <tr className="widget-transaction-tr">
                    <th className="widget-transaction-th">Customer</th>
                    <th className="widget-transaction-th">Date</th>
                    <th className="widget-transaction-th">Amount</th>
                    <th className="widget-transaction-th">Status</th>
                </tr>
                    {order.slice(0,7).map(item=>(
                    <tr className="widget-transaction-user-info">
                    
                         <td className="widget-transaction-user" key={item.id}>
                         <img src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/245644941_1283167755466710_9204084801773221917_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=A0DykAPulfIAX8TbA38&_nc_ht=scontent.fdad3-1.fna&oh=357b969a946c0d93cda73e648386c70d&oe=61A26686" 
                         alt="Avatar" 
                         className="widget-transaction-user-avatar"
                         />
                         <span className="widget-transaction-username">{item.userID}</span>
                     </td>
                    <td className="widget-transaction-date">
                        {format(item.createdAt)}
                    </td>
                    <td className="widget-transaction-amout">
                        $ {item.amount}
                    </td>
                    <td className="widget-transaction-amout">
                        <button className={`widget-transaction-button ${item.status}`} >{item.status}</button>
                    </td>
                </tr>
                 ))}
            </table>
        </div>
    );
};

export default WidgetTransaction;