import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import FloatingShapes from './FloatingShapes'

const Scene3D = () => {
  return (
    <div className="scene3d-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Ambient light for overall illumination */}
          <ambientLight intensity={0.2} />
          
          {/* Main directional light */}
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            color="#ffffff"
          />
          
          {/* Accent light with brand color */}
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.5}
            color="#8b7355"
          />
          
          {/* Additional rim light */}
          <pointLight
            position={[5, -5, 10]}
            intensity={0.3}
            color="#a08060"
          />
          
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D
