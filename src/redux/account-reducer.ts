import * as axios from "axios";

const USER_LOGIN = 'USER_LOGIN';
const GET_USER = 'GET_USER';
const SHOW_LOADING = 'SHOW_LOADING';
const LOGIN_LOADING = 'LOGIN_LOADING';

let initialState: any = {
    // @ts-ignore
    isAuth: localStorage.getItem('isAuth') || false,
    isLoading: false,
    isLoginLoading: false,
};

const accountReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
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
export const getUser = () => ({type: GET_USER});
export const showLoading = (isLoading: boolean) => ({type: SHOW_LOADING, isLoading});
export const loginLoading = (isLoading: boolean) => ({type: LOGIN_LOADING, isLoading});


export const userLoginThunkCreator = (email: string, password: string) => async (dispatch: any) => {
    dispatch(loginLoading(true));
    // @ts-ignore
    const response = await axios.post('https://analyzerserver.herokuapp.com/api/user/login', {email, password}, {
        withCredentials: true
    });
    dispatch(loginLoading(false));

    if (response) {
        dispatch(userLogin(true));
    }
};

export const userRegisterThunkCreator = (name: string, email: string, password: string) => async (dispatch: any) => {
    // @ts-ignore
    const response = await axios.post('https://analyzerserver.herokuapp.com/api/user/register', {name, email, password}, {
        withCredentials: true
    });
    if (response) {
        dispatch(userLogin(false));
    }
};

export const userLogoutThunkCreator = () => async (dispatch: any) => {
    // @ts-ignore
    const response = await axios.post('https://analyzerserver.herokuapp.com/api/user/logout', null, {
        withCredentials: true
    });
    if (response) {
        dispatch(userLogin(false));
    }
};

export default accountReducer;