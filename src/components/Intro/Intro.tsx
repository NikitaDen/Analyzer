import React, {useState} from "react";
import Button from "../Button/Button";
import next from "../../assets/images/about.svg";
import './intro.scss';

const Intro = () => {
    const [showIntro, setShowIntro] = useState(false);

    return (
        <>
            <Button image={next} className={'button button--about'} func={() => setShowIntro(!showIntro)}/>

            {showIntro ? <div className={'intro'}>
                <p>This app helps you to track your expenses in time, check some info according to your expenses (the biggest expense, expenses by categories, spending per day for some period, etc.)</p>
                <p>App based on <b>MERN</b> stack. I've used a <b>JWT token</b> (expires every 30 seconds) with refresh token to identify user, so it's safe enough. Also, Analyzer doesn't send an invitation to email you mention, so you can register with a fake email for test purposes. For example:</p>
                <div>
                    <p><b>Nickname:</b></p> <span>NickNick</span>
                    <p><b>Email:</b></p> <span>ex@mail.ru</span>
                    <p><b>Password:</b></p> <span>1234567</span>
                </div>
            </div> : null}

        </>
    )
};

export default Intro;