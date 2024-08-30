import React, { useState, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import useStore from '../store';
import * as THREE from 'three';

const createTileShape = (tileType) => {
    const shape = new THREE.Shape();

    switch (tileType) {
        case 'grass':
            // Diamond shape for grass tiles
            shape.moveTo(0, 0.5);
            shape.lineTo(0.5, 0);
            shape.lineTo(0, -0.5);
            shape.lineTo(-0.5, 0);
            break;
        case 'house':
            // House shape (example)
            shape.moveTo(0, 0.5);
            shape.lineTo(0.5, 0);
            shape.lineTo(0.5, -0.3);
            shape.lineTo(0, -0.5);
            shape.lineTo(-0.5, -0.3);
            shape.lineTo(-0.5, 0);
            shape.lineTo(-0.3, 0.2);  // Roof peak
            break;
        case 'apartment':
            // Apartment shape (example)
            shape.moveTo(0, 0.6);
            shape.lineTo(0.4, 0.2);
            shape.lineTo(0.4, -0.4);
            shape.lineTo(0, -0.6);
            shape.lineTo(-0.4, -0.4);
            shape.lineTo(-0.4, 0.2);
            break;
        // Add more cases for other tile types
        default:
            // Default diamond shape
            shape.moveTo(0, 0.5);
            shape.lineTo(0.5, 0);
            shape.lineTo(0, -0.5);
            shape.lineTo(-0.5, 0);
    }

    shape.closePath();
    return shape;
};

const Tile = ({ position, tileKey }) => {
    const { tiles, setTileType, selectedTileType, preloadedTextures } = useStore();
    const tileType = tiles[tileKey] || 'grass';

    const texture = preloadedTextures ? preloadedTextures[tileType] : null;

    const [hovered, setHovered] = useState(false);
    const { gl } = useThree();

    // Create custom shape based on tile type
    const tileShape = useMemo(() => createTileShape(tileType), [tileType]);

    if (!texture) return null; // Don't render if textures aren't loaded yet

    return (
        <group position={position}>
            {/* Visual tile */}
            <mesh>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    map={texture}
                    transparent={true}
                    color={hovered ? 'lightblue' : 'white'}
                />
            </mesh>

            {/* Invisible interaction plane with custom shape */}
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
                <shapeGeometry args={[tileShape]} />
                <meshBasicMaterial />
            </mesh>
        </group>
    );
};

export default Tile;