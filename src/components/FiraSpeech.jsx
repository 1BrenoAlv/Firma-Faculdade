import { useState, useEffect, useRef } from 'react'

/**
 * FiraSpeech — Speech bubble that shows contextual messages.
 * Has a typing effect when a new message appears.
 *
 * Props:
 *   - message: string text to display
 *   - visible: boolean to show/hide
 */
export default function FiraSpeech({ message, visible }) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const timerRef = useRef(null)
  const prevMessageRef = useRef('')

  useEffect(() => {
    // Only type if message changed
    if (message === prevMessageRef.current) return
    prevMessageRef.current = message

    // Clear any existing typing
    if (timerRef.current) clearInterval(timerRef.current)

    if (!message) {
      setDisplayedText('')
      setShowCursor(false)
      return
    }

    // Start typing effect
    setDisplayedText('')
    setShowCursor(true)
    let i = 0

    timerRef.current = setInterval(() => {
      if (i < message.length) {
        setDisplayedText(message.slice(0, i + 1))
        i++
      } else {
        clearInterval(timerRef.current)
        timerRef.current = null
        // Hide cursor after 2 seconds
        setTimeout(() => setShowCursor(false), 2000)
      }
    }, 30)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [message])

  return (
    <div className={`fira-speech ${visible ? 'active' : ''}`}>
      <div className="fira-speech__bubble">
        <div className="fira-speech__label">FIRA diz:</div>
        <div className="fira-speech__text">
          {displayedText}
          {showCursor && <span className="fira-speech__cursor"></span>}
        </div>
      </div>
    </div>
  )
}
