import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Input from '../../components/common/Input'
import Label from '../../components/common/Label'
import Button from '../../components/common/Button'

import './styles.css'

const Login = () => {
	const { push } = useHistory()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const submit = () => {
		// if (!email || !password) {
		// 	return
		// }

		push('/dashboard')
	}

	return (
		<div className="login-container">
			<div className="login-card">
				<h1 className="login-title">Welcome to Green!</h1>
				<Label>Email</Label>
				<Input 
					className="login-email-input" 
					onChange={(event) => setEmail(event.target.value)}
				/>

				<Label>Password</Label>
				<Input 
					onChange={(event) => setPassword(event.target.value)}
				/>
				<Button 
					color="primary" 
					className={"login-button"}
					onClick={() => submit()}
				>
					Login
				</Button>
			</div>
		</div>
	)
}

export default Login