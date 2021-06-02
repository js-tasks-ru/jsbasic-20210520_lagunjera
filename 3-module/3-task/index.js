function camelize(str) {
  let splitArr = str.split("-");
  let camelizedArr = [];
  
  splitArr.forEach((item) => {
    splitArr.indexOf(item) == 0 ?
      camelizedArr.push(item) :
      camelizedArr.push(
        item.replace(item[0], item[0].toUpperCase())
      );
    
  }
  );
  return camelizedArr.join("");
}
