import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { adminRequest } from '../../methodRequest';
import './FeaturedInfo.css'

const FeaturedInfo = () => {
    const [orderStats, setOrderStats] = useState([]);
    const calcOrderStats = orderStats[1]?.total / orderStats[0]?.total;

    useEffect(() => {
        const getOrderStats = async () => {
            try {
                const res = await adminRequest.get("/order/stats");
                setOrderStats(res.data);
            } catch {}
        }
        getOrderStats();
    }, [])
    return (
        <div className="featured">
            <div className="featured-item">
                <span className="featured-title">
                    Revanue
                </span>
                <div className="featured-container">
                    <span className="featured-money">$ {orderStats[1]?.total ?  orderStats[1]?.total - orderStats[0]?.total : "0"}</span>
                    <span className="featured-money-rate">-11.4 
                    {calcOrderStats > 1 ? 
                    <ArrowUpwardOutlined className="featured-icon"/>
                    :
                    <ArrowDownwardOutlined className={`featured-icon navigate `}/>
                    }
                    </span>
                </div>
                <div className="featured-sub">
                    Compared to last month
                </div>
            </div>
            <div className="featured-item">
                <span className="featured-title">
                    Sales
                </span>
                <div className="featured-container">
                    <span className="featured-money">$2.225</span>
                    <span className="featured-money-rate">+1.4 <ArrowUpwardOutlined className="featured-icon"/></span>
                </div>
                <div className="featured-sub">
                    Compared to last month
                </div>
            </div>
            <div className="featured-item">
                <span className="featured-title">
                    Const
                </span>
                <div className="featured-container">
                    <span className="featured-money">$2.143</span>
                    <span className="featured-money-rate">+2.4 <ArrowUpwardOutlined className="featured-icon"/></span>
                </div>
                <div className="featured-sub">
                    Compared to last month
                </div>
            </div>
        </div>
    );
};

export default FeaturedInfo;