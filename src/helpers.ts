export const createData = () => {
    const LEN = 1000;
    const arr = [];
    for (let i=0; i < LEN; i++) {
      arr.push({name: makeid(i > 90 ? 90 : i), id: i});
    }
  
    return arr;
}
  
export const makeid = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}