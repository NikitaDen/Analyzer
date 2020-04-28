import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    getUser,
    userLoginThunkCreator,
    userLogoutThunkCreator,
    userRegisterThunkCreator
} from "../../redux/account-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import './../Login/login.scss';
import Loader from "../Loader/Loader";

const Register = (props: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        props.getUser();
    }, []);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if (props.info === 'ok') {
            props.history.push('login');
        }

    }, [props.info]);

    return (
        <>
            {props.isLoginLoading ? <Loader/> : <form className={'login'}>
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
                        // props.history.push('login');
                    }}>Register
                    </button>
                </div>
                <p className={'error-message'}>{props.info}</p>
            </form>
            }
        </>
    )
};

const mapStateToProps = (store: any) => ({
    isAuth: store.account.isAuth,
    info: store.account.info,
    isLoading: store.account.isLoading,
    isLoginLoading: store.account.isLoginLoading,

});

export default compose(
    connect(mapStateToProps, {
        userLoginThunkCreator, userLogoutThunkCreator,
        userRegisterThunkCreator, getUser
    }),
    withRouter
)(Register);