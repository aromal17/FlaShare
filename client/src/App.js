import React from 'react'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Main from './components/main/main'
import { ReactComponent as ReactLogo } from "./resources/404page.svg";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
export default function App() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
            <Switch>
                {/* <Route exact path="/login" component = {Authentication} />
                <Route exact path="/login/forget" component={Forget} />
                <Route exact path="/login/reset/:id/:token" component={Reset} /> */}
                <Route exact path="/" component = {Main}/>
                {/* <Route component={ReactLogo} className="image-vector"/> */}
                <Route component = {() => 
                        <>
                            <ReactLogo className="error-img" />
                        </>
                    } />
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
    )
}
