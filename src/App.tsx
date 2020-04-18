import React from 'react';
import './assets/styles/styles.scss';
import Menu from "./components/Menu/Menu";
import History from "./components/History/History";
import Settings from "./components/Settings/Settings";
import Analytics from "./components/Analytics/Analytics";
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {

    return (
        <div className="App">
            <div className={'wrapper'}>
                <Menu/>
                <div className={'content'}>
                    <Switch>
                        <Route path={'/history'}>
                            <History/>
                        </Route>
                        <Route path={'/settings'}>
                            <Settings/>
                        </Route>
                        <Route path={'/analytics'}>
                            <Analytics/>
                        </Route>
                        <Redirect to={'/history'} />
                    </Switch>
                </div>
            </div>

        </div>
    );
}

export default App;
