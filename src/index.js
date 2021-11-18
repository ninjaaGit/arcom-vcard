import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import IndexProvider from './context/index'

ReactDOM.render(
  <React.StrictMode>
    <IndexProvider>
      <App />
    </IndexProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
