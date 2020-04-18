import React from "react";

interface Props {
    expenses: any,
    dateLower: any,
    dateHigher: any,
    categories: any,
    title: any,
    showExpensesPerDay: boolean,

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
                </div >
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
                {props.showExpensesPerDay ? <div className={'analytics__info__item'}>
                    <h3>Spending per day:</h3>
                    {props.findTotalSpending() / Math.ceil((props.dateHigher - props.dateLower) / 86400000)}
                </div> : null}

            </div>
        </div>
    )
};


export default AnalyticsInfo;