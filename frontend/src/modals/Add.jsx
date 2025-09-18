import { useEffect, useRef } from 'react'
import * as Yup from 'yup';
import axios from 'axios'
import { useFormik } from 'formik'
import { Button, Modal, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addChannel } from '../slices/channelsSlice'
import routes from '../routes'

const Add = ({ modalInfo, onHide, setCurrentChannelId }) => {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const dispatch = useDispatch()

  const channelsNames = useSelector((state) => state.channels.channels).map((channel) => channel.name)

  const { userId } = useSelector((state) => state.auth)
  const token = userId?.token

  const validationSchema = Yup.object().shape({
    name: Yup.string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .notOneOf(channelsNames, 'Должно быть уникальным')
  });

  const sendChannel = async (name) => {
    try {
      const responce = await axios.post(routes.channelsPath(), { name }, { headers: { Authorization: `Bearer ${token}`, }, })
      const newChannel = responce.data
      dispatch(addChannel(newChannel))
      setCurrentChannelId(newChannel.id)
    } catch (error) {
      console.log(error.message)
    }
  }

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      const { name } = values
      sendChannel(name)
      onHide()
    },
  })

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
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
            <Form.Label className='visually-hidden' htmlFor='name'>Имя канала</Form.Label>
            <div className='invalid-feedback'>{formik.errors.name && formik.touched.name ? formik.errors.name : ''}</div>
            <div className='d-flex justify-content-end'>
              <Button type='button' variant='secondary' className='me-2' onClick={() => onHide()}>Отменить</Button>
              <Button type='submit' variant='primary'>Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Add
