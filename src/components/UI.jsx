
import useStore from '../store';

const SelectionMenu = () => {
  const { setSelectedTileType } = useStore();

  return (
    <div className="menu-wrapper">
      <button onClick={() => setSelectedTileType('grass')}>Grass</button>
      <button onClick={() => setSelectedTileType('apartment')}>Apartment</button>
      <button onClick={() => setSelectedTileType('house')}>House</button>
    </div>
  );
};

export default SelectionMenu;