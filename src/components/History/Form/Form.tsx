import React, {useEffect, useState} from "react";
import './form.scss';
import save from './../../../assets/images/save.svg';
import {NavLink} from "react-router-dom";
import FormElement from "./FormElement/FormElement";

interface Props {
    categories: any,
    showForm: boolean,
    currentPage: number,
    getCategoriesThunkCreator(): void,
    addExpenseThunkCreator<T extends object>(expense: T): void,
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
                    <FormElement title={'Name'}>
                        <input type="text" autoFocus={true} className={!error ? 'name' : 'name name--error'} id={'name'} value={name}
                               onChange={e => {
                                   setName(e.target.value);
                                   setError(false);
                               }}/>
                    </FormElement>
                    <FormElement title={'Category'}>
                        {props.categories.length ? <select value={category} onChange={(e) => setCategory(e.target.value)} name="category"
                                                           id="category">
                            {props.categories.map((item: any) => <option key={item.name}
                                                                         value={item.name}>{item.name}</option>)}
                        </select> : <NavLink to={'settings'}>Set your categories</NavLink>}
                    </FormElement>
                    <FormElement title={'Count'}>
                        <input type="number" id={'count'} value={count} min={0}
                               onChange={(e) => setCount(parseInt(e.target.value))}/>
                    </FormElement>
                    <FormElement title={'Price'}>
                        <input type="number" id={'price'} value={price} min={0}
                               onChange={(e) => setPrice(parseInt(e.target.value))}/>
                    </FormElement>

                    <button className={'button button--addItem'} onClick={onAddExpenseButton}>
                        <img src={save} alt=""/>
                    </button>
                </div>

            </> : null}</>
    )
};


export default React.memo(Form);