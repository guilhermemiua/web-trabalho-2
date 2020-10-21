import React, { forwardRef} from 'react'

import './styles.css'

const Input = ({ className, ...props }, ref) => {
	return (
		<input ref={ref} className={`input ${className}`} {...props}/>
	)
}

export default forwardRef(Input)