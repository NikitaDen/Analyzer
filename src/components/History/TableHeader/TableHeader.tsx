import React from "react";
import '../history.scss';
import separator from './../../../assets/images/separator.svg';

interface Props {
    checkedAll: boolean,
    chooseAllItems(): void
}

const TableHeader: React.FC<Props> = (props) => {

    return (
        <div className={'table__header'}>
            <div className={'checkbox-element'}>
                <input checked={props.checkedAll} onChange={props.chooseAllItems} type="checkbox"/>
                <label>
                    <div className={'checked'}/>
                </label>
            </div>

            <div className={'table__header__item'}>
                <img src={separator} alt=""/>
                <p>Name</p>
            </div>
            <div className={'table__header__item'}>
                <img src={separator} alt=""/>
                <p>Category</p>
            </div>
            <div className={'table__header__item'}>
                <img src={separator} alt=""/>
                <p>Price</p>
            </div>
            <div className={'table__header__item'}>
                <img src={separator} alt=""/>
                <p>Count</p>
            </div>
            <div className={'table__header__item'}>
                <img src={separator} alt=""/>
                <p>Spent</p>
            </div>
            <div className={'table__header__item'}>
                <img src={separator} alt=""/>
                <p>Date</p>
            </div>
        </div>
    )
};

export default React.memo(TableHeader);