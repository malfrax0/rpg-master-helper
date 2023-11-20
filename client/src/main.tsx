import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import AuthenticationProvider from './Context/Authentication.Auth0';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      clientId='a84V8ZZDddkEFlK4X5qxJQZ8wbMGynIJ'
      domain='dev-f2j2i7hzv41g8lge.us.auth0.com'
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://api.roleplayinghelper.com"
      }}
    >
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </Auth0Provider>
  </React.StrictMode>
);
