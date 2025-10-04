import { Col, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ChannelItem from './ChannelItem'

const Channels = ({ channels, currentChannelId, setCurrentChannelId, showModal }) => {
  const { t } = useTranslation()
  return (
    <Col xs={4} md={2} className='border-end px-0 bg-light flex-column h-100 d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>{t('channels.channels')}</b>
        <Button variant='outline-primary' className='p-0 text-primary btn btn-group-vertical' onClick={() => showModal('adding')}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20' height='20' fill='currentColor' className='bi bi-plus-square'>
              <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z'/>
              <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4'/>
          </svg>
          <span className='visually-hidden'>{t('channels.add')}</span>
        </Button>
      </div>
      <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            currentChannelId={currentChannelId}
            setCurrentChannelId={setCurrentChannelId}
            showModal={showModal} 
          />
        ))}
      </ul>
    </Col>
  )
}

export default Channels