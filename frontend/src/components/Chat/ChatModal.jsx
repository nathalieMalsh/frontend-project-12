import getModal from '../../modals/index.js'

const ChatModal = ({ modalInfo, hideModal, setCurrentChannelId }) => {
  if (!modalInfo.type) {
    return null
  }
  const Component = getModal(modalInfo.type)
  return <Component modalInfo={modalInfo} onHide={hideModal} setCurrentChannelId={setCurrentChannelId} />
}

export default ChatModal
