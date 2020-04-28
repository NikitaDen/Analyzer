import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    addExpenseThunkCreator,
    changeExpense,
    getExpensesThunkCreator,
} from "../../../redux/history-reducer";
import './form.scss';
import save from './../../../assets/images/save.svg';
import {getCategoriesThunkCreator} from "../../../redux/settings-reducer";
import {NavLink} from "react-router-dom";

interface Props {
    categories: any,
    showForm: boolean,
    currentPage: number,
    getExpensesThunkCreator(page: number): void,
    getCategoriesThunkCreator(): void,
    addExpenseThunkCreator(expense: any): void,
}

const Form: React.FC<Props> = (props) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(1);
    const [error, setError] = useState(false);

    useEffect(() => {
        props.getCategoriesThunkCreator();
    }, []);

    useEffect(() => {
        if (props.categories.length) {
            setCategory(props.categories[0].name)
        }
    }, [props.categories]);

    const onAddExpenseButton = () => {
        if (name.replace(/\s+/g, '')) {
            props.addExpenseThunkCreator({category, count, name, price, spent: price * count, id: Date.now()});
            setName('');
            setCount(1);
            setPrice(0);
        } else {
            setError(true);
        }
    };

    return (
        <>
            {props.showForm ? <>
                <div className={'form'}>
                    <div className={'form__element'}>
                        <label htmlFor="name">Name</label>
                        <input type="text" autoFocus={true} className={!error ? 'name' : 'name name--error'} id={'name'} value={name}
                               onChange={e => {
                                   setName(e.target.value);
                                   setError(false);
                               }}/>
                    </div>
                    <div className={'form__element'}>
                        <label htmlFor="category">Category</label>
                        {props.categories.length ? <select value={category} onChange={(e) => setCategory(e.target.value)} name="category"
                                                           id="category">
                            {props.categories.map((item: any) => <option key={item.name}
                                                                         value={item.name}>{item.name}</option>)}
                        </select> : <NavLink to={'settings'}>Set your categories</NavLink>}

                    </div>
                    <div className={'form__element'}>
                        <label htmlFor="count">Count</label>
                        <input type="number" id={'count'} value={count} min={0}
                               onChange={(e) => setCount(parseInt(e.target.value))}/>
                    </div>
                    <div className={'form__element'}>
                        <label htmlFor="price">Price</label>
                        <input type="number" id={'price'} value={price} min={0}
                               onChange={(e) => setPrice(parseInt(e.target.value))}/>
                    </div>

                    <button className={'button button--addItem'} onClick={onAddExpenseButton}>
                        <img src={save} alt=""/>
                    </button>
                </div>

            </> : null}</>
    )
};

let mapStateToProps = (store: any) => ({
    expenses: store.history.expenses,
    categories: store.settings.categories,
});

export default connect(mapStateToProps, {changeExpense, getExpensesThunkCreator, addExpenseThunkCreator, getCategoriesThunkCreator})(Form);