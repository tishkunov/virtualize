import { FC } from 'react'
import './styles.css'
import { getColor } from './helpers';


export type Item = {
  id: string;
  name: string;
}

interface Props {
    item: Item;
    idx: number;
}

export const ItemRender: FC<Props> = ({item, idx}) => {
    return (
       <div className="item-wrapper">
          <div className="item-id" style={{color: getColor(idx)} } >
              id: {item.id}
          </div>
          <div className="item-name">
            {item.name} 
          </div>
          <div>
            <img
              className="item-image"
              src={`https://picsum.photos/${(60 + idx) % 200 || 60}`}
            />
          </div>  
        </div>
    )
}