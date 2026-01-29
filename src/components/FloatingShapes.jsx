import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Individual floating shape component
const FloatingShape = ({ position, geometry, color, speed, distort, scale }) => {
  const meshRef = useRef()
  const { mouse } = useThree()
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x += 0.003 * speed
      meshRef.current.rotation.y += 0.005 * speed
      
      // Mouse follow with smooth damping
      const targetX = position[0] + mouse.x * 0.5
      const targetY = position[1] + mouse.y * 0.5
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02
    }
  })

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
        {geometry === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1]} />}
        {geometry === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />}
        
        {distort ? (
          <MeshDistortMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.8}
          />
        ) : (
          <MeshWobbleMaterial
            color={color}
            roughness={0.1}
            metalness={0.9}
            factor={0.2}
            speed={1}
            transparent
            opacity={0.7}
          />
        )}
      </mesh>
    </Float>
  )
}

// Glowing ring component
const GlowRing = ({ position, scale, color }) => {
  const ringRef = useRef()
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      ringRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={ringRef} position={position} scale={scale}>
      <torusGeometry args={[2, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

// Particle field component
const ParticleField = () => {
  const particlesRef = useRef()
  const count = 100
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
      particlesRef.current.rotation.x += 0.0002
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00c896"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

const FloatingShapes = () => {
  return (
    <group>
      {/* Main accent shapes */}
      <FloatingShape
        position={[4, 1, -2]}
        geometry="icosahedron"
        color="#00c896"
        speed={1.2}
        distort={true}
        scale={1.5}
      />
      
      <FloatingShape
        position={[-3, -2, -1]}
        geometry="torus"
        color="#00e6ac"
        speed={0.8}
        distort={false}
        scale={1}
      />
      
      <FloatingShape
        position={[5, -1, -3]}
        geometry="octahedron"
        color="#00c896"
        speed={1}
        distort={true}
        scale={0.8}
      />
      
      <FloatingShape
        position={[-4, 2, -2]}
        geometry="sphere"
        color="#ffffff"
        speed={0.6}
        distort={true}
        scale={0.6}
      />
      
      <FloatingShape
        position={[2, 3, -4]}
        geometry="torusKnot"
        color="#00c896"
        speed={0.5}
        distort={false}
        scale={0.5}
      />

      {/* Decorative rings */}
      <GlowRing position={[3, 0, -5]} scale={1} color="#00c896" />
      <GlowRing position={[-2, 1, -6]} scale={0.7} color="#00e6ac" />
      
      {/* Background particles */}
      <ParticleField />
    </group>
  )
}

export default FloatingShapes
