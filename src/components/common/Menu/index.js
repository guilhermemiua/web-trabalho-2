

import React from 'react'

import { useHistory } from 'react-router-dom'
import { removeTokenFromSessionStorage, removeUserFromSessionStorage } from '../../../helpers/sessionStorage'

import './styles.css'

const Menu = ({}) => {

  const { push } = useHistory()

	return (
		<header>
      <nav className="nav-container">
        <h2 className="nav-title" onClick={() => push('/dashboard')}>
          GREEN
        </h2>

        <ul>
          <li>
            <button 
             className="link-button primary"
             onClick={() => push('/transactions')}
            >
              Transactions
            </button>
          </li>
          <li>
            <button 
              className="link-button primary"
              onClick={() => push('/categories')}
            >
              Categories
            </button>
          </li>
          <li>
            <button 
              className="link-button primary"
              onClick={() => {
                removeTokenFromSessionStorage()
                removeUserFromSessionStorage()

                push('/login')
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
	)
}

export default Menu