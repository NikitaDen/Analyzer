import React from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    descending: string,
    setDescending(value: any): void,
}

const ItemDirection: React.FC<Props> = (props) => {

    return (
        <div className={'filter__item filter__item--direction'}>
            <label htmlFor="sort">Direction</label>
            <select value={props.descending} onChange={(e) => props.setDescending(e.target.value)}
                    name="descending">
                <option value="noSort">No sort</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>
        </div>
    )
};

export default ItemDirection;