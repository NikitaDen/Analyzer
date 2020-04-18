import React from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    filter: string,
    categories: any,

    setFilter(value: any): void,

    setSort(value: any): void,

    setDescending(value: any): void,
}

const ItemFilter: React.FC<Props> = (props) => {

    return (
        <div className={'filter__item filter__item--filter'}>
            <label htmlFor="filter">Filter</label>
            <select value={props.filter} onChange={(e) => props.setFilter(e.target.value)} name="filter"
                    id="filter">
                <option value="noFilter">No filter</option>
                {props.categories.map((item: any) => <option key={item.name}
                                                             value={item.name}>{item.name}</option>)}
            </select>
        </div>

    )
};

export default ItemFilter;