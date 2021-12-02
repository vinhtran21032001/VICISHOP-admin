import React from 'react';
import './navbar.css'
import {Language, NotificationsNone, Settings} from '@material-ui/icons'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar_wrapper">
                <div className="navbar_left">
                    <div className="navbar_logo">
                        VICIADMIN
                    </div>
                </div>
                <div className="navbar_right">
                    <div className="navbar_right-container">
                        <div className="navbar_icon">
                            <NotificationsNone/>
                            <span className="navbar_icon-badge">
                                3
                            </span>
                        </div>
                        <div className="navbar_icon">
                            <Language/>
                            <span className="navbar_icon-badge">
                                2
                            </span>
                        </div>
                        <div className="navbar_icon">
                            <Settings/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;