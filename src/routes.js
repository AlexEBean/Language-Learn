import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Entry from './components/Entry/Entry'
import Home from './components/Home/Home'
// import Museum from './components/Musuem/Museum'
// import Critterpedia from './components/Critterpedia/Critterpedia'

export default (
    <Switch>
        <Route exact path="/"> <Home /> </Route>
        <Route path="/entry"> <Entry /> </Route>
        {/* <Route path="/museum"> <Museum /> </Route> */}
        {/* <Route path="/critterpedia"> <Critterpedia /> </Route> */}
    </Switch>
)