import React, { useEffect, useState } from 'react'
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify'

import Label from '../../components/common/Label'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Menu from '../../components/common/Menu'
import PageTitle from '../../components/common/PageTitle'
import ModalContainer from '../../components/common/ModalContainer'
import ErrorMessage from '../../components/common/ErrorMessage'

import { SpaceHorizontal } from '../../components/common/Space'
import { createTransaction, getUserTransactions, editTransaction, deleteTransaction, getCategories } from '../../requests'
import { getUserTransactionsAction } from '../../store/ducks/transaction'
import { getCategoriesAction } from '../../store/ducks/category'

import './styles.css'

const Transactions = () => {
	const dispatch = useDispatch()

	// Para saber se é edição ou criação
	const [formType, setFormType] = useState("")
	const [transactionId, setTransactionId] = useState(null)
	const [createModal, setCreateModal] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)

	const { handleSubmit, register, errors, setValue, reset } = useForm();

	const userTransactions = useSelector(state => {
		return state.transactionReducer.userTransactions
  })
  const categories = useSelector(state => {
		return state.categoryReducer.categories
	})

	const submit = async (values) => {
		const { name, type, transaction_category_id, amount } = values

		try {

			if (formType === 'create') {
				await createTransaction({ name, type, transaction_category_id, amount: Number(amount) })
			} else if (formType === 'edit') {
				await editTransaction({ id: transactionId, type, name, transaction_category_id, amount: Number(amount) })
			}

			await getAndSetTransactions()

			setTransactionId(null)

			toast.success('Success!')

			closeModalCreate()
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

	const closeModalDelete = () => {
		setDeleteModal(false)
	}

	const closeModalCreate = () => {
		setCreateModal(false)
		reset()
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
							setCreateModal(true)
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
								<th className="primary">Type</th>
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
									<td>{transaction?.type === 'expense' ? "Expense" : "Income"}</td>
                  <td>{transaction?.transaction_category?.name}</td>
                  <td>{transaction.amount}</td>
									<td>
										<RiEditLine 
											size={25} 
											height={25} 
											color="#77CC6E" 
											cursor="pointer"
											onClick={async () => {
												setCreateModal(true)
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
												setDeleteModal(true)
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

			<ModalContainer
				visible={createModal}
				title={formType === 'create' ? 'Create Transaction' : 'Edit Transaction'}
				height={500}
				onClose={() => closeModalCreate()}
			> 
				<form onSubmit={handleSubmit(submit)}>
					<Label>Category</Label>
					<Select
						className="transaction-input"
						name="type"
						ref={register({
							required: {
								value: true,
								message: "Type is required"
							},
						})}
					>
						<option key={"default"} value={null}></option>
						<option key={"expense"} value={"expense"}>Expense</option>
						<option key={"income"} value={"income"}>Income</option>
					</Select>
					<ErrorMessage>
						{errors.type && errors.type.message}
					</ErrorMessage>

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
							validate: {
								positive: value => {
									return parseInt(value, 10) > 0
								},
							}
						})}
					/>

					<ErrorMessage>
						{errors.amount && errors.amount.type === "positive" && (
							"Price should be positive"
						)}
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

			<ModalContainer
				visible={deleteModal}
				title="Delete"
				width={400}
				height={200}
				onClose={() => closeModalDelete()}
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

			<ToastContainer />
		</>
	)
}

export default Transactions