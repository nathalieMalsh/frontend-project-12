import { useState } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import routes from '../routes'

const Remove = ({ modalInfo, onHide, setCurrentChannelId }) => {
  const { t } = useTranslation()

  const { userId } = useSelector(state => state.auth)
  const token = userId?.token

  const [isRemoving, setRemoving] = useState(false)

  const handleRemove = async (e) => {
    e.preventDefault()
    setRemoving(true)
    try {
      axios.delete(`${routes.channelsPath()}/${modalInfo.item.id}`, { headers: { Authorization: `Bearer ${token}` } })
      setCurrentChannelId('1')
      onHide()
      toast.success(t('toast.removeChannel'))
    }
    catch (error) {
      console.log(error.message)
      toast.error(t('errors.toastRemoveChannel'))
    }
    setRemoving(false)
  }

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.question')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={() => onHide()}>{t('modals.cancelButton')}</Button>
          <Button type="button" variant="danger" onClick={handleRemove} disabled={isRemoving}>{t('modals.removeButton')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Remove
