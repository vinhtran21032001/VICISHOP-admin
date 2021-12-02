import React from 'react';
import './chart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = (props) => {
    const {data, title, dataKey} = props;
    return (
        <div className="chart-container">
            <h3 className="chart-title">{title}</h3>
            <ResponsiveContainer  width="100%" aspect={4 / 1}>
                <LineChart data={data} >
                    <XAxis dataKey="name" stroke="#8884d8"/>
                    <Line type="monotone" dataKey={dataKey} stroke="#8884d8"/>
                    <Tooltip />
                    <CartesianGrid strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;