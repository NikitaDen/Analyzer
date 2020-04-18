import React from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../Button/Button";
import search from './../../../../assets/images/search.svg';
import clear from './../../../../assets/images/clear.svg';

interface Props {
    filterInRange: boolean,
    dateHigher: any,
    dateLower: any,

    onChangeDateLower(date: any): void,

    onChangeDateHigher(date: any): void,

    setFilterInRange(filter: boolean): void,
}

const ItemDates: React.FC<Props> = (props) => {

    const onDatesSet = () => {
        props.setFilterInRange(true);
    };
    const onDatesClear = () => {
        props.setFilterInRange(false)
    };

    return (
        <div className={'filter__item filter__item--dates'}>
            <label htmlFor="sort">Dates</label>
            <DatePicker maxDate={props.dateHigher} onChange={props.onChangeDateLower} selected={props.dateLower}/>
            <DatePicker minDate={props.dateLower} disabled={props.dateLower > props.dateHigher}
                        onChange={props.onChangeDateHigher} selected={props.dateHigher}/>

            <div className={'buttons'}>
                <Button image={search} func={onDatesSet} className={'button button--search'} title={'Set'} disabled={props.dateLower > props.dateHigher}/>
                <Button image={clear} func={onDatesClear} className={'button button--clear'} title={'Clear'} disabled={props.dateLower > props.dateHigher}/>
            </div>
        </div>
    )
};

export default ItemDates;