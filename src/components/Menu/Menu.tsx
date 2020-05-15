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
            <div className={'login-buttons'}>
                {props.isAuth ? <>
                    <Button image={logout} className={'button button--logout'}
                            func={() => props.userLogoutThunkCreator()} title={'Logout'}/>
                </> : null}
            </div>
        </nav>
    )
};

const mapStateToProps = (store: any) => ({
    isAuth: isAuthSelector(store),
});

export default connect(mapStateToProps, {userLogoutThunkCreator})(Menu);