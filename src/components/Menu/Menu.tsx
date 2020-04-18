import React from "react";
import {NavLink} from "react-router-dom";
import './menu.scss';
import history from './../../assets/images/history.svg';
import analytics from './../../assets/images/analytics.svg';
import settings from './../../assets/images/settings.svg';

const Menu = () => {
    return (
        <nav>
            <NavLink to={'/history'}>
                <p>History</p>
                <img src={history} alt=""/>
            </NavLink>
            <NavLink to={'/analytics'}>
                <p>Analytics</p>
                <img src={analytics} alt=""/>
            </NavLink>
            <NavLink to={'/settings'}>
                <p>Settings</p>
                <img src={settings} alt=""/>
            </NavLink>
        </nav>
    )
};

export default Menu;