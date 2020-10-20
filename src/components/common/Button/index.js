import React from 'react'

import './styles.css'

const Button = ({ onClick, color, children, className }) => {
	return (
		<button 
			type={'button'}
			className={`button ${color} ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button