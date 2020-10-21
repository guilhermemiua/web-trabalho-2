import React from 'react'

import './styles.css'

const ModalContainer = ({ children, height = 600, width = 600, title="" }) => {
	return (
		<div className="modal-container" style={{
			width: `${width}px`,
			height: `${height}px`
		}}>
			<h2 className="modal-title">{title}</h2>
			{children}
		</div>
	)
}

export default ModalContainer