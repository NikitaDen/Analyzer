import React from "react";
import {Bar} from 'react-chartjs-2';

interface Props {
    dateLower: any,
    dateHigher: any,
    categories: Array<any>,
    title: string,
    showExpensesPerDay: boolean,
    showMoreInfo: boolean,
    moreInfo: any

    findTotalSpending(): number,

    findSpentCategory(): any,

    findBiggerSpent(): any,

    chartsFunc(): any,
    showMoreDetailsForCategory(item: any): any
}

const AnalyticsInfo: React.FC<Props> = (props) => {
    const categories = props.chartsFunc();
    // console.log(categories);

    const data = {
        labels: categories.map((item: any) => item.category),
        datasets: [{
            label: 'Spent',
            data: categories.map((item: any) => item.spent),
            backgroundColor: categories.map((item: any) => `rgba(${0 + item.spent}, ${255 / (item.spent * .1)}, ${255 / (item.spent * .5)}, 0.2)`),
            borderColor: categories.map((item: any) => `rgba(${0 + item.spent}, ${255 / (item.spent * .1)}, ${255 / (item.spent * .5)}, 1)`),
            borderWidth: 1,
            hoverBackgroundColor: 'white'
        }],
    };

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
                        {/*<Bar data={data} onElementsClick={props.showMoreDetailsForCategory}/>*/}
                        <Bar data={data} getElementAtEvent={e => props.showMoreDetailsForCategory(e[0]._chart.config.data.labels[e[0]._index])}/>
                        {/*.data.labels[e[0]._index]*/}
                        {/*onElementsClick={(e) => console.log(e)} getDatasetAtEvent={e => console.log(e)}*/}
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
                        <div key={item.id} className={'more-info'}>
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