import React, { forwardRef} from 'react'

import './styles.css'

const Select = ({ className, children, ...props }, ref) => {
	return (
		<select ref={ref} className={`select ${className}`} {...props}> 
		{children}
		</select>
	)
}

export default forwardRef(Select)