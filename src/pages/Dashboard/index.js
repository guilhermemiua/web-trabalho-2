import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { SpaceHorizontal } from '../../components/common/Space'
import { getUserTransactions } from '../../requests'

import Container from '../../components/common/Container'
import Menu from '../../components/common/Menu'
import PageTitle from '../../components/common/PageTitle'

import './styles.css'

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)

	const getAndSetTransactions = async () => {
		try {
      const { data } = await getUserTransactions({})

      data.map(userTransaction => {
        if (userTransaction.type === 'expense') {
          setTotalExpenses(oldValue => oldValue + Number(userTransaction.amount))
        } else if (userTransaction.type === 'income') {
          setTotalIncome(oldValue => oldValue + Number(userTransaction.amount))
        }
      })
		} catch(error) {
			toast.error(error?.response?.data?.message || "Error!")
		}
  }

  useEffect(() => {
    getAndSetTransactions()
  }, [])

	return (
    <>
      <Menu />
      <Container className="dashboard-container">
        <PageTitle>Dashboard</PageTitle>
        <div className="dashboard-cards">
          <div className="dashboard-card primary">
            <h3>TOTAL MONEY</h3>
            <h3>{totalIncome - totalExpenses}</h3>
          </div>

          <SpaceHorizontal />

          <div className="dashboard-card primary">
            <h3>TOTAL INCOME</h3>
            <h3>{totalIncome}</h3>
          </div>

          <SpaceHorizontal />

          <div className="dashboard-card primary">
            <h3>TOTAL EXPENSES</h3>
            <h3>-{totalExpenses}</h3>
          </div>
        </div>
      </Container>

			<ToastContainer />
    </>
	)
}

export default Dashboard