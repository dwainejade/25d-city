import { create } from 'zustand';

const useStore = create((set) => ({
    textureUrls: {
        grass: '/assets/textures/grass.webp',
        apartment: '/assets/textures/apartment.webp',
        house: '/assets/textures/house.webp',
    },
    preloadedTextures: null,
    isDragging: false,
    setIsDragging: (isDragging) => set({ isDragging }),
    tiles: {}, // Store the type of each tile
    selectedTileType: 'grass', // Default selected tile type
    setTileType: (key, type) => set((state) => ({
        tiles: { ...state.tiles, [key]: type },
    })),
    setSelectedTileType: (type) => set({ selectedTileType: type }),
    setPreloadedTextures: (textures) => set({ preloadedTextures: textures }),
}));

export default useStore;