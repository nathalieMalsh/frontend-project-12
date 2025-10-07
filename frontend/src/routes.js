const apiPath = '/api/v1'

export default {
  signupPath: () => [apiPath, 'signup'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  addMessagePath: () => [apiPath, 'messages'].join('/'),
}
