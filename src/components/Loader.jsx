import { useState, useEffect } from 'react'

export default function Loader({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // After 2.5s, start fade out
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500)
    // After 3.3s, remove from DOM
    const hideTimer = setTimeout(() => {
      setHidden(true)
      if (onFinish) onFinish()
    }, 3300)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [onFinish])

  if (hidden) return null

  return (
    <div className={`loader-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <img className="loader-logo-img" src="/images/logo.png" alt="Logo FIRMA" />
      <div className="loader-line"></div>
    </div>
  )
}
