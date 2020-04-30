import React from "react";

const Intro = () => {
    return (
        <div className={'intro'}>
            <p>This app based on <b>MERN</b> stack. I've used a <b>JWT token</b> (expires every 30 seconds) with refresh token to identify user, so it's safe enough. Also, Analyzer doesn't send an invitation to email you mention, so you can register with a fake email for test purposes. For example:</p>
            <div>
                <p><b>Nickname:</b></p> <span>NickNick</span>
                <p><b>Email:</b></p> <span>ex@mail.ru</span>
                <p><b>Password:</b></p> <span>1234567</span>
            </div>
        </div>
    )
};

export default Intro;