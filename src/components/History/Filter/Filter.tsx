import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import './filter.scss';
import ItemDates from "./ItemDates/ItemDates";
import ItemFilter from "./ItemFilter/ItemFilter";
import ItemSort from "./ItemSort/ItemSort";
import ItemDirection from "./ItemDirection/ItemDirection";

interface Props {
    filter: string,
    categories: any,
    sort: string,
    filterInRange: boolean,
    sortValues: Array<string>,
    descending: string,
    dateHigher: number,
    dateLower: number,

    setFilter(value: string): void,

    setSort(value: string): void,

    setDescending(value: string): void,

    onChangeDateLower(date: Date): void,

    onChangeDateHigher(date: Date): void,

    setFilterInRange(filter: boolean): void,
}

const Filter: React.FC<Props> = (props) => {

    return (
        <div className={'filter'}>
            <ItemFilter filter={props.filter} categories={props.categories} setFilter={props.setFilter}
                        setSort={props.setSort} setDescending={props.setDescending}/>

            <ItemSort sort={props.sort} sortValues={props.sortValues} setSort={props.setSort}/>

            <ItemDirection descending={props.descending} setDescending={props.setDescending}/>

            <ItemDates filterInRange={props.filterInRange} dateHigher={new Date(props.dateHigher)} dateLower={new Date(props.dateLower)}
                       onChangeDateLower={props.onChangeDateLower} onChangeDateHigher={props.onChangeDateHigher}
                       setFilterInRange={props.setFilterInRange}/>
        </div>
    )
};

export default Filter;