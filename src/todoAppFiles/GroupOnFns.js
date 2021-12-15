const groupOnDate = (arr) => {
  let result = [];
  // console.log(arr.length);
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
  // console.log(arr.length);
  // console.log(JSON.stringify(arr));
  arr.reduce((res, elem) => {
    if (!res[elem.date.substr(0, 7)]) {
      res[elem.date.substr(0, 7)] = { ...elem };
      result.push(res[elem.date.substr(0, 7)]);
    } else
      res[elem.date.substr(0, 7)].price =
        parseFloat(res[elem.date.substr(0, 7)].price) + parseFloat(elem.price);
    return res;
  }, {});
  return result;
};
const groupOnYear = (arr) => {
  let result = [];
  // console.log(arr.length);
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
  // console.log(arr.length);
  arr
    .sort((a, b) => (a < b ? -1 : 1))
    .reduce((res, elem) => {
      let modElemXpen = elem.xpen.toLowerCase().trim().split(/[\s]+/).join(" ");
      if (!res[modElemXpen]) {
        res[modElemXpen] = { ...elem };
        result.push(res[modElemXpen]);
      } else
        res[modElemXpen].price =
          parseFloat(res[modElemXpen].price) + parseFloat(elem.price);
      return res;
    }, {});
  return result.sort((a, b) => (a.xpen < b.xpen ? -1 : 1));
};

const groupOnSelectedActivity = (arr, selectedActivity) => {
  if (selectedActivity == "None") return arr;
  return arr.filter(
    (x) => x.xpen.toLowerCase() == selectedActivity.toLowerCase
  );
};

export { groupOnDate, groupOnMonth, groupOnYear, groupOnItem };
