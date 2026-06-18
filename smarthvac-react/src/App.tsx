import { useEffect, useRef } from 'react'
import { bodyHtml } from './htmlContent'
import { initAppLogic } from './appLogic'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    // Small delay to ensure DOM is fully rendered before running logic
    setTimeout(() => {
      try {
        initAppLogic()
      } catch (e) {
        console.error('SmartHVAC init error:', e)
      }
    }, 50)
  }, [])

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  )
}

export default App
