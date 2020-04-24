import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    getUser,
    userLoginThunkCreator,
    userLogoutThunkCreator,
    userRegisterThunkCreator
} from "../../redux/account-reducer";
import {Redirect, withRouter} from "react-router-dom";
// import './registration.scss';
import {compose} from "redux";
import './../Login/login.scss';

const Register = (props: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        props.getUser();
    }, []);

    return (
        <div>
            <div className={'login'}>
                <h3>Registration</h3>
                <label htmlFor="name">Name</label>
                <input id={'name'} type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="name">Email</label>
                <input id={'email'} type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="name">Password</label>
                <input id={'password'} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div>
                    <button className={'button'} onClick={() => {
                        props.userRegisterThunkCreator(name, email, password);
                        props.history.push('login');
                    }}>Register</button>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (store: any) => ({
    isAuth: store.account.isAuth,
});

export default compose(
    connect(mapStateToProps, {
        userLoginThunkCreator, userLogoutThunkCreator,
        userRegisterThunkCreator, getUser
    }),
    withRouter
)(Register);