import * as Yup from 'yup'

const getSignUpSchema = t => Yup.object().shape({
  username: Yup.string()
    .trim()
    .required(t('errors.required'))
    .min(3, t('errors.symbolsLength'))
    .max(20, t('errors.symbolsLength')),
  password: Yup.string()
    .trim()
    .required(t('errors.required'))
    .min(6, t('errors.minPasswordLength')),
  confirmPassword: Yup.string()
    .trim()
    .required(t('errors.required'))
    .oneOf([Yup.ref('password'), null], t('errors.confirmPassword')),
})

export default getSignUpSchema
