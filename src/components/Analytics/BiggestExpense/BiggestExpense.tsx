import React from "react";

interface Props {
    id: number
    name: string
    spent: number
    date: Date
}

const BiggestExpense: React.FC<Props> = (props) => {
    return (
        <div className={'biggest-spending'} key={props.id}>
            <p>Name:</p>
            <span>{props.name}</span>
            <p>Spent:</p>
            <span>{props.spent}</span>
            <p>Date:</p>
            <span>{props.date}</span>
        </div>
    )
};

export default BiggestExpense;