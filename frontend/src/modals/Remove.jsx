import { useEffect, useRef } from 'react'
import * as Yup from 'yup';
import axios from 'axios'
import { useFormik } from 'formik'
import { Button, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { removeChannel } from '../slices/channelsSlice'
import routes from '../routes'

const Remove = ({ modalInfo, onHide, setCurrentChannelId }) => {
  const dispatch = useDispatch()

  const { userId } = useSelector((state) => state.auth)
  const token = userId?.token

  const handleRemove = async (e) => {
    e.preventDefault()
    try {
      const responce = await axios.delete(`${routes.channelsPath()}/${modalInfo.item.id}`, { headers: { Authorization: `Bearer ${token}`, },})
      const { id } = responce.data
      dispatch(removeChannel(id))
      setCurrentChannelId('1')
      onHide()
    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='lead'>Уверены?</p> 
        <div className='d-flex justify-content-end'>
          <Button type='button' variant='secondary' className='me-2' onClick={() => onHide()}>Отменить</Button>
          <Button type='button' variant='danger' onClick={handleRemove}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Remove