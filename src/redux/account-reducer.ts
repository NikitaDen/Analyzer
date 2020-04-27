import * as axios from "axios";

import {authAPI} from "../api/api";
import {getExpenses} from "./history-reducer";

const USER_LOGIN = 'USER_LOGIN';
const GET_USER = 'GET_USER';
const SHOW_LOADING = 'SHOW_LOADING';
const LOGIN_LOADING = 'LOGIN_LOADING';
const INFO = 'INFO';

let initialState: any = {
    // @ts-ignore
    isAuth: localStorage.getItem('isAuth') || false,
    isLoading: false,
    isLoginLoading: false,
    infoF: '',
};

const accountReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case INFO:
            return {
                ...state,
                infoF: action.infoF,
            };
        case LOGIN_LOADING:
            return {
                ...state,
                isLoginLoading: action.isLoading,
            };
        case USER_LOGIN: {
            // @ts-ignore
            localStorage.setItem('isAuth', JSON.stringify(action.isAuth));
            return {...state, isAuth: action.isAuth};
        }
        case GET_USER: {
            // @ts-ignore
            const isAuth = JSON.parse(localStorage.getItem('isAuth')) || false;
            return {...state, isAuth};
        }
        default:
            return state;
    }
};

export const userLogin = (isAuth: boolean) => ({type: USER_LOGIN, isAuth});
export const setInfo = (infoF: any) => ({type: INFO, infoF});
export const getUser = () => ({type: GET_USER});
export const showLoading = (isLoading: boolean) => ({type: SHOW_LOADING, isLoading});
export const loginLoading = (isLoading: boolean) => ({type: LOGIN_LOADING, isLoading});


export const userLoginThunkCreator = (email: string, password: string) => async (dispatch: any) => {
    dispatch(loginLoading(true));

    try {
        // @ts-ignore
        const response = await axios.post('https://analyzerserver.herokuapp.com/api/user/login', {email, password});
        if (response.data) {
            localStorage.setItem('token', response.data);
            dispatch(loginLoading(false));
            dispatch(userLogin(true));
        }
    } catch (e) {
        dispatch(loginLoading(false));
        dispatch(userLogin(false));
        console.log(e.response.data);
    }
};

export const userRegisterThunkCreator = (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
        const response = await authAPI.register(name, email, password);
        if (response.data) {
            dispatch(userLogin(false));
        }
    } catch (e) {
        console.log(e.response.data);
    }
};

export const userLogoutThunkCreator = () => async (dispatch: any) => {
    dispatch(userLogin(false));
    dispatch(getExpenses([]));
    localStorage.setItem('token', '');

    try {
        await authAPI.logout();
    } catch (e) {
        console.log(e.response.data)
    }
};

export default accountReducer;