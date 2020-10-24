import React from 'react'

import { RiCloseLine } from 'react-icons/ri'

import './styles.css'

const ModalContainer = ({ children, height = 400, width = 600, title="", visible, onClose }) => {
	return (
		<div className={`modal ${visible ? "" : "closed"}`}>
			<div className="modal-container" style={{
				width: `${width}px`,
				height: `${height}px`
			}}>
				<div className="modal-header">
					<h2 className="modal-title">{title}</h2>
					<RiCloseLine size={25} height={25} onClick={() => onClose()}/>
				</div>
		
			
				{children}
			</div>
		</div>
	)
}

export default ModalContainer