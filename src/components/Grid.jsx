import Tile from './Tile';

const Grid = () => {
    const gridSize = 10;
    const tileWidth = 1;
    const tileHeight = 0.54;
    const gap = 0.04;

    const offsetX = ((gridSize - 1) * (tileWidth + gap)) / 2;
    const offsetZ = ((gridSize - 1) * (tileHeight + gap)) / 2;

    const tiles = [];

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const x = (col - row) * ((tileWidth + gap) / 2);
            const z = (col + row) * ((tileHeight + gap) / 2);

            const adjustedX = x - offsetX;
            const adjustedZ = z - offsetZ;
            const tileKey = `${row}-${col}`; // Unique key for each tile

            tiles.push(
                <Tile
                    key={tileKey}
                    tileKey={tileKey}
                    position={[adjustedX, 0, adjustedZ]}
                />
            );
        }
    }

    return <group>{tiles}</group>;
};

export default Grid;