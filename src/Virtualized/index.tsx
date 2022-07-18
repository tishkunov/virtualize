import React, { useEffect, FC, useMemo } from 'react';
import _isEqual from 'lodash/isEqual'
import isEqual from 'lodash/isEqual';

interface Props {
    data: any;
    renderItem: (item: any, idx: number) => JSX.Element | null | React.ReactNode
}
const prepareItems = (data: any) => {
    const result = {} as any;
    for (let i = 0; i < data.length; i += 10) {
      result[String(i)] = data.slice(i, i + 10)
    }
    return result
}

  
const findClosestItem = (arr: any, goal: number) => {
    return arr.reduce((prev: any, curr: any) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
}
  
const findClosestIDsCollection = (goal: number, modifiedItems: any) => {
    const closestItem = findClosestItem(Object.keys(modifiedItems), goal)
    if (closestItem == 0) {
        return [0, 10, 20]
    }
    return [Number(closestItem) - 10, Number(closestItem), Number(closestItem) + 10]
 }



export const Virtualized: FC<Props> = ({data, renderItem}) => {
    const modifiedItems = useMemo(() => prepareItems(data), [data]);
  
    const [IDsOfCollections, setIDsofCollections] = React.useState([0, 10, 20]);
    const [itemToRender, setItems] = React.useState([...modifiedItems[0], ...modifiedItems[10], ...modifiedItems[20]]);
    const [mockMarginBottom, setMockMarginBottom] = React.useState(0);
    
    const refOfCollections = React.useRef(IDsOfCollections);
    const renderItemsRef = React.useRef(itemToRender);
    useEffect(() => {
        window.addEventListener('scroll', () => {
                const closestIDs = findClosestIDsCollection(Math.round(window.pageYOffset / 100), modifiedItems)
                if (!_isEqual(closestIDs, refOfCollections)) {
                    setIDsofCollections(closestIDs);
                    refOfCollections.current = closestIDs;
                    const newItems = [...modifiedItems[closestIDs[0]],...modifiedItems[closestIDs[1]], ...modifiedItems[closestIDs[2]]];
                
                if (!isEqual(newItems,renderItemsRef)) {
                    setItems(newItems)
                }
            
                }
            
        })

        if (window.pageYOffset > 1000) { 
            const closestIDs = findClosestIDsCollection(Math.round(window.pageYOffset / 100), modifiedItems)
            if (!_isEqual(closestIDs, IDsOfCollections)) {
                setIDsofCollections(closestIDs);
        
                const newItems = [...modifiedItems[closestIDs[0]],...modifiedItems[closestIDs[1]], ...modifiedItems[closestIDs[2]]];
            if (!isEqual(newItems,itemToRender )) {
                setItems(newItems)
            }
            }
        }
    }, [])

    useEffect(() => {
        setMockMarginBottom( (IDsOfCollections[1] * 100 + IDsOfCollections[0] * 100 ) / 2 - 500)
    }, [window.pageYOffset])

    return (
        <>
            <div style={{ marginBottom: mockMarginBottom }} />

            {itemToRender.map((item: any, idx: number) => renderItem(item, idx))}
        </>
    );
}