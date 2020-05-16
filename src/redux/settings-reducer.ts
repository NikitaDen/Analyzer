import {baseURL, refreshToken, settingsAPI} from "../api/api";
import axios from "axios";
import {showLoading} from "./account-reducer";
import {actionCreator} from "./interfaces";

const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const GET_CATEGORIES = 'GET_CATEGORIES';

let initialState: any = {
    categories: []
};

const settingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_CATEGORIES: {
            return {
                ...state,
                categories: action.categories
            };
        }
        case ADD_CATEGORY: {
            return {
                ...state,
                categories: [
                    ...state.categories,
                    {
                        name: action.name,
                        id: action.id,
                    }
                ]
            };
        }
        case DELETE_CATEGORY: {
            return {
                ...state,
                categories: [
                    ...state.categories.filter((item: any) => item.id !== action.id)
                ]
            };
        }
        default:
            return state;
    }
};

export const addCategory = (name: string, id: any): actionCreator => ({type: ADD_CATEGORY, name, id});
export const addCategoriesThunkCreator = (name: string, id: any) => async (dispatch: any) => {
    dispatch(showLoading(true));
    try {
        dispatch(addCategory(name, id));

        await settingsAPI.addCategory(name, id);
        dispatch(showLoading(false));
    } catch (e) {
        await refreshToken('/settings/categories', {name, id}, axios.post, dispatch);
    }
};

export const getCategories = (categories: any): actionCreator => ({type: GET_CATEGORIES, categories});
export const getCategoriesThunkCreator = () => async (dispatch: any) => {
    try {
        const response = await axios.get(`${baseURL}/settings/categories`, {
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        });

        dispatch(getCategories(response.data));
    } catch (e) {
        await refreshToken('/settings/categories', null, axios.get, dispatch, getCategories);
    }
};

export const deleteCategory = (id: string): actionCreator => ({type: DELETE_CATEGORY, id});
export const deleteCategoryThunkCreator = (id: any) => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        debugger
        dispatch(deleteCategory(id));

        await settingsAPI.deleteExpense(id);

        dispatch(showLoading(false));
    } catch (e) {
        await refreshToken('/settings/delete', {id}, axios.put, dispatch);
    }
};

export default settingsReducer;