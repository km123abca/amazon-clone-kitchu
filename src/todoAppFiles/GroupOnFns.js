const groupOnDate = (arr) => {
  let result = [];
  console.log(arr.length);
  arr.reduce((res, elem) => {
    if (!res[elem.date]) {
      res[elem.date] = { ...elem };
      result.push(res[elem.date]);
    } else
      res[elem.date].price =
        parseFloat(res[elem.date].price) + parseFloat(elem.price);
    return res;
  }, {});
  return result;
};
const groupOnMonth = (arr) => {
  let result = [];
  console.log(arr.length);
  arr.reduce((res, elem) => {
    if (!res[elem.date.substr(5, 2)]) {
      res[elem.date.substr(5, 2)] = { ...elem };
      result.push(res[elem.date.substr(5, 2)]);
    } else
      res[elem.date.substr(5, 2)].price =
        parseFloat(res[elem.date.substr(5, 2)].price) + parseFloat(elem.price);
    return res;
  }, {});
  return result;
};
const groupOnYear = (arr) => {
  let result = [];
  console.log(arr.length);
  arr.reduce((res, elem) => {
    if (!res[elem.date.substr(0, 4)]) {
      res[elem.date.substr(0, 4)] = { ...elem };
      result.push(res[elem.date.substr(0, 4)]);
    } else
      res[elem.date.substr(0, 4)].price =
        parseFloat(res[elem.date.substr(0, 4)].price) + parseFloat(elem.price);
    return res;
  }, {});
  return result;
};
const groupOnItem = (arr) => {
  let result = [];
  console.log(arr.length);
  arr.reduce((res, elem) => {
    if (!res[elem.xpen]) {
      res[elem.xpen] = { ...elem };
      result.push(res[elem.xpen]);
    } else
      res[elem.xpen].price =
        parseFloat(res[elem.xpen].price) + parseFloat(elem.price);
    return res;
  }, {});
  return result;
};

export { groupOnDate, groupOnMonth, groupOnYear, groupOnItem };
