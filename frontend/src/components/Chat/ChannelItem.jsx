import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'

const ChannelItem = ({ channel, currentChannelId, setCurrentChannelId, showModal }) => {
  const { t } = useTranslation()
  if (!channel.removable) {
    return (
      <li key={channel.id} className="nav-item w-100">
        <Button
          variant={`${channel.id === currentChannelId ? 'secondary' : 'white'}`}
          type="button"
          className="w-100 rounded-0 text-start"
          id="unremovable-channel-button"
          onClick={() => setCurrentChannelId(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </li>
    )
  }
  return (
    <li key={channel.id} className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={`${channel.id === currentChannelId ? 'secondary' : 'white'}`}
          type="button"
          className="w-100 rounded-0 text-start text-truncate"
          id="removable-channel-button-left"
          onClick={() => setCurrentChannelId(channel.id)}
        >
          <span className="me-1">#</span>
          {filter.clean(channel.name)}
        </Button>
        <Dropdown.Toggle
          variant={`${channel.id === currentChannelId ? 'secondary' : 'white'}`}
          type="button"
          id="removable-channel-button-right"
          className="flex-grow-0"
          split
        >
          <span className="visually-hidden">{t('channels.channelManagement')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item role="button" href="#" tabIndex={0} onClick={() => showModal('removing', channel)}>{t('channels.dropdownToggle.remove')}</Dropdown.Item>
          <Dropdown.Item role="button" href="#" tabIndex={0} onClick={() => showModal('renaming', channel)}>{t('channels.dropdownToggle.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  )
}

export default ChannelItem
