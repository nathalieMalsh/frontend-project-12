import { Provider } from 'react-redux'
import { io } from 'socket.io-client'
import i18next from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import store from './store/store.js'
import { addMessage } from './store/slices/messagesSlice.jsx'
import { addChannel, removeChannel, renameChannel } from './store/slices/channelsSlice.jsx'
import resources from './locales/ru.js'
import App from './App.jsx'

i18next
  .use(initReactI18next)
  .init({
    resources,
    debug: false,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

filter.add(filter.getDictionary('ru'))
filter.add(filter.getDictionary('en'))

const socket = io()

socket.on('connect', () => {
  console.log('Соединение с сервером установлено')
})

socket.on('disconnect', () => {
  console.log('Соединение с сервером потеряно')
  toast.error(i18next.t('errors.server'))
})

socket.on('newMessage', (payload) => {
  store.dispatch(addMessage(payload))
})

socket.on('newChannel', (payload) => {
  store.dispatch(addChannel(payload))
})

socket.on('removeChannel', (payload) => {
  store.dispatch(removeChannel(payload.id))
})

socket.on('renameChannel', (payload) => {
  store.dispatch(renameChannel(payload))
})

const rollbarConfig = {
  accessToken: 'abdfc76d83a941f9940b1b5b1ac34bcacee5bc9abdbe6ad496a102764fe8c1853bdbf5340b0dccbaf6d5fea565a12fd5',
  environment: 'development',
}

const init = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  </Provider>
)

export default init
