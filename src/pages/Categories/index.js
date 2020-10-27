import React, { Fragment, useEffect, useState } from 'react'
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify'

import { SpaceHorizontal } from '../../components/common/Space'
import Label from '../../components/common/Label'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Menu from '../../components/common/Menu'
import PageTitle from '../../components/common/PageTitle'
import ModalContainer from '../../components/common/ModalContainer'
import ErrorMessage from '../../components/common/ErrorMessage'

import { createCategory, getUserCategories, editCategory, deleteCategory } from '../../requests'
import { getCategoriesAction } from '../../store/ducks/category'

import './styles.css'

const Categories = () => {
	const dispatch = useDispatch()

	// Para saber se é edição ou criação
	const [createModal, setCreateModal] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)
	const [formType, setFormType] = useState("")
	const [categoryId, setCategoryId] = useState(null)

	const { handleSubmit, register, errors, setValue, reset } = useForm();

	const categories = useSelector(state => {
		return state.categoryReducer.categories
	})

	const submit = async (values) => {
		const { name } = values

		try {

			if (formType === 'create') {
				await createCategory({ name })
			} else if (formType === 'edit') {
				await editCategory({ id: categoryId, name  })
			}

			await getData()

			setCategoryId(null)

			toast.success('Success!')

			setCreateModal(false)

			reset()
		} catch(error) {
			toast.error(error?.response?.data?.message || "Error!")
		}
	}

	const confirmDelete = async () => {
		try {
			await deleteCategory({ id: categoryId })

			await getData()

			setCategoryId(null)

			toast.success('Success!')

			setDeleteModal(false)
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

	const getData = async () => {
		try {
			const { data } = await getUserCategories({})

			await dispatch(getCategoriesAction({ categories: data }))
		} catch(error) {
			toast.error(error?.response?.data?.message || "Error!")
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			<Menu />
			<Container className="categories-container">

				<PageTitle>
					Categories
					<Button 
						color="primary" 
						onClick={() => {
							setFormType("create")
							setCreateModal(true)
						}}
						className="new-category-button"
					>
						New Category
					</Button>
				</PageTitle>

				<div>
					<table className="categories-table">
						<thead>
							<tr>
								<th className="primary">Id</th>
								<th className="primary">Category</th>
								<th className="primary">Actions</th>
							</tr>
						</thead>
						<tbody>
						{
							categories.map(category => (
								<tr key={category.id}>
									<td>{category.id}</td>
									<td>{category.name}</td>
									<td>
										<RiEditLine 
											size={25} 
											height={25} 
											color="#77CC6E" 
											cursor="pointer"
											onClick={async () => {
												await setCreateModal(true)
												setFormType("edit")
												setCategoryId(category.id)
												setValue('name', category.name)
											}}
										/>
										<SpaceHorizontal />
										<RiDeleteBinLine 
											size={25} 
											height={25} 
											color="#77CC6E" 
											cursor="pointer"
											onClick={async () => {
												await setDeleteModal(true)
												setCategoryId(category.id)
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
				title={formType === 'create' ? 'Create Category' : 'Edit Category'}
				onClose={() => closeModalCreate()}
			> 
				<form onSubmit={handleSubmit(submit)}>
					<Label>Name</Label>
					<Input 
						type="text"
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

					<Button 
						color="primary" 
						className="category-modal-submit-button" 
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
				<p>Do you really want to delete this category?</p>
				<div className="category-modal-delete-buttons">
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

export default Categories