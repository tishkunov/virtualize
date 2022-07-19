
type CollectionStructure<T> = {
    [key: string | number]: Array<T>
}

export const getCollectionFromData = <T>(data: T[]) => {
    const result: CollectionStructure<T> = {};
    for (let i = 0; i < data.length; i += 10) {
      result[String(i)] = data.slice(i, i + 10)
    }
    return result
}

  
export const findClosestItem = (arr: string[], goal: number) => {
    return arr.reduce((prev: string, curr: string) => Math.abs(Number(curr) - goal) < Math.abs(Number(prev) - Number(goal)) ? curr : prev)
}
  
export const findClosestIDsCollection = <T,>(goal: number, modifiedItems: T) => {
    const closestItem = findClosestItem(Object.keys(modifiedItems), goal)
    if (closestItem === '0') {
        return [0, 10, 20]
    }
    return [Number(closestItem) - 10, Number(closestItem), Number(closestItem) + 10]
}
