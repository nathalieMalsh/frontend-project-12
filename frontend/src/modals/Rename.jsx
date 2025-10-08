import { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useFormik } from 'formik'
import { Button, Modal, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import routes from '../routes'
import ModalForm from './ModalForm'

const Rename = ({ modalInfo, onHide }) => {
  const { t } = useTranslation()

  const [isSubmitting, setSubmitting] = useState(false)

  const channelsNames = useSelector(state => state.channels.channels).map(channel => channel.name)

  const { userId } = useSelector(state => state.auth)
  const token = userId?.token

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.symbolsLength'))
      .max(20, t('errors.symbolsLength'))
      .notOneOf(channelsNames, t('errors.mustBeUnique')),
  })

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
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onHide={onHide}
          isSubmitting={isSubmitting}
        />
      </Modal.Body>
    </Modal>
  )
}

export default Rename
