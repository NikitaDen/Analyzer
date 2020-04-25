import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    getUser,
    userLoginThunkCreator,
    userLogoutThunkCreator,
    userRegisterThunkCreator
} from "../../redux/account-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import './login.scss';
import loading from './../../assets/images/loading-1.svg';
import Loader from "../Loader/Loader";

const Login = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        props.getUser();
    }, []);


    if (!props.isAuth) {
        return (
            <>
                {
                    props.isLoginLoading ? <Loader/> : <div className={'login'}>
                        <h3>Login</h3>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div>
                            <button className={'button'} onClick={() => props.userLoginThunkCreator(email, password)}>Login</button>
                            or
                            <button className={'button'} onClick={() => props.history.push('register')}>Register</button>
                        </div>
                    </div>
                }
            </>
        )
    }

    return <Redirect to={'/history'}/>

};

const mapStateToProps = (store: any) => ({
    isAuth: store.account.isAuth,
    isLoading: store.account.isLoading,
    isLoginLoading: store.account.isLoginLoading,
});

export default compose(
    connect(mapStateToProps, {
        userLoginThunkCreator, userLogoutThunkCreator,
        userRegisterThunkCreator, getUser
    }),
    withRouter
)(Login);