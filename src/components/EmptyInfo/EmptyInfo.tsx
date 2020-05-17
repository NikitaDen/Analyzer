import React from "react";

interface Props {
    title: string
    src: string
}

const EmptyInfo: React.FC<Props> = (props) => <div className={'empty'}>
    <p>{props.title}</p>
    <img src={props.src} alt="empty"/>
</div>;

export default React.memo(EmptyInfo);