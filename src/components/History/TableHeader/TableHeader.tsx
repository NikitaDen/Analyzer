import React from "react";
import '../history.scss';
import TableItem from "./TableItem/TableItem";

interface Props {
    checkedAll: boolean,
    chooseAllItems(): void
}

const TableHeader: React.FC<Props> = (props) => {
    const tableTitles: Array<string> = ['Name', 'Category', 'Price', 'Count', 'Spent', 'Date'];

    return (
        <div className={'table__header'}>
            <div className={'checkbox-element'}>
                <input checked={props.checkedAll} onChange={props.chooseAllItems} type="checkbox"/>
                <label>
                    <div className={'checked'}/>
                </label>
            </div>

            {tableTitles.map((item: string) => <TableItem key={item} title={item}/>)}
        </div>
    )
};

export default React.memo(TableHeader);