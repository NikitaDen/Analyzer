import React from "react";
import {Bar, Line} from 'react-chartjs-2';
import {CategoryType} from "../../../redux/settings-reducer";
import { Expenses } from "../Analytics";

interface Props {
    dateLower: Date,
    dateHigher: Date,
    categories: Array<CategoryType>,
    title: string,
    showExpensesPerDay: boolean,
    showMoreInfo: boolean,
    moreInfo: any,
    expenses: Array<Expenses>

    findTotalSpending(): number,

    findBiggerSpent(): Array<JSX.Element>,

    chartsFunc(): any,
    lineChart(): any

    showMoreDetailsForCategory(item: string): void
}

const AnalyticsInfo: React.FC<Props> = (props) => {
    const categories = props.chartsFunc();
    const expenses = [...props.expenses];

    const diff = Math.ceil(({...expenses[0]}.id - {...expenses[props.expenses.length - 1]}.id) / 86400000);

    const barData = {
        labels: categories.map((item: any) => item.category),
        datasets: [{
            label: 'Spent',
            data: categories.map((item: any) => item.spent),
            backgroundColor: categories.map((item: any) => `rgba(${0 + item.spent}, ${255 / (item.spent * .1)}, ${255 / (item.spent * .5)}, 0.2)`),
            borderColor: categories.map((item: any) => `rgba(${0 + item.spent}, ${255 / (item.spent * .1)}, ${255 / (item.spent * .5)}, 1)`),
            borderWidth: 1,
            hoverBackgroundColor: 'white',
            maxBarThickness: 100
        }],
    };

    return (
        <>
            <div className={'analytics__header'}>
                {props.children}

                <div className={'cards'}>
                    <div className={'cards__item'}>
                        <h3>Total spent:</h3>
                        <p>{props.findTotalSpending()}</p>
                    </div>
                    <div className={'cards__item'}>
                        <h3>Most spent for:</h3>
                        {props.findBiggerSpent()}
                    </div>
                    {props.showExpensesPerDay ? <div className={'cards__item'}>
                        <h3>Average spending per day:</h3>
                        {Math.ceil(props.findTotalSpending() / Math.ceil((+props.dateHigher - +props.dateLower) / 86400000))}
                    </div> : <div className={'cards__item'}>
                        <h3>Average spending per day:</h3>
                        {Math.ceil(props.findTotalSpending() / diff) || 0}
                    </div>}

                </div>
            </div>


            <div className={'analytics__wrapper'}>
                <h3>{props.title}</h3>

                <div className={'analytics__info'}>
                    <div className={'analytics__info__item'}>
                        <h3>All-time expenses:</h3>
                        <div className={'analytics__categories'}>
                            <Line data={props.lineChart()} height={100}/>
                        </div>
                    </div>

                    <div className={'analytics__info__item'}>
                        <h3>Expenses by categories:</h3>
                        <p>Click the column to see the details below.</p>
                        <div className={'analytics__categories'}>
                            <Bar data={barData} height={100}
                                 getElementAtEvent={e => props.showMoreDetailsForCategory(e[0] && e[0]._chart.config.data.labels[e[0]._index])}/>
                        </div>
                    </div>

                    {props.showMoreInfo && <div className={'analytics__info__item detail-info'}>
                        <div className={'header'}>
                            <p>Name</p>
                            <p>Category</p>
                            <p>Price</p>
                            <p>Count</p>
                            <p>Spent</p>
                            <p>Date</p>
                        </div>

                        {props.moreInfo.map((item: any) =>
                            <div key={item.id} className={'more-info'}>
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                                <p>{item.count}</p>
                                <p>{item.spent}</p>
                                <p>{item.date}</p>
                            </div>)}
                    </div>}
                </div>
            </div>
        </>
    )
};


export default AnalyticsInfo;