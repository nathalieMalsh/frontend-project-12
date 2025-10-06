import { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios'
import { useFormik } from 'formik'
import { Button, Modal, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import routes from '../routes'

const Add = ({ onHide, setCurrentChannelId }) => {
  const { t } = useTranslation()

  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const [isSubmitting, setSubmitting] = useState(false)

  const channelsNames = useSelector((state) => state.channels.channels).map((channel) => channel.name)

  const { userId } = useSelector((state) => state.auth)
  const token = userId?.token

  const validationSchema = Yup.object().shape({
    name: Yup.string()
    .trim()
    .required(t('errors.required'))
    .min(3, t('errors.symbolsLength'))
    .max(20, t('errors.symbolsLength'))
    .notOneOf(channelsNames, t('errors.mustBeUnique'))
  });

  const sendChannel = async (name) => {
    setSubmitting(true)
    try {
      const responce = await axios.post(routes.channelsPath(), { name }, { headers: { Authorization: `Bearer ${token}`, }, })
      const newChannel = responce.data
      setCurrentChannelId(newChannel.id)
      toast.success(t('toast.addChannel'))
    } catch (error) {
      console.log(error.message)
      toast.error(t('errors.toastAddChannel'))
    }
    setSubmitting(false)
  }

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values,) => {
      const { name } = values
      sendChannel(name)
      onHide()
    },
  })

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
             ref={inputRef}
              className={`mb-2 form-control ${formik.errors.name ? 'is-invalid' : ''}`}
              name='name'
              id='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
            <Form.Label className='visually-hidden' htmlFor='name'>{t('modals.channelName')}</Form.Label>
            <div className='invalid-feedback'>{formik.errors.name && formik.touched.name ? formik.errors.name : ''}</div>
            <div className='d-flex justify-content-end'>
              <Button type='button' variant='secondary' className='me-2' onClick={() => onHide()}>{t('modals.cancelButton')}</Button>
              <Button type='submit' variant='primary' disabled={isSubmitting}>{t('modals.sendButton')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Add
