import {FC} from 'react'
import './styles.css'

const COLORS = ["#3E5641", "#A24936", "#D36135", "#282B28", "#83BCA9"];

const getColor = (index: number) => COLORS[index % COLORS.length];

interface Props {
    item: any;
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