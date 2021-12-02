import { Assessment, AssessmentOutlined, AttachMoney, DynamicFeed, Forum, LineStyle, LocalMall, LocalPostOffice, MailOutlineOutlined, ModeCommentOutlined, PermIdentity, PollOutlined, StorefrontOutlined, Timeline, TrendingUp } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_wrapper">
               <div className="sidebar-menu">
                   <div className="sidebar-title">Dashboard</div>
                        <ul className="sidebar-list">
                            <Link to="/">
                                <li className="sidebar-item">
                                        <LineStyle/>
                                    Home
                                </li>
                            </Link>
                            <li className="sidebar-item">
                                <Timeline/>
                                Analytis
                            </li>
                            <li className="sidebar-item">
                                <TrendingUp/>
                                Sales
                            </li>
                        </ul>
                </div>
                <div className="sidebar-menu">
                   <div className="sidebar-title">Quick menu</div>
                        <ul className="sidebar-list">
                            <Link to="/users">
                                <li className="sidebar-item">
                                        <PermIdentity/>
                                        User
                                </li>
                            </Link>
                          <Link to="/products">
                                <li className="sidebar-item">
                                    <StorefrontOutlined/>
                                    Products
                                </li>
                          </Link>
                            <li className="sidebar-item">
                                <AttachMoney/>
                                Transactions
                            </li>
                            <li className="sidebar-item">
                                <AssessmentOutlined/>
                                Reports
                            </li>
                        </ul>
                </div>
                <div className="sidebar-menu">
                   <div className="sidebar-title">Notification</div>
                        <ul className="sidebar-list">
                            <li className="sidebar-item">
                                <MailOutlineOutlined/>
                                Mail
                            </li>
                            <li className="sidebar-item">
                                <DynamicFeed/>
                                Feedback
                            </li>
                            <li className="sidebar-item">
                                <ModeCommentOutlined/>
                                Messages
                            </li>
                        </ul>
                </div>
                <div className="sidebar-menu">
                   <div className="sidebar-title">Staff</div>
                        <ul className="sidebar-list">
                            <li className="sidebar-item">
                                <LineStyle/>
                                Manage
                            </li>
                            <li className="sidebar-item">
                                <PollOutlined/>
                                Analytis
                            </li>
                            <li className="sidebar-item">
                                <AssessmentOutlined/>
                                Reports
                            </li>          
                        </ul>
                </div>
            </div>
            
        </div>
    );
};

export default Sidebar;