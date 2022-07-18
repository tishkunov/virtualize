import './App.css';
import _isEqual from 'lodash/isEqual'
import './stats';
import {ItemRender} from './ItemRender';
import {Virtualized} from './Virtualized';


const createData = () => {
  const LEN = 1000;
  const arr = [] as any;
  for (let i=0; i < LEN; i++) {
    arr.push({name: makeid(i > 90 ? 90 : i), id: i});
  }

  return arr;
}

function makeid(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const data = createData();

const allHeight = data.length * 100;

function App() {
  return (
    <div className="App" style={{ height: allHeight }}>
      <Virtualized data={data} renderItem={(item: any, idx: number) => <ItemRender item={item} idx={idx} />} />
    </div>
  );
}

export default App;
