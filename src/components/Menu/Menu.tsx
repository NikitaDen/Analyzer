import React from "react";
import {NavLink} from "react-router-dom";
import './menu.scss';
import history from './../../assets/images/history.svg';
import analytics from './../../assets/images/analytics.svg';
import settings from './../../assets/images/settings.svg';
import {connect} from "react-redux";
import {userLogoutThunkCreator} from "../../redux/account-reducer";
import Button from "../Button/Button";
import logout from './../../assets/images/logout.svg';
import {isAuthSelector} from "../../selectors/account-selectors";

const Menu = (props: any) => {
    return (
        <nav>
            <NavLink className={'logo'} to={'/history'}>
                <p>Analyzer</p>
            </NavLink>
            <div className={'menu'}>
                <NavLink className={'menu__item'} to={'/history'}>
                    <p>History</p>
                    <img src={history} alt=""/>
                </NavLink>
                <NavLink className={'menu__item'} to={'/analytics'}>
                    <p>Analytics</p>
                    <img src={analytics} alt=""/>
                </NavLink>
                <NavLink className={'menu__item'} to={'/settings'}>
                    <p>Settings</p>
                    <img src={settings} alt=""/>
                </NavLink>
            </div>
            <div className={'login-buttons'}>
                {props.isAuth ? <>
                    <Button image={logout} className={'button button--logout'}
                            func={() => props.userLogoutThunkCreator()} title={''}/>
                </> : null}
            </div>
        </nav>
    )
};

const mapStateToProps = (store: any) => ({
    isAuth: isAuthSelector(store),
});

export default connect(mapStateToProps, {userLogoutThunkCreator})(Menu);