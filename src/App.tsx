import './App.css';
import _isEqual from 'lodash/isEqual'
import './stats';
import { ItemRender } from './ItemRender';
import { Virtualized } from './Virtualized';
import { createData } from './helpers';
import { Item } from './ItemRender';

const data = createData();

const fullHeight = data.length * 100;


function App() {
  return (
    <div className="app-container" style={{ height: fullHeight }}>
      <Virtualized data={data} renderItem={(item: Item, idx: number) => <ItemRender item={item} idx={idx} />} />
    </div>
  );
}

export default App;
