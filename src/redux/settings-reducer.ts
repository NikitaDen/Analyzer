import {baseURL, refreshToken, settingsAPI} from "../api/api";
import axios from "axios";
import {showLoading} from "./account-reducer";
import {ActionCreator} from "./interfaces";
import {Dispatch} from "redux";

const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const GET_CATEGORIES = 'GET_CATEGORIES';

export type CategoryType = {
    name: string,
    id: number
}

let initialState: any = {
    categories: []
};

const settingsReducer = (state = initialState, action: ActionCreator<string>) => {
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

export const addCategory = (name: string, id: number): ActionCreator<typeof ADD_CATEGORY> => ({type: ADD_CATEGORY, name, id});
export const addCategoriesThunkCreator = (name: string, id: number) => async (dispatch: Dispatch) => {
    dispatch(showLoading(true));
    try {
        dispatch(addCategory(name, id));

        await settingsAPI.addCategory(name, id);
        dispatch(showLoading(false));
    } catch (e) {
        await refreshToken('/settings/categories', {name, id}, axios.post, dispatch);
    }
};



export const getCategories = (categories: Array<CategoryType>): ActionCreator<typeof GET_CATEGORIES> => ({type: GET_CATEGORIES, categories});
export const getCategoriesThunkCreator = () => async (dispatch: Dispatch) => {
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

export const deleteCategory = (id: number): ActionCreator<typeof DELETE_CATEGORY> => ({type: DELETE_CATEGORY, id});
export const deleteCategoryThunkCreator = (id: number) => async (dispatch: Dispatch) => {
    dispatch(showLoading(true));

    try {
        dispatch(deleteCategory(id));

        await settingsAPI.deleteExpense(id);

        dispatch(showLoading(false));
    } catch (e) {
        await refreshToken('/settings/delete', {id}, axios.put, dispatch);
    }
};

export default settingsReducer;