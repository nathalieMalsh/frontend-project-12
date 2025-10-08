import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ModalForm = ({ initialValues, onSubmit, onHide, isSubmitting }) => {
  const { t } = useTranslation()

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const channelsNames = useSelector(state => state.channels.channels).map(channel => channel.name)

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.symbolsLength'))
      .max(20, t('errors.symbolsLength'))
      .notOneOf(channelsNames, t('errors.mustBeUnique')),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit,
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          ref={inputRef}
          className={`mb-2 form-control ${formik.errors.name ? 'is-invalid' : ''}`}
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          required
        />
        <Form.Label className="visually-hidden" htmlFor="name">
          {t('modals.channelName')}
        </Form.Label>
        <div className="invalid-feedback">
          {formik.errors.name && formik.touched.name ? formik.errors.name : ''}
        </div>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={() => onHide()}>
            {t('modals.cancelButton')}
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {t('modals.sendButton')}
          </Button>
        </div>
      </Form.Group>
    </Form>
  )
}

export default ModalForm
