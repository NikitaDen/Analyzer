import React from "react";
import separator from './../../../../assets/images/separator.svg';

interface Props {
    title: string
}

const TableItem: React.FC<Props> = (props) => <div className={'table__header__item'}>
    <img src={separator} alt="|"/>
    <p>{props.title}</p>
</div>;

export default TableItem;