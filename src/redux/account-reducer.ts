import * as axios from "axios";

const USER_LOGIN = 'USER_LOGIN';
const GET_USER = 'GET_USER';

let initialState: any = {
    // @ts-ignore
    isAuth: localStorage.getItem('isAuth') || false,
};

const accountReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_LOGIN: {
            // @ts-ignore
            localStorage.setItem('isAuth', JSON.stringify(action.isAuth));
            return {...state, isAuth: action.isAuth};
        }
        // return {...state, isAuth: action.isAuth};
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

export const userLoginThunkCreator = (email: string, password: string) => async (dispatch: any) => {
    // @ts-ignore
    const response = await axios.post('https://analyzerserver.herokuapp.com/api/user/login', {email, password}, {
        withCredentials: true
    });
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