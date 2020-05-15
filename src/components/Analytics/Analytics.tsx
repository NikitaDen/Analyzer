import React, {useEffect, useState} from "react";
import './analytics.scss';
import {connect} from "react-redux";
import Period from "./Period/Period";
import {getAllExpensesThunkCreator} from "../../redux/history-reducer";
import AnalyticsInfo from "./AnalyticsInfo/AnalyticsInfo";
import {addCategoriesThunkCreator, getCategories, getCategoriesThunkCreator} from "../../redux/settings-reducer";
import {Redirect} from "react-router-dom";
import {categoriesSelector} from "../../selectors/settings-selector";
import {isAuthSelector} from "../../selectors/account-selectors";
import {expensesSelector, pagesSelector} from "../../selectors/history-selectors";

const Analytics = (props: any) => {
    const [dateLower, setDateLower] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0));
    const [dateHigher, setDateHigher] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 0, 0, 0));
    const [showForPeriod, setShowForPeriod] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [moreInfo, setMoreInfo] = useState({});

    useEffect(() => {
        props.getAllExpensesThunkCreator();
        props.getCategoriesThunkCreator();
    }, []);

    const findTotalSpending = () => {
        return [...props.expenses].reduce((sum: any, item: any) => sum + item.spent, 0);
    };

    const findTotalSpendingForPeriod = () => {
        return [...props.expenses].filter((item: any) => item.id > dateLower && item.id < dateHigher).reduce((sum: any, item: any) => sum + item.spent, 0)
    };

    const showMoreDetailsForCategory = (category: string) => {
        setShowMoreInfo(true);
        setMoreInfo([...props.expenses]
            .filter((item: any) => item.category === category));
    };

    const showMoreDetailsForCategoryForPeriod = (category: string) => {
        setShowMoreInfo(true);
        setMoreInfo([...props.expenses]
            .filter((item: any) => item.id > dateLower && item.id < dateHigher)
            .filter((item: any) => item.category === category));
    };

    const chartsFunc = () => {
        let categories: Array<any> = [];

        props.categories.forEach((category: any) => categories.push({
            category: category.name,
            spent: [...props.expenses].filter((item: any) => item.category === category.name).reduce((sum: any, elem: any) => sum + elem.spent, 0),
            expenses: [...props.expenses].filter((item: any) => item.category === category.name),
        }));

        return categories.filter(item => item.spent !== 0).sort((a, b) => a.spent - b.spent);
    };
    const chartsFuncForPeriod = () => {
        let categories: Array<any> = [];

        props.categories.forEach((category: any) => categories.push({
            category: category.name,
            spent: [...props.expenses].filter((item: any) => item.id > dateLower && item.id < dateHigher && item.category === category.name).reduce((sum: any, elem: any) => sum + elem.spent, 0),
            expenses: [...props.expenses].filter((item: any) => item.id > dateLower && item.id < dateHigher && item.category === category.name)
        }));

        return categories.filter(item => item.spent !== 0).sort((a, b) => a.spent - b.spent);
    };

    const lineChart = () => {
        const lineDates: Array<any> = [];

        [...props.expenses].forEach((item: any) => {
            lineDates.push(`${new Date(item.id).getDate()}.${new Date(item.id).getMonth() + 1}.${new Date(item.id).getFullYear()}`)
        });

        const newLineDates: Set<string> = new Set(lineDates);

        const expensesByDates: Array<any> = [];
        newLineDates.forEach((date: any) => {
            expensesByDates.push({
                date: date,
                expenses: [...props.expenses]
                    .filter((item: any) => `${new Date(item.id).getDate()}.${new Date(item.id).getMonth() + 1}.${new Date(item.id).getFullYear()}` === date)
                    .reduce((acc: number, item: any) => acc + +item.spent, 0),
            });
        });

        const lineData = {
            labels: [...Array.from(newLineDates)].reverse(),
            datasets: [{
                label: 'Spent',
                data: [...expensesByDates.map((item: any) => item.expenses)].reverse(),
                backgroundColor: 'rgba(68, 138, 255, 0.2)',
                borderWidth: 1,
                hoverBackgroundColor: 'white'
            }],
        };

        return lineData;
    };
    const lineChartForPeriod = () => {
        const lineDates: Array<any> = [];

        [...props.expenses]
            .filter((item: any) => item.id > dateLower && item.id < dateHigher)
            .forEach((item: any) => {
                lineDates.push(`${new Date(item.id).getDate()}.${new Date(item.id).getMonth() + 1}.${new Date(item.id).getFullYear()}`)
            });

        const newLineDates: Set<string> = new Set(lineDates);

        const expensesByDates: Array<any> = [];
        newLineDates.forEach((date: any) => {
            expensesByDates.push({
                date: date,
                expenses: [...props.expenses]
                    .filter((item: any) => item.id > dateLower && item.id < dateHigher)
                    .filter((item: any) => `${new Date(item.id).getDate()}.${new Date(item.id).getMonth() + 1}.${new Date(item.id).getFullYear()}` === date)
                    .reduce((acc: number, item: any) => acc + +item.spent, 0),
            });
        });

        const lineData = {
            labels: [...Array.from(newLineDates)].reverse(),
            datasets: [{
                label: 'Spent',
                data: [...expensesByDates.map((item: any) => item.expenses)].reverse(),
                borderWidth: 1,
                backgroundColor: 'rgba(68, 138, 255, 0.2)',
                hoverBackgroundColor: 'white'
            }],
        };

        return lineData;
    };


    const findBiggerSpentForPeriod = () => {
        return [...props.expenses].filter((item: any) => item.id >= dateLower && item.id <= dateHigher && item.spent === Math.max(...props.expenses.filter((item: any) => item.id >= dateLower && item.id <= dateHigher).map((item: any) => item.spent))).map((item: any) =>
            <div className={'biggest-spending'} key={item.id}>
                <p>Name:</p>
                <span>{item.name}</span>
                <p>Spent:</p>
                <span>{item.spent}</span>
                {/*<p>Category:</p>*/}
                {/*<span>{item.category}</span>*/}
                <p>Date:</p>
                <span>{item.date}</span>
                {/*<p>Count:</p>*/}
                {/*<span>{item.count}</span>*/}
            </div>)
    };
    const findBiggerSpent = () => {
        return [...props.expenses].filter((item: any) => item.spent === Math.max(...props.expenses.map((item: any) => item.spent))).map((item: any) =>
            <div className={'biggest-spending'} key={item.id}>
                <p>Name:</p>
                <span>{item.name}</span>
                <p>Spent:</p>
                <span>{item.spent}</span>
                {/*<p>Category:</p>*/}
                {/*<span>{item.category}</span>*/}
                <p>Date:</p>
                <span>{item.date}</span>
                {/*<p>Count:</p>*/}
                {/*<span>{item.count}</span>*/}
            </div>)
    };

    if (!props.isAuth) {
        return <Redirect to={'login'}/>
    }

    return (
        <div className={'analytics'}>
            <h2>Analytics</h2>

            {/*<Period setShowMoreInfo={setShowMoreInfo} dateHigher={dateHigher} dateLower={dateLower}*/}
            {/*        setDateLower={setDateLower}*/}
            {/*        setDateHigher={setDateHigher} showForPeriod={showForPeriod} setShowForPeriod={setShowForPeriod}/>*/}

            {showForPeriod ?
                <AnalyticsInfo expenses={props.expenses} lineChart={lineChartForPeriod}
                               showMoreDetailsForCategory={showMoreDetailsForCategoryForPeriod} moreInfo={moreInfo}
                               chartsFunc={chartsFuncForPeriod} showMoreInfo={showMoreInfo} showExpensesPerDay={true}
                               dateLower={dateLower} dateHigher={dateHigher}
                               categories={props.categories} title={'Analytics for the time period'}
                               findTotalSpending={findTotalSpendingForPeriod}
                               findBiggerSpent={findBiggerSpentForPeriod} children={<Period setShowMoreInfo={setShowMoreInfo} dateHigher={dateHigher} dateLower={dateLower}
                                                                                            setDateLower={setDateLower}
                                                                                            setDateHigher={setDateHigher} showForPeriod={showForPeriod} setShowForPeriod={setShowForPeriod}/>}/>
                :
                <AnalyticsInfo expenses={props.expenses} lineChart={lineChart}
                               showMoreDetailsForCategory={showMoreDetailsForCategory} moreInfo={moreInfo}
                               chartsFunc={chartsFunc} showMoreInfo={showMoreInfo} showExpensesPerDay={false}
                               dateLower={dateLower} dateHigher={dateHigher}
                               categories={props.categories} title={'Summary analytics'}
                               findTotalSpending={findTotalSpending}
                               findBiggerSpent={findBiggerSpent} children={<Period setShowMoreInfo={setShowMoreInfo} dateHigher={dateHigher} dateLower={dateLower}
                                                                                   setDateLower={setDateLower}
                                                                                   setDateHigher={setDateHigher} showForPeriod={showForPeriod} setShowForPeriod={setShowForPeriod}/>}/>
            }

        </div>
    )
};

const mapStateToProps = (store: any) => ({
    expenses: expensesSelector(store),
    categories: categoriesSelector(store),
    isAuth: isAuthSelector(store),
    pages: pagesSelector(store),
});

export default connect(mapStateToProps, {
    getCategories,
    getAllExpensesThunkCreator,
    getCategoriesThunkCreator,
    addCategoriesThunkCreator
})(Analytics);