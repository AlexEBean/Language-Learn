import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
// import Museum from './components/Musuem/Museum'
// import Critterpedia from './components/Critterpedia/Critterpedia'

export default (
    <Switch>
        <Route exact path="/"> <Home/> </Route>
        <Route path="/entry"> <Auth/> </Route>
        {/* <Route path="/museum"> <Museum /> </Route> */}
        {/* <Route path="/critterpedia"> <Critterpedia /> </Route> */}
    </Switch>
)