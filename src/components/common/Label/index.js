import React from 'react'

import './styles.css'

const Label = ({ children }) => {
	return (
		<label className="label">{children}</label>
	)
}

export default Label