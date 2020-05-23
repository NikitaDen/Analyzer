import React, {useState} from "react";
import './data-delete.scss';
import Button from "../../Button/Button";
import {Expenses} from "../../Analytics/Analytics";
import Confirm from "../../Confirm/Confirm";
import deleteAll from "../../../assets/images/delete-all.svg";

type Props = {
    expenses: Array<Expenses>
    deleteExpensesThunkCreator(data: Array<number>): void,
}

const DataDelete: React.FC<Props> = (props) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const dataToBeDeleted = [...props.expenses].map((item: Expenses) => item.id);

    const onDeleteAllExpenses = () => {
        props.deleteExpensesThunkCreator(dataToBeDeleted);
    };

    return (
        <div className={'settings__item data-delete'}>
            <h3>Delete Data</h3>

            <Confirm title={'All your expenses will be deleted irrevocably. Are you sure?'} className={showConfirm ? 'confirm show': 'confirm'}
                     func={onDeleteAllExpenses} close={() => setShowConfirm(false)}/>

            <div className={'data-loader__items'}>
                <p className={'settings-info'}>All your data can be deleted.</p>
                <Button image={deleteAll} className={'button button--settings delete'} func={() => setShowConfirm(true)} title={'Delete'}/>
            </div>
        </div>
    )
};

export default React.memo(DataDelete);