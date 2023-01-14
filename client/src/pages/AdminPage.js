import React from 'react'
import CreateItemModal from '../components/modals/CreateItemModal'
import CreateTypeBrandModal from '../components/modals/CreateTypeBrandModal'

const AdminPage = () => {

  return (
    <>
    <CreateItemModal />
    <CreateTypeBrandModal modalTitle='type' modalType='text'/>
    <CreateTypeBrandModal modalTitle='brand' modalType='text'/>
    </>
  )
}

export default AdminPage