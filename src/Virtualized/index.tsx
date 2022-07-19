import React, { useEffect, useRef, useMemo, useState, PropsWithChildren, Fragment } from 'react';
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty';
import { getCollectionFromData, findClosestIDsCollection, } from './helpers';
import { Collection } from './types';
import './styles.css'

interface Props<T extends {id: string | number}> {
    data: T[];
    renderItem: (item: T, idx: number) => JSX.Element | null | React.ReactNode
}


export const Virtualized = <T extends {id: string | number},>(props: PropsWithChildren<Props<T>>) => {
    const {data, renderItem} = props;
    const modifiedItems: Collection<T> = useMemo(() => getCollectionFromData(data), [data]);
  
    const [itemToRender, setItems] = useState([...modifiedItems[0], ...modifiedItems[10], ...modifiedItems[20]]);
    const [mockMarginBottom, setMockMarginBottom] = useState(0);
    
    const refOfCollections = useRef([0,10,20]);
    const renderItemsRef = useRef(itemToRender);

    const fullHeight = useMemo(() => data.length * 100, []);

    useEffect(() => {
        const setRenderItems = () => {
            const closestIDs = findClosestIDsCollection(Math.round(window.pageYOffset / 100), modifiedItems)
            if (!_isEqual(closestIDs, refOfCollections)) {
    
                refOfCollections.current = closestIDs;
                const [firstID,secondID, thirdID] = closestIDs;
                const newItems = [...modifiedItems[firstID], ...modifiedItems[secondID], ...modifiedItems[thirdID]];
                
                if (!_isEqual(newItems,renderItemsRef)) {
                    setItems(newItems)
                }
            }
        }

        window.addEventListener('scroll', setRenderItems)

        if (window.pageYOffset > 1000) { 
            setRenderItems();
        }

        return () => {
            window.removeEventListener('scroll', setRenderItems, false);
        }
    }, [])

    useEffect(() => {
        const [firstID, secondID] = refOfCollections.current;
        setMockMarginBottom( (firstID * 100 + secondID * 100 ) / 2 - 500)
    }, [window.pageYOffset])

    if (_isEmpty(data)) {
        console.error('Please provide prop "data" to Virtualized component');
        return null;
    }

    if (typeof renderItem !== 'function') {
        console.error('Please provide prop "renderItem" function to Virtualized component');
    }

    return (
        <div className="items-container" style={{ height: fullHeight }}>
            <div style={{ marginBottom: mockMarginBottom }} />

            {itemToRender.map((item: T, idx: number) => <Fragment key={item.id}>{renderItem(item, idx)}</Fragment>)}
        </div>
    );
}