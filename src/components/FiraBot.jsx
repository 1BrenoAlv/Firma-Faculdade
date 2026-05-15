import { useEffect, useRef } from 'react'

/**
 * FiraBot — Mini robot that floats in bottom-right corner.
 * Eyes follow the mouse cursor.
 */
export default function FiraBot() {
  const botRef = useRef(null)
  const pupilLRef = useRef(null)
  const pupilRRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    const MAX_PUPIL = 4
    const MAX_TILT = 6

    function handleMouseMove(e) {
      const bot = botRef.current
      if (!bot) return

      const rect = bot.getBoundingClientRect()
      const botCenterX = rect.left + rect.width / 2
      const botCenterY = rect.top + rect.height * 0.35

      const dx = e.clientX - botCenterX
      const dy = e.clientY - botCenterY
      const dist = Math.sqrt(dx * dx + dy * dy)

      const factor = Math.min(dist / 300, 1)
      const px = (dx / (dist || 1)) * MAX_PUPIL * factor
      let py = (dy / (dist || 1)) * MAX_PUPIL * factor
      py = Math.max(-MAX_PUPIL * 0.7, Math.min(MAX_PUPIL * 0.7, py))

      if (pupilLRef.current) {
        pupilLRef.current.setAttribute('transform', `translate(${px},${py})`)
      }
      if (pupilRRef.current) {
        pupilRRef.current.setAttribute('transform', `translate(${px},${py})`)
      }
      if (bodyRef.current) {
        const tilt = (dx / (dist || 1)) * MAX_TILT * factor
        bodyRef.current.style.transform = `rotate(${tilt}deg)`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fira-bot" ref={botRef} aria-label="FIRA — Assistente virtual interativa">
      <svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <defs>
          <linearGradient id="botBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2a2d"/>
            <stop offset="50%" stopColor="#0f1c1e"/>
            <stop offset="100%" stopColor="#0a1214"/>
          </linearGradient>
          <linearGradient id="botFaceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#142020"/>
            <stop offset="100%" stopColor="#0d1818"/>
          </linearGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00FFE0" stopOpacity="1"/>
            <stop offset="70%" stopColor="#00E5D4" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#00B4A6" stopOpacity="0"/>
          </radialGradient>
          <filter id="botGlow">
            <feGaussianBlur stdDeviation="2"/>
          </filter>
        </defs>

        <g className="fira-bot__body" ref={bodyRef}>
          {/* Antenna */}
          <line x1="40" y1="12" x2="40" y2="0" stroke="#00E5D4" strokeWidth="1.5" strokeLinecap="round"/>
          <circle className="fira-bot__antenna-light" cx="40" cy="0" r="3" fill="#00FFE0" filter="url(#botGlow)"/>

          {/* Head */}
          <rect x="14" y="12" width="52" height="42" rx="14" ry="14"
                fill="url(#botBodyGrad)" stroke="#00E5D4" strokeWidth="1"/>

          {/* Face plate */}
          <rect x="20" y="18" width="40" height="30" rx="10" ry="10"
                fill="url(#botFaceGrad)" stroke="rgba(0,229,212,0.2)" strokeWidth="0.5"/>

          {/* Eye sockets */}
          <ellipse cx="31" cy="33" rx="8" ry="7" fill="rgba(0,229,212,0.08)" stroke="rgba(0,229,212,0.15)" strokeWidth="0.5"/>
          <ellipse cx="49" cy="33" rx="8" ry="7" fill="rgba(0,229,212,0.08)" stroke="rgba(0,229,212,0.15)" strokeWidth="0.5"/>

          {/* Eye glow */}
          <circle cx="31" cy="33" r="5" fill="url(#eyeGlow)" opacity="0.3" filter="url(#botGlow)"/>
          <circle cx="49" cy="33" r="5" fill="url(#eyeGlow)" opacity="0.3" filter="url(#botGlow)"/>

          {/* Left pupil */}
          <g ref={pupilLRef} className="fira-bot__pupil">
            <circle cx="31" cy="33" r="3.5" fill="#00FFE0"/>
            <circle cx="31" cy="32" r="1.5" fill="#ffffff" opacity="0.7"/>
          </g>

          {/* Right pupil */}
          <g ref={pupilRRef} className="fira-bot__pupil">
            <circle cx="49" cy="33" r="3.5" fill="#00FFE0"/>
            <circle cx="49" cy="32" r="1.5" fill="#ffffff" opacity="0.7"/>
          </g>

          {/* Eyelids (blink) */}
          <rect className="fira-bot__eyelid" x="23" y="26" width="16" height="14" rx="7" fill="#0f1c1e"/>
          <rect className="fira-bot__eyelid" x="41" y="26" width="16" height="14" rx="7" fill="#0f1c1e"/>

          {/* Mouth */}
          <path d="M34,43 Q40,46 46,43" fill="none" stroke="#00E5D4" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>

          {/* Neck */}
          <rect x="34" y="54" width="12" height="6" rx="2" fill="#0f1c1e" stroke="#00E5D4" strokeWidth="0.5" opacity="0.6"/>

          {/* Body */}
          <path d="M20,60 Q18,62 16,75 Q14,88 22,92 L58,92 Q66,88 64,75 Q62,62 60,60Z"
                fill="url(#botBodyGrad)" stroke="#00E5D4" strokeWidth="1"/>

          {/* Chest light */}
          <circle cx="40" cy="76" r="4" fill="none" stroke="#00E5D4" strokeWidth="0.8" opacity="0.5">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="40" cy="76" r="2" fill="#00FFE0" opacity="0.6">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite"/>
          </circle>

          {/* Arms */}
          <path d="M16,65 Q8,70 6,80 Q5,86 10,88" fill="none" stroke="#00E5D4" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
          <path d="M64,65 Q72,70 74,80 Q75,86 70,88" fill="none" stroke="#00E5D4" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>

          {/* Feet */}
          <rect x="22" y="92" width="14" height="6" rx="3" fill="#0a1214" stroke="#00E5D4" strokeWidth="0.5" opacity="0.6"/>
          <rect x="44" y="92" width="14" height="6" rx="3" fill="#0a1214" stroke="#00E5D4" strokeWidth="0.5" opacity="0.6"/>

          {/* Base glow */}
          <ellipse cx="40" cy="102" rx="24" ry="4" fill="#00E5D4" opacity="0.1">
            <animate attributeName="opacity" values="0.06;0.15;0.06" dur="3s" repeatCount="indefinite"/>
          </ellipse>
        </g>
      </svg>
    </div>
  )
}
