import React from 'react'

import './styles.css'

const Button = ({ onClick, color, children, className, type }, props) => {
	return (
		<button 
			type={type || 'button'}
			className={`button ${color} ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button