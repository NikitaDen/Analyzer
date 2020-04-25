import React from "react";
import loader from '../../assets/images/loading-1.svg';
import './loader.scss';

const Loader = () => {
    return (
        <img className={'loader'} src={loader} alt=""/>
    )
};

export default Loader;