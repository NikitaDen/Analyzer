import React, {useEffect, useState} from "react";
import './analytics.scss';
import {connect} from "react-redux";
import Period from "./Period/Period";
import {getAllExpensesThunkCreator} from "../../redux/history-reducer";
import AnalyticsInfo from "./AnalyticsInfo/AnalyticsInfo";
import {
    addCategoriesThunkCreator,
    CategoryType,
    getCategories,
    getCategoriesThunkCreator
} from "../../redux/settings-reducer";
import {Redirect} from "react-router-dom";
import {categoriesSelector} from "../../selectors/settings-selector";
import {isAuthSelector} from "../../selectors/account-selectors";
import {expensesSelector, pagesSelector} from "../../selectors/history-selectors";
import BiggestExpense from "./BiggestExpense/BiggestExpense";

export type Expenses = {
    id: number
    category: string
    spent: number,
    name: string,
    date: Date
}

type CategoriesForAnalytics = {
    category: string,
    spent: number,
    expenses: Array<Expenses>
}

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
        return [...props.expenses].filter((item: Expenses) => new Date(item.id) > dateLower && new Date(item.id) < dateHigher).reduce((sum: any, item: any) => sum + item.spent, 0)
    };

    const showMoreDetailsForCategory = (category: string) => {
        setShowMoreInfo(true);
        setMoreInfo([...props.expenses]
            .filter((item: any) => item.category === category));
    };
    const showMoreDetailsForCategoryForPeriod = (category: string) => {
        setShowMoreInfo(true);
        setMoreInfo([...props.expenses]
            .filter((item: Expenses) => new Date(item.id) > dateLower && new Date(item.id) < dateHigher)
            .filter((item: Expenses) => item.category === category));
    };

    const defineChartInfo = (forPeriod: boolean) => {
        let categories: Array<CategoriesForAnalytics> = [];

        props.categories.forEach((category: CategoryType) => categories.push({
            category: category.name,
            spent: forPeriod ?
                [...props.expenses].filter((item: Expenses) => new Date(item.id) > dateLower && new Date(item.id) < dateHigher && item.category === category.name).reduce((sum: number, elem: Expenses) => sum + elem.spent, 0) :
                [...props.expenses].filter((item: Expenses) => item.category === category.name).reduce((sum: number, elem: any) => sum + elem.spent, 0),
            expenses: forPeriod ? [...props.expenses].filter((item: Expenses) => new Date(item.id) > dateLower && new Date(item.id) < dateHigher && item.category === category.name) : [...props.expenses].filter((item: Expenses) => item.category === category.name),
        }));

        return categories.filter(item => item.spent !== 0).sort((a, b) => a.spent - b.spent);
    };
    const chartsFunc = () => defineChartInfo(false);
    const chartsFuncForPeriod = () => defineChartInfo(true);

    const defineLineChartInfo = (forPeriod: boolean) => {
        const lineChartData: Array<string> = [];

        forPeriod ?
            [...props.expenses]
                .filter((item: Expenses) => new Date(item.id) > dateLower && new Date(item.id) < dateHigher)
                .forEach((item: Expenses) => {
                    lineChartData.push(`${new Date(item.id).getDate()}.${new Date(item.id).getMonth() + 1}.${new Date(item.id).getFullYear()}`)
                }) :
            [...props.expenses]
                .forEach((item: Expenses) => {
                    lineChartData.push(`${new Date(item.id).getDate()}.${new Date(item.id).getMonth() + 1}.${new Date(item.id).getFullYear()}`)
                });

        const newLineDates: Set<string> = new Set(lineChartData);

        interface ExpenseForAnalytics {
            date: string
            expenses: Expenses
        }

        const expensesByDates: Array<ExpenseForAnalytics> = [];

        newLineDates.forEach((date: string) => {
            expensesByDates.push({
                date,
                expenses: forPeriod ?
                    [...props.expenses]
                        .filter((item: Expenses) => new Date(item.id) > dateLower && new Date(item.id) < dateHigher)
                        .filter((item: Expenses) => `${new Date(item.id).getDate()}.${new Date(item.id).getMonth() + 1}.${new Date(item.id).getFullYear()}` === date)
                        .reduce((acc: number, item: Expenses) => acc + +item.spent, 0) :
                    [...props.expenses]
                        .filter((item: Expenses) => `${new Date(item.id).getDate()}.${new Date(item.id).getMonth() + 1}.${new Date(item.id).getFullYear()}` === date)
                        .reduce((acc: number, item: Expenses) => acc + +item.spent, 0),
            });
        });

        return {
            labels: [...Array.from(newLineDates)].reverse(),
            datasets: [{
                label: 'Spent',
                data: [...expensesByDates.map((item: ExpenseForAnalytics) => item.expenses)].reverse(),
                backgroundColor: 'rgba(68, 138, 255, 0.2)',
                borderWidth: 1,
                hoverBackgroundColor: 'white'
            }],
        };
    };
    const lineChart = () => defineLineChartInfo(false);
    const lineChartForPeriod = () => defineLineChartInfo(true);

    const findBiggerSpentForPeriod = () => {
        return [...props.expenses]
            .filter((item: Expenses) => new Date(item.id) >= dateLower && new Date(item.id) <= dateHigher && item.spent === Math.max(...props.expenses.filter((item: Expenses) => item.id >= +dateLower && item.id <= +dateHigher)
            .map((item: Expenses) => item.spent)))
            .map((item: Expenses) => <BiggestExpense key={item.id} id={item.id} name={item.name} spent={item.spent} date={item.date}/>)
    };
    const findBiggerSpent = () => {
        return [...props.expenses]
            .filter((item: Expenses) => item.spent === Math.max(...props.expenses.map((item: Expenses) => item.spent)))
            .map((item: Expenses) => <BiggestExpense key={item.id} id={item.id} name={item.name} spent={item.spent} date={item.date}/>)
    };

    if (!props.isAuth) {
        return <Redirect to={'login'}/>
    }

    return (
        <div className={'analytics'}>
            <h2>Analytics</h2>

            <AnalyticsInfo expenses={props.expenses} lineChart={showForPeriod ? lineChartForPeriod : lineChart}
                           showMoreDetailsForCategory={showForPeriod ? showMoreDetailsForCategoryForPeriod : showMoreDetailsForCategory}
                           moreInfo={moreInfo}
                           chartsFunc={showForPeriod ? chartsFuncForPeriod : chartsFunc} showMoreInfo={showMoreInfo}
                           showExpensesPerDay={showForPeriod}
                           dateLower={dateLower} dateHigher={dateHigher}
                           categories={props.categories}
                           title={showForPeriod ? 'Analytics for the time period' : 'Summary analytics'}
                           findTotalSpending={showForPeriod ? findTotalSpendingForPeriod : findTotalSpending}
                           findBiggerSpent={showForPeriod ? findBiggerSpentForPeriod : findBiggerSpent}>
                <Period setShowMoreInfo={setShowMoreInfo} dateHigher={dateHigher}
                        dateLower={dateLower}
                        setDateLower={setDateLower}
                        setDateHigher={setDateHigher} showForPeriod={showForPeriod}
                        setShowForPeriod={setShowForPeriod}/>
            </AnalyticsInfo>


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