import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// AOS - Animate On Scroll
import AOS from 'aos'
import 'aos/dist/aos.css'

// Custom styles (after Bootstrap to override)
import './index.css'

// Initialize AOS
AOS.init({
  duration: 1000,
  once: false,
  easing: 'ease-out-cubic',
  offset: 80,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
