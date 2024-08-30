import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrthographicCamera, Stats } from '@react-three/drei';
import Grid from './components/Grid';
import { Perf } from 'r3f-perf'
import UI from './components/UI';
import useStore from './store';
import './App.css'
import { Suspense } from 'react';
import TexturePreloader from './components/TexturePreloader';

function CameraController() {
  const { isDragging, setIsDragging } = useStore();
  const { camera, gl } = useThree();

  const minZoom = 50;
  const maxZoom = 700;
  const zoomSpeed = 10;
  const panSpeed = 1;

  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      const newZoom = camera.zoom - event.deltaY * 0.01 * zoomSpeed;
      camera.zoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
      camera.updateProjectionMatrix();
    };

    const handleMouseDown = (event) => {
      setIsDragging(true);
      lastPosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;

      const deltaX = (event.clientX - lastPosition.current.x) * 0.0008 * panSpeed;
      const deltaY = (event.clientY - lastPosition.current.y) * 0.0008 * panSpeed;

      camera.position.x -= deltaX * (camera.right - camera.left) / camera.zoom;
      camera.position.y += deltaY * (camera.top - camera.bottom) / camera.zoom;

      lastPosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const domElement = gl.domElement;
    domElement.addEventListener('wheel', handleWheel, { passive: false });
    domElement.addEventListener('mousedown', handleMouseDown);
    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('mouseleave', handleMouseUp);

    return () => {
      domElement.removeEventListener('wheel', handleWheel);
      domElement.removeEventListener('mousedown', handleMouseDown);
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [camera, gl.domElement, isDragging]);

  return null;
}

function App() {
  const preloadedTextures = useStore(state => state.preloadedTextures);

  return (
    <>
      <UI />
      <Canvas style={{ background: 'lightblue', height: '100vh' }}>
        <TexturePreloader />
        <OrthographicCamera
          makeDefault
          zoom={100}
          position={[-5, 5, 5]}
          rotation={[-Math.PI / 4, 0, 0]}
        />
        <Suspense fallback={null}>
          {preloadedTextures && <Grid />}
        </Suspense>
        <CameraController />
        {/* <Perf position="bottom-left" deepAnalyze /> */}
        <Stats className="stats" />
      </Canvas>
    </>
  );
}

export default App;