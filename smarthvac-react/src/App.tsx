import { useEffect, useRef } from 'react'
import { bodyHtml } from './htmlContent'
import { initAppLogic } from './appLogic'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    // The logic is already initialized via the script tag approach
    // We run it after the DOM is ready
    try {
      initAppLogic()
    } catch (e) {
      console.error('App init error:', e)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  )
}

export default App
