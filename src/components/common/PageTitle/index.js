import React from 'react'

import './styles.css'

const PageTitle = ({ className, children }) => {
	return (
    <h1 className={`title ${className}`}>{children}</h1>
	)
}

export default PageTitle