import React from 'react';
import './assets/styles/styles.scss';
import Menu from "./components/Menu/Menu";
import History from "./components/History/History";
import Analytics from "./components/Analytics/Analytics";
import {Redirect, Route, Switch} from 'react-router-dom';
import {withLoading} from "./HOC/withLoadingSuspense";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const Settings = React.lazy(() => import('./components/Settings/Settings'));


const App = (props: any) => {
    
    const SettingsLoading = withLoading(Settings);

    return (
        <div className="App">
                <Menu/>
                <div className={'content'}>
                    <Switch>
                        // @ts-ignore
                        <Route path={'/login'} render={() => <Login/>}/>
                        // @ts-ignore
                        <Route path={'/register'} render={() => <Register/>}/>
                        <Route path={'/history'} render={() => <History/>}/>
                        <Route path={'/analytics'} render={() => <Analytics/>}/>
                        <Route path={'/settings'} render={() => <SettingsLoading/>}/>
                        <Redirect to={'/history'}/>
                    </Switch>
            </div>
        </div>
    );
};

export default App;
