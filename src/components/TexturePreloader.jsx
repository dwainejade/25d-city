import { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import useStore from '../store';

const TexturePreloader = () => {
    const { textureUrls, setPreloadedTextures } = useStore();

    const textures = useLoader(TextureLoader, Object.values(textureUrls));

    useEffect(() => {
        const textureMap = Object.keys(textureUrls).reduce((acc, key, index) => {
            acc[key] = textures[index];
            return acc;
        }, {});

        setPreloadedTextures(textureMap);
    }, [textures, textureUrls, setPreloadedTextures]);

    return null; // This component doesn't render anything
};

export default TexturePreloader;