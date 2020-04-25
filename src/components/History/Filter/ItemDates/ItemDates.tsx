import React, {useEffect, useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        if (filter) {
            props.setFilterInRange(true);
        } else {
            props.setFilterInRange(false)
        }
    }, [filter]);

    const onToggleFilter = () => {
        setFilter(!filter);
    };

    return (
        <div className={'filter__item filter__item--dates'}>
            <label htmlFor="sort">Dates</label>

            <div className={'dates'}>
                <div className={'dates__element'}>
                    <p>From:</p>
                    <DatePicker maxDate={props.dateHigher} onChange={props.onChangeDateLower} selected={props.dateLower}/>
                </div>
                <div className={'dates__element'}>
                    <p>To:</p>
                    <DatePicker minDate={props.dateLower} disabled={props.dateLower > props.dateHigher}
                                onChange={props.onChangeDateHigher} selected={props.dateHigher}/>
                </div>
            </div>


            <input onChange={onToggleFilter} id='dark-check' type="checkbox"/>
            <label className='dark-mode' htmlFor="dark-check">
                <div className='toggle'
                     style={filter ? {backgroundImage: `url(${clear})`, backgroundColor: '#FF7777'} : {backgroundImage: `url(${search})`}}/>
            </label>
        </div>
    )
};

export default ItemDates;