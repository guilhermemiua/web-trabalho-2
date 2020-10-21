import React, { Fragment, useEffect, useState } from 'react'
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify'

import useModal from 'react-hooks-use-modal'

import Label from '../../components/common/Label'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Menu from '../../components/common/Menu'
import PageTitle from '../../components/common/PageTitle'
import ModalContainer from '../../components/common/Modal'
import ErrorMessage from '../../components/common/ErrorMessage'

import { SpaceHorizontal } from '../../components/common/Space'
import { createTransaction, getUserTransactions, editTransaction, deleteTransaction, getCategories } from '../../requests'
import { getUserTransactionsAction } from '../../store/ducks/transaction'
import { getCategoriesAction } from '../../store/ducks/category'

import './styles.css'

const Transactions = () => {
	const dispatch = useDispatch()
	const [Modal, open, close] = useModal('root', {
		preventScroll: true
	})	
	const [ModalDelete, openModalDelete, closeModalDelete] = useModal('root', {
		preventScroll: true
	})	

	// Para saber se é edição ou criação
	const [formType, setFormType] = useState("")
	const [transactionId, setTransactionId] = useState(null)

	const { handleSubmit, register, errors, setValue } = useForm();

	const userTransactions = useSelector(state => {
		return state.transactionReducer.userTransactions
  })
  const categories = useSelector(state => {
		return state.categoryReducer.categories
	})

	const submit = async (values) => {
		const { name, transaction_category_id, amount } = values

		try {

			if (formType === 'create') {
				await createTransaction({ name, transaction_category_id, amount: Number(amount) })
			} else if (formType === 'edit') {
				await editTransaction({ id: transactionId, name, transaction_category_id, amount: Number(amount) })
			}

			await getAndSetTransactions()

			setTransactionId(null)

			toast.success('Success!')

			close()
		} catch(error) {
			toast.error(error?.response?.data?.message || "Error!")
		}
	}

	const confirmDelete = async () => {
		try {
			await deleteTransaction({ id: transactionId })

			await getAndSetTransactions()

			setTransactionId(null)

			toast.success('Success!')

			closeModalDelete()
		} catch(error) {
			toast.error(error?.response?.data?.message || "Error!")
		}
	}

	const getAndSetTransactions = async () => {
		try {
      const { data } = await getUserTransactions({})

			await dispatch(getUserTransactionsAction({ userTransactions: data }))
		} catch(error) {
			toast.error(error?.response?.data?.message || "Error!")
		}
  }
  
  const getAndSetCategories = async () => {
		try {
			const { data } = await getCategories({})

			await dispatch(getCategoriesAction({ categories: data }))
		} catch(error) {
			toast.error(error?.response?.data?.message || "Error!")
		}
	}

	useEffect(() => {
    getAndSetTransactions()
    getAndSetCategories()
	}, [])

	return (
		<>
			<Menu />
			<Container>

				<PageTitle>
					Transactions
					<Button 
						color="primary" 
						onClick={() => {
							setFormType("create")
							open()
						}}
						className="new-transaction-button"
					>
						New Transaction
					</Button>
				</PageTitle>

				<div>
					<table className="transactions-table">
						<thead>
							<tr>
								<th className="primary">Id</th>
								<th className="primary">Name</th>
                <th className="primary">Category</th>
                <th className="primary">Amount</th>
								<th className="primary">Actions</th>
							</tr>
						</thead>
						<tbody>
						{
							userTransactions.map(transaction => (
								<tr key={transaction.id}>
									<td>{transaction.id}</td>
									<td>{transaction.name}</td>
                  <td>{transaction?.transaction_category?.name}</td>
                  <td>{transaction.amount}</td>
									<td>
										<RiEditLine 
											size={25} 
											height={25} 
											color="#77CC6E" 
											cursor="pointer"
											onClick={async () => {
												await open()
												setFormType("edit")
												setTransactionId(transaction.id)
                        setValue('name', transaction.name)
                        setValue('transaction_category_id', transaction.transaction_category_id)
                        setValue('amount', transaction.amount)
											}}
										/>
										<SpaceHorizontal />
										<RiDeleteBinLine 
											size={25} 
											height={25} 
											color="#77CC6E" 
											cursor="pointer"
											onClick={async () => {
												await openModalDelete()
												setTransactionId(transaction.id)
											}}
										/>
									</td>
								</tr>
							))
						}
						</tbody>
					</table>
				</div>
			</Container>

			<Modal>
				<ModalContainer
          title={formType === 'create' ? 'Create Transaction' : 'Edit Transaction'}
        > 
          <form onSubmit={handleSubmit(submit)}>
						<Label>Name</Label>
            <Input 
              className="transaction-input"
							name="name"
							ref={register({
								required: {
									value: true,
									message: "Name is required"
								},
							})}
						/>
            <ErrorMessage>
						  {errors.name && errors.name.message}
            </ErrorMessage>

            <Label>Category</Label>
            <Select
              className="transaction-input"
							name="transaction_category_id"
							ref={register({
								required: {
									value: true,
									message: "Category is required"
								},
							})}
						>
              <option key={"default"} value={null}></option>
              {
                categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))
              }
            </Select>

            <ErrorMessage>
						  {errors.transaction_category_id && errors.transaction_category_id.message}
            </ErrorMessage>

            <Label>Price</Label>
            <Input 
              name="amount"
							ref={register({
								required: {
									value: true,
									message: "Price is required"
                },
							})}
						/>

            <ErrorMessage>
						  {errors.amount && errors.amount.message}
            </ErrorMessage>

						<Button 
							color="primary" 
							className="transaction-modal-submit-button" 
							type="submit"
						>
							{formType === 'create' ? 'Create' : 'Edit'}
						</Button>
					</form>
			 	</ModalContainer>
			</Modal>

			<ModalDelete>
				<ModalContainer
					title="Delete"
					width={400}
					height={200}
        > 
					<p>Do you really want to delete this transaction?</p>
					<div className="transaction-modal-delete-buttons">
						<Button 
							color="ghost" 
							onClick={() => closeModalDelete()}
						>
							Cancel
						</Button>
						<SpaceHorizontal />
						<Button 
							color="primary" 
							onClick={() => confirmDelete()}
						>
							Delete
						</Button>
					</div>
			 	</ModalContainer>
			</ModalDelete>

			<ToastContainer />
		</>
	)
}

export default Transactions