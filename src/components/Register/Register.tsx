import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getUser, userRegisterThunkCreator} from "../../redux/account-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import './../Login/login.scss';
import Loader from "../Loader/Loader";
import {infoSelector, isLoginLoadingSelector} from "../../selectors/account-selectors";
import Intro from "../Intro/Intro";

type Props = {
    isLoginLoading: boolean,
    info: string,
    userRegisterThunkCreator: (name: string, email: string, password: string) => void,
    getUser: () => void,
    history: Array<string>
}

const Register: React.FC<Props> = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        props.getUser();
    }, []);

    useEffect(() => {
        if (props.info === 'ok') {
            props.history.push('login');
        }
    }, [props.info]);

    const registrationHandler = () => {
        props.userRegisterThunkCreator(name, email, password);
    };

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
                    <button className={'button'} onClick={registrationHandler}>Register</button>
                </div>
                <p className={'error-message'}>{props.info !== 'ok' && props.info}</p>
            </form>
            }
            <Intro/>
        </>
    )
};

const mapStateToProps = (store: any) => ({
    isLoginLoading: isLoginLoadingSelector(store),
    info: infoSelector(store),
});

export default compose(
    connect(mapStateToProps, {userRegisterThunkCreator, getUser}),
    withRouter
)(Register);