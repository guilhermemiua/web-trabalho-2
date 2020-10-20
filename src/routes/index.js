import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/dashboard" component={Dashboard}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes