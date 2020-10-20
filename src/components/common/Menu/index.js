

import React from 'react'

import './styles.css'

const Menu = ({}) => {
	return (
		<header>
      <nav class="nav-container">
        <h2 className="nav-title">GREEN</h2>

        <ul>
          <li>
            <a href="#">
              Transactions
            </a>
          </li>
          <li>
            <a href="#">
              Categories
            </a>
          </li>
          <li>
            <a href="#">
              Profile
            </a>
          </li>
          <li>
            <a href="#">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
	)
}

export default Menu