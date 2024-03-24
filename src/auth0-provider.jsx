import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate()

  const domain = 'dev-5338u8r41xv1ecdv.us.auth0.com'
  const clientId = 'EoAxgW0UNatlep1ne0K9oscBo4xy7r1x'
  const redirectUri = window.location.origin

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(domain && clientId && redirectUri)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  )
}
