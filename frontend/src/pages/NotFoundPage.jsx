import { useTranslation } from 'react-i18next'
import Header from '../components/Header.jsx'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <div className="text-center">
        <img src="https://frontend-chat-ru.hexlet.app/assets/404-D_FLHmTM.svg" alt={t('notFoundPage.altText')} className="img-fluid h-25" />
        <h1 className="h4 text-muted">{t('notFoundPage.h1')}</h1>
        <p className="text-muted">
          {t('notFoundPage.p')}
          <a href="/">{t('notFoundPage.a')}</a>
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
