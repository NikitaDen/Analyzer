import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import search from "../../../assets/images/search.svg";
import clear from "../../../assets/images/clear.svg";

interface Props {
    dateHigher: any,
    dateLower: any,
    showForPeriod: boolean,

    setDateLower(date: any): void,

    setDateHigher(date: any): void,

    setShowForPeriod(show: boolean): void,

    setShowMoreInfo(show: boolean): void
}

const Period: React.FC<Props> = (props) => {
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        onSetPeriod(filter);
    }, [filter]);

    const onChangeDateLower = (date: any) => {
        props.setDateLower(date);
    };
    const onChangeDateHigher = (date: any) => {
        props.setDateHigher(date);
    };
    const onSetPeriod = (showForPeriod: boolean) => {
        props.setShowForPeriod(showForPeriod);
        props.setShowMoreInfo(false);
    };

    const onToggleFilter = () => {
        setFilter(!filter);
    };

    return (
        <div className={'period'}>

            <div className={'dates'}>
                <p>From:</p>
                <DatePicker maxDate={props.dateHigher} onChange={onChangeDateLower} selected={props.dateLower}/>
                <p>To:</p>
                <DatePicker minDate={props.dateLower} disabled={props.dateLower > props.dateHigher}
                            onChange={onChangeDateHigher} selected={props.dateHigher}/>
            </div>

            {/*<DatePicker maxDate={props.dateHigher} onChange={onChangeDateLower} selected={props.dateLower}/>*/}
            {/*<DatePicker minDate={props.dateLower} disabled={props.dateLower > props.dateHigher}*/}
            {/*            onChange={onChangeDateHigher} selected={props.dateHigher}/>*/}

            <input onChange={onToggleFilter} id='dark-check' type="checkbox"/>
            <label className='dark-mode' htmlFor="dark-check">
                <div className='toggle'
                     style={filter ? {backgroundImage: `url(${clear})`, backgroundColor: '#FF7777'} : {backgroundImage: `url(${search})`}}/>
            </label>
        </div>
    )
};

export default Period;