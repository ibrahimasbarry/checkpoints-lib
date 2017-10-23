export const groupBy = (collection, iterator) => {
  const retObj = {};
  collection.forEach(item => {

    let value;
    if (typeof iterator === 'function') value = iterator(item);
    else if (typeof iterator === 'string') value = item[iterator];

    if (retObj[value]) retObj[value].push(item);
    else retObj[value] = [item];
  })
  return retObj;
};

export const flowRight = (...functions) => {
  return (...inivalArr) => {
    let accValue = functions[functions.length - 1](...inivalArr);
    for (let i = functions.length - 2; i >= 0; i--) {
      accValue = functions[i](accValue);
    }
    return accValue;
  }
};
