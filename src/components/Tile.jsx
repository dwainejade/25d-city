import React, { useState, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import useStore from '../store';
import * as THREE from 'three';

const Tile = ({ position, tileKey }) => {
    const { tiles, setTileType, selectedTileType, preloadedTextures } = useStore();
    const tileType = tiles[tileKey] || 'grass';

    const texture = preloadedTextures ? preloadedTextures[tileType] : null;

    const [hovered, setHovered] = useState(false);
    const { gl } = useThree();

    // Create outline geometry
    const outlineGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1)), []);

    if (!texture) return null; // Don't render if textures aren't loaded yet

    return (
        <group position={position}>
            <mesh
                onClick={(e) => {
                    e.stopPropagation();
                    setTileType(tileKey, selectedTileType);
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    gl.domElement.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    gl.domElement.style.cursor = 'default';
                }}
            >
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    map={texture}
                    transparent={true}
                    color={hovered ? 'red' : 'white'}
                />
            </mesh>

            {/* Outline mesh */}
            <lineSegments geometry={outlineGeometry}>
                <lineBasicMaterial color="black" linewidth={2} />
            </lineSegments>
        </group>
    );
};

export default Tile;