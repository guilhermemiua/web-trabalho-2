import React from 'react'

import Input from '../../components/common/Input'
import Label from '../../components/common/Label'
import Button from '../../components/common/Button'

import './styles.css'
import Container from '../../components/common/Container'
import Menu from '../../components/common/Menu'
import PageTitle from '../../components/common/PageTitle'

const Dashboard = () => {
	return (
    <>
      <Menu />
      <Container className="dashboard-container">
        <PageTitle>Dashboard</PageTitle>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Expenses</h3>
          </div>

          <div className="dashboard-card">
            <h3>Incomes</h3>
          </div>
        </div>
      </Container>
    </>
	)
}

export default Dashboard