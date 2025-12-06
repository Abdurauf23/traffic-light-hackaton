import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect } from 'react';
import { Scene } from './components/scene/Scene';
import { ControlPanel } from './components/ui/ControlPanel';
import { StatusBar } from './components/ui/StatusBar';
import { useIntersectionStore } from './stores/intersectionStore';
import { useConfigStore } from './stores/configStore';

function App() {
  const initializeIntersections = useIntersectionStore((s) => s.initializeIntersections);
  const intersectionCount = useConfigStore((s) => s.intersectionCount);

  useEffect(() => {
    initializeIntersections(intersectionCount);
  }, [intersectionCount, initializeIntersections]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Traffic Light Management Simulation</h1>
        <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
          AI-Powered 3D Traffic Optimization
        </p>
      </header>

      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Canvas
            camera={{ position: [30, 30, 30], fov: 50 }}
            shadows
            style={{ background: '#87CEEB' }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[10, 20, 10]}
              intensity={1}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <Scene />
            <OrbitControls enableDamping dampingFactor={0.05} />
          </Canvas>
        </div>

        <ControlPanel />
      </div>

      <StatusBar />
    </div>
  );
}

export default App;
