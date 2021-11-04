import React from 'react'
import { CSSTransition } from 'react-transition-group'
import Toaster from './public/common/Toaster'
import BackOnTop from './public/common/BackOnTop'
import SubscriptionModal from './public/common/Modal'
import Header from './public/base/Header'
import routes from '../routes'
import { Route, Router } from 'react-router-dom'
import history from '../history'

function App() {
    return (
        <Router history={history}>
            <BackOnTop>
                <SubscriptionModal/>
                <Header/>
                {routes.map(({ path, Component }) => (
                    <Route key={path} exact path={path}>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={300}
                                classNames="page"
                                unmountOnExit
                            >
                                <div className="page">
                                    <Component />
                                </div>
                            </CSSTransition>
                        )}
                    </Route>
                ))}
            </BackOnTop>
            <Toaster/>
        </Router>
    )
}

export default App
