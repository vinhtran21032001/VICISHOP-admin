import React, { useEffect, useState } from 'react';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featureInfo/FeaturedInfo';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import { userDate } from '../../dummy';
import WidgetUser from '../../components/widgetUsers/WidgetUser';
import WidgetTransaction from '../../components/widgetTransactions/WidgetTransaction';
import { adminRequest } from '../../methodRequest';

const Home = () => {

    const [userStats, setUserStats] = useState([]);

    const MONTH = [
        "Jan",
        "Feb",
        "Mar",
        "Apl",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
    console.log(userStats)
    useEffect(()=> {
        const getUserStats = async () => {
            try {
                const res = await adminRequest.get('/user/stats');
                setUserStats(res.data.map(item => (
                    {
                        name:MONTH[item._id -1] ,
                        "Active User" : item.total,
                    }
                ))   
                )
            }
            catch{}
        }
        getUserStats();
    },[])

    return (
        <div className="container">
            <FeaturedInfo/>
            <Chart data={userStats} title="User analytis" dataKey="Active User"/>
            <div className="home-widgets">
                <WidgetUser/>
                <WidgetTransaction/>
            </div>
        </div>
    );
};

export default Home;