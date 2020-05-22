import React from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    sort: string,
    sortValues: Array<string>,
    setSort(value: string): void,
}

const ItemSort: React.FC<Props> = (props) => {

    return (
        <div className={'filter__item filter__item--sort'}>
            <label htmlFor="sort">Sort</label>
            <select value={props.sort} onChange={(e) => props.setSort(e.target.value)} name="filter"
                    id="sort">
                {props.sortValues.map((item: string) => <option key={item} value={item}>{item}</option>)}
            </select>
        </div>
    )
};

export default ItemSort;