import { useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import routes from '../routes'
import ModalForm from './ModalForm'

const Add = ({ onHide, setCurrentChannelId }) => {
  const { t } = useTranslation()

  const [isSubmitting, setSubmitting] = useState(false)

  const { userId } = useSelector(state => state.auth)
  const token = userId?.token

  const handleSubmit = async ({ name }) => {
    setSubmitting(true)
    try {
      const responce = await axios.post(routes.channelsPath(), { name }, { headers: { Authorization: `Bearer ${token}` } })
      const newChannel = responce.data
      setCurrentChannelId(newChannel.id)
      toast.success(t('toast.addChannel'))
    }
    catch (error) {
      console.log(error.message)
      toast.error(t('errors.toastAddChannel'))
    }
    setSubmitting(false)
    onHide()
  }

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ModalForm
          initialValues={{ name: '' }}
          onSubmit={handleSubmit}
          onHide={onHide}
          isSubmitting={isSubmitting}
        />
      </Modal.Body>
    </Modal>
  )
}

export default Add
