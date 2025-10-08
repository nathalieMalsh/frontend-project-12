import { useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import routes from '../routes'
import ModalForm from './ModalForm'

const Rename = ({ modalInfo, onHide }) => {
  const { t } = useTranslation()

  const [isSubmitting, setSubmitting] = useState(false)

  const { userId } = useSelector(state => state.auth)
  const token = userId?.token

  const handleSubmit = async ({ name }) => {
    setSubmitting(true)
    try {
      axios.patch(`${routes.channelsPath()}/${modalInfo.item.id}`, { name }, { headers: { Authorization: `Bearer ${token}` } })
      toast.success(t('toast.renameChannel'))
    }
    catch (error) {
      console.log(error.message)
      toast.error(t('errors.toastRenameChannel'))
    }
    setSubmitting(false)
    onHide()
  }

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ModalForm
          initialValues={modalInfo.item}
          onSubmit={handleSubmit}
          onHide={onHide}
          isSubmitting={isSubmitting}
        />
      </Modal.Body>
    </Modal>
  )
}

export default Rename
