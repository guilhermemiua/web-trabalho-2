import React from 'react'
import { Provider } from 'react-redux'

import Router from './routes'
import store from './store'

import './reset.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<Provider store={store}>
			<div className="App">
     		<Router />
			</div>
		</Provider>
	)
}

export default App
