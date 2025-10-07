import { useTranslation } from 'react-i18next'
import Header from '../components/Header'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <div>
        <h1>{t('notFoundPage.h1')}</h1>
      </div>
    </div>
  )
}

export default NotFoundPage
