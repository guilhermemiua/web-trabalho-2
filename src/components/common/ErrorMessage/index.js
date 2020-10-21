import React from 'react'

import './styles.css'

const ErrorMessage = ({ children }) => {
	return (
		<div className="error-message">{children}</div>
	)
}

export default ErrorMessage