import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {addExpense, changeExpense, getExpenses, setExpenses} from "../../../redux/history-reducer";
import './form.scss';
import save from './../../../assets/images/save.svg';

interface Props {
    categories: any,
    showForm: boolean,

    getExpenses(): void
}

const Form: React.FC<Props> = (props) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Products');
    const [price, setPrice] = useState('0');
    const [count, setCount] = useState('1');
    const [error, setError] = useState(false);

    useEffect(() => {
        props.getExpenses();
    }, []);

    const onAddExpenseButton = () => {
        if (name) {
            // @ts-ignore
            props.addExpense({category, count, name, price, spent: price * count});
            // @ts-ignore
            props.setExpenses();
            setName('');
            setCategory('Products');
            setCount('1');
            setPrice('0');
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
                        <input type="text" className={!error ? 'name' : 'name name--error'} id={'name'} value={name}
                               onChange={e => {
                                   setName(e.target.value);
                                   setError(false);
                               }}/>
                    </div>
                    <div className={'form__element'}>
                        <label htmlFor="category">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} name="category"
                                id="category">
                            {props.categories.map((item: any) => <option key={item.name}
                                                                         value={item.name}>{item.name}</option>)}
                        </select>
                    </div>
                    <div className={'form__element'}>
                        <label htmlFor="count">Count</label>
                        <input type="number" id={'count'} value={count} min={0}
                               onChange={(e) => setCount(e.target.value)}/>
                    </div>
                    <div className={'form__element'}>
                        <label htmlFor="price">Price</label>
                        <input type="number" id={'price'} value={price} min={0}
                               onChange={(e) => setPrice(e.target.value)}/>
                    </div>

                    <button className={'button button--addItem'} onClick={onAddExpenseButton}>
                        <img src={save} alt=""/>
                        <p>Save item</p>
                    </button>
                </div>

            </> : null}</>
    )
};

let mapStateToProps = (store: any) => ({
    expenses: store.history.expenses,
    categories: store.settings.categories,
});

export default connect(mapStateToProps, {addExpense, setExpenses, getExpenses, changeExpense})(Form);