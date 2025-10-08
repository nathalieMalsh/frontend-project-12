import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ModalForm = ({ initialValues, validationSchema, onSubmit, onHide, isSubmitting }) => {
  const { t } = useTranslation()

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

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
