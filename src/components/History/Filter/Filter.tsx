import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import './filter.scss';
import ItemDates from "./ItemDates/ItemDates";
import ItemFilter from "./ItemFilter/ItemFilter";
import ItemSort from "./ItemSort/ItemSort";

interface Props {
    filter: string,
    categories: any,
    sort: string,
    filterInRange: boolean,
    sortValues: Array<string>,
    descending: string,
    dateHigher: any,
    dateLower: any,

    setFilter(value: any): void,

    setSort(value: any): void,

    setDescending(value: any): void,

    onChangeDateLower(date: any): void,

    onChangeDateHigher(date: any): void,

    setFilterInRange(filter: boolean): void,
}

const Filter: React.FC<Props> = (props) => {

    return (
        <div className={'filter'}>
            <ItemFilter filter={props.filter} categories={props.categories} setFilter={props.setFilter}
                        setSort={props.setSort} setDescending={props.setDescending}/>

            <ItemSort sort={props.sort} sortValues={props.sortValues} descending={props.descending}
                      setSort={props.setSort} setDescending={props.setDescending}/>

            <ItemDates filterInRange={props.filterInRange} dateHigher={props.dateHigher} dateLower={props.dateLower}
                       onChangeDateLower={props.onChangeDateLower} onChangeDateHigher={props.onChangeDateHigher}
                       setFilterInRange={props.setFilterInRange}/>
        </div>
    )
};

export default Filter;