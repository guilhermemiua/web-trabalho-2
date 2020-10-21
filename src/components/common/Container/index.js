import React from 'react'

import './styles.css'

const Container = ({ children, className }) => {
	return (
		<div className={`container ${className}`}>
			{children}
		</div>
	)
}

export default Container