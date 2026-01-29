import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .interactive')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .interactive')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(0, 200, 150, 0.3)' : 'transparent'
        }}
      />
      <motion.div
        className="custom-cursor-dot"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          scale: isClicking ? 0.5 : 1
        }}
      />
    </>
  )
}

export default Cursor
