import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Entry from '../Entry/Entry'
import Home from '../Home/Home'
import Museum from '../Musuem/Museum'
import Critterpedia from '../Critterpedia/Critterpedia'

export default (
    <Switch>
        <Route exact path="/"> <Home /> </Route>
        <Route path="/entry"> <Entry /> </Route>
        <Route path="/museum"> <Museum /> </Route>
        <Route path="/critterpedia"> <Critterpedia /> </Route>
    </Switch>
)