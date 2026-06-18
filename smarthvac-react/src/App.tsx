import { useEffect, useRef } from 'react'
import { bodyHtml } from './htmlContent'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    
    // Inject the original app logic as a script tag
    // This ensures it runs after the HTML is fully in the DOM
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = '/app-logic.js'
    document.body.appendChild(script)
  }, [])

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  )
}

export default App
