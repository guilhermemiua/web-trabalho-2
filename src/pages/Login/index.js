import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify'

import { login, createUser } from '../../requests'
import { setUser } from '../../store/ducks/user'
import { setTokenToSessionStorage, setUserToSessionStorage } from '../../helpers/sessionStorage'

import Input from '../../components/common/Input'
import Label from '../../components/common/Label'
import Button from '../../components/common/Button'

import './styles.css'

const Login = () => {
	const { push } = useHistory()
	const { handleSubmit, register, errors } = useForm();

	const dispatch = useDispatch()

	const [page, setPage] = useState("login") 

	const submit = async (values) => {
		const { email, password } = values
		
		if (page === 'login') {
			try {

				const { data } = await login({ email, password})

				setTokenToSessionStorage(data.token)
				setUserToSessionStorage(data.user)

				await dispatch(setUser({ user: data.user }))

				push('/dashboard')
			} catch(error) {
				toast.error(error?.response?.data?.message || "Error!")
			}
		} else if (page === 'register') {
			try {
				await createUser({ email, password})

				const { data } = await login({ email, password })

				setTokenToSessionStorage(data.token)
				setUserToSessionStorage(data.user)

				await dispatch(setUser({ user: data.user }))

				push('/dashboard')
			} catch(error) {
				toast.error(error?.response?.data?.message || "Error!")
			}
		}
	}

	return (
		<div className="login-container">
			<div className="login-card">
				<form onSubmit={handleSubmit(submit)}>
					<h1 className="login-title">{page === 'login' ? 'Welcome!' : 'Register!'}</h1>
					<Label>Email</Label>
					<Input 
						className="login-email-input"
						name="email"
						ref={register({
							required: {
								value: true,
								message: "Email is required"
							},
						})}
					/>
					{errors.email && errors.email.message}
					
					{
						page === 'login' 
						? (
							<Fragment>
								<Label>Password</Label>
								<Input 
									type="password"
									name="password"
									ref={register({
										required: {
											value: true,
											message: "Password is required"
										},
									})}
								/>
								{errors.password && errors.password.message}
								<Button 
									color="primary" 
									className={"login-button"}
									type="submit"
								>
									Login
								</Button>

								<Button 
									color="ghost" 
									className={"login-button"}
									onClick={() => setPage("register")}
								>
									Register
								</Button>
							</Fragment>
						)
						: (
							<Fragment>
								<Label>Password</Label>
								<Input 
									name="password"
									ref={register({
										required: {
											value: true,
											message: "Password is required"
										},
									})}
								/>
								{errors.password && errors.password.message}
								<Button 
									color="primary" 
									className={"login-button"}
									type="submit"
								>
									Register
								</Button>

								<Button 
									color="ghost" 
									className={"login-button"}
									onClick={() => setPage("login")}
								>
									Login
								</Button>
							</Fragment>
						)
					}
				</form>

				<ToastContainer />
			</div>
		</div>
	)
}

export default Login