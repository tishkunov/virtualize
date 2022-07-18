import _isEqual from 'lodash/isEqual'
import './stats';
import { ItemRender } from './ItemRender';
import { Virtualized } from './Virtualized';
import { createData } from './helpers';
import { Item } from './ItemRender';

const data = createData();

function App() {
  return (
      <Virtualized data={data} renderItem={(item: Item, idx: number) => <ItemRender item={item} idx={idx} />} />
  );
}

export default App;
