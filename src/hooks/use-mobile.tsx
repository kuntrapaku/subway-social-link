
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initialize with correct value based on current window width
    return typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  })

  React.useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check
    handleResize()

    // Set up event listener
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}
