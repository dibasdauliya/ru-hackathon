import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UploadAvatar from './components/UploadAvatar.jsx'
import { Auth0ProviderWithNavigate } from './auth0-provider.jsx'
import MainPage from './components/MainPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/upload-avatar' element={<UploadAvatar />} />
        </Routes>
      </Auth0ProviderWithNavigate>
    </Router>
  </React.StrictMode>
)
