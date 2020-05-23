import React from "react";
import fileDownload from 'js-file-download';
import {Expenses} from "../../Analytics/Analytics";
import './data-load.scss';
import Button from "../../Button/Button";
import download from './../../../assets/images/download.svg';

const DataLoad = (props: any) => {
    let data = 'Name,Category,Spent,Date\n' + [...props.expenses].map((item: Expenses) => `${item.name},${item.category},${item.spent},${item.date.toString().split(', ').join(' - ')}`).join('\n');

    return (
        <div className={'settings__item data-loader'}>
            <h3>Download Data</h3>
            <div className={'data-loader__items'}>
                <p className={'settings-info'}>You can download your personal expenses in .CSV file and process your data within Excel.</p>
                <Button image={download} className={'button button--settings'} func={() => fileDownload(data, 'expenses.csv')} title={'Download'}/>
            </div>

        </div>
    )
};

export default DataLoad;