import React from "react";
import DatePicker from "react-datepicker";
import Button from "../../Button/Button";
import search from "../../../assets/images/search.svg";
import clear from "../../../assets/images/clear.svg";

interface Props {
    dateHigher: any,
    dateLower: any,
    showForPeriod: boolean,

    setDateLower(date: any): void,

    setDateHigher(date: any): void,

    setShowForPeriod(show: boolean): void,
}

const Period: React.FC<Props> = (props) => {
    const onChangeDateLower = (date: any) => {
        props.setDateLower(date);
    };
    const onChangeDateHigher = (date: any) => {
        props.setDateHigher(date);
    };

    return (
        <div className={'period'}>

            <DatePicker maxDate={props.dateHigher} onChange={onChangeDateLower} selected={props.dateLower}/>
            <DatePicker minDate={props.dateLower} disabled={props.dateLower > props.dateHigher}
                        onChange={onChangeDateHigher} selected={props.dateHigher}/>
            <div className={'buttons'}>
                <Button image={search} func={() => props.setShowForPeriod(true)} className={'button button--search'}
                        title={'Set'} disabled={props.dateLower > props.dateHigher}/>
                <Button image={clear} func={() => props.setShowForPeriod(false)} className={'button button--clear'}
                        title={'Clear'} disabled={props.dateLower > props.dateHigher}/>
            </div>
        </div>
    )
};

export default Period;