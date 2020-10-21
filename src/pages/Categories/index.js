import React, { Fragment, useEffect, useState } from 'react'
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify'

import useModal from 'react-hooks-use-modal'

import { SpaceHorizontal } from '../../components/common/Space'
import Label from '../../components/common/Label'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Menu from '../../components/common/Menu'
import PageTitle from '../../components/common/PageTitle'
import ModalContainer from '../../components/common/Modal'
import ErrorMessage from '../../components/common/ErrorMessage'

import { createCategory, getCategories, editCategory, deleteCategory } from '../../requests'
import { getCategoriesAction } from '../../store/ducks/category'

import './styles.css'

const Categories = () => {
	const dispatch = useDispatch()
	const [Modal, open, close] = useModal('root', {
		preventScroll: true
	})	
	const [ModalDelete, openModalDelete, closeModalDelete] = useModal('root', {
		preventScroll: true
	})	

	// Para saber se é edição ou criação
	const [formType, setFormType] = useState("")
	const [categoryId, setCategoryId] = useState(null)

	const { handleSubmit, register, errors, setValue } = useForm();

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

			close()
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

			closeModalDelete()
		} catch(error) {
			toast.error(error?.response?.data?.message || "Error!")
		}
	}

	const getData = async () => {
		try {
			const { data } = await getCategories({})

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
							open()
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
												await open()
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
												await openModalDelete()
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

			<Modal>
				<ModalContainer
          title={formType === 'create' ? 'Create Category' : 'Edit Category'}
        > 
          <form onSubmit={handleSubmit(submit)}>
						<Label>Name</Label>
						<Input 
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
			</Modal>

			<ModalDelete>
				<ModalContainer
					title="Delete"
					width={400}
					height={200}
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
			</ModalDelete>

			<ToastContainer />
		</>
	)
}

export default Categories