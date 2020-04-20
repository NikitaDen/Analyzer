import React, {useState} from "react";

interface Props {
    expenses: any,
    dateLower: any,
    dateHigher: any,
    categories: any,
    title: any,
    showExpensesPerDay: boolean,
    showMoreInfo: boolean,
    moreInfo: any

    findTotalSpending(): number,

    findSpentCategory(): any,

    findBiggerSpent(): any
}

const AnalyticsInfo: React.FC<Props> = (props) => {

    return (
        <div className={'analytics__wrapper'}>
            <h3>{props.title}</h3>

            <div className={'analytics__info'}>
                <div className={'analytics__info__item'}>
                    <h3>Total spent:</h3>
                    {props.findTotalSpending()}
                </div>
                <div className={'analytics__info__item'}>
                    <h3>Most spent for:</h3>
                    {props.findBiggerSpent()}
                </div>
                <div className={'analytics__info__item'}>
                    <h3>Spending by categories:</h3>
                    <div className={'analytics__categories'}>
                        {props.findSpentCategory()}
                    </div>
                </div>

                {props.showMoreInfo ? <div className={'analytics__info__item detail-info'}>
                    <div className={'header'}>
                        <p>Name</p>
                        <p>Category</p>
                        <p>Price</p>
                        <p>Count</p>
                        <p>Spent</p>
                        <p>Date</p>
                    </div>

                    {props.moreInfo.map((item: any) =>
                        <div className={'more-info'}>
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p>{item.count}</p>
                            <p>{item.spent}</p>
                            <p>{item.date}</p>
                        </div>)}
                </div> : null}

                {props.showExpensesPerDay ? <div className={'analytics__info__item'}>
                    <h3>Spending per day:</h3>
                    {props.findTotalSpending() / Math.ceil((props.dateHigher - props.dateLower) / 86400000)}
                </div> : null}

            </div>
        </div>
    )
};


export default AnalyticsInfo;