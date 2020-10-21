import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Transactions from '../pages/Transactions'
import Categories from '../pages/Categories'

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login}/>
				<PrivateRoute exact path="/dashboard" component={Dashboard}/>
				<PrivateRoute exact path="/transactions" component={Transactions}/>
				<PrivateRoute exact path="/categories" component={Categories}/>
				<Redirect to="/login"/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes