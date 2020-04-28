import React from "react";

interface Props {
    spent: any,
    category: any,
    sum: any,
    func(): void
}

const Chart: React.FC<Props> = (props) => {

    return (
            <div>
                <p>{props.spent}</p>
                <div onClick={props.func} style={{
                    width: '1.5rem',
                    height: `${props.spent / props.sum * 150}px`,
                    backgroundColor: `rgb(${0 + props.spent}, ${255 / (props.spent * .1)}, ${255 / (props.spent * .5)})`
                }}
                     className={'column'}/>
                <h5>{props.category}</h5>
            </div>
    )
};

export default Chart;