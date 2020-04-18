import React from "react";
import {connect} from "react-redux";
import {addCategory, deleteCategory, getCategories, setCategories} from "../../redux/settings-reducer";
import Categories from "./Categories/Categories";

interface Props {
    categories: any,

    addCategory(name: string): void,

    getCategories(): void,

    setCategories(): void,

    deleteCategory(id: string): void,
}

const Settings: React.FC<Props> = (props) => {
    return (
        <div className={'settings'}>
            <h2>Settings</h2>
            <Categories categories={props.categories} setCategories={props.setCategories}
                        getCategories={props.getCategories} addCategory={props.addCategory}
                        deleteCategory={props.deleteCategory}/>
        </div>
    )
};

const mapStateToProps = (store: any) => ({
    categories: store.settings.categories,
});

export default connect(mapStateToProps, {addCategory, getCategories, setCategories, deleteCategory})(Settings);