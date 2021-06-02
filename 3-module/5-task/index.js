function getMinMax(str) {
  let stringsArr = str.replace(/,/g, " ")
                            .split(" ")
                            .filter(item => parseFloat(item));

  let maxNumber = Math.max(...stringsArr);
  let minNumber = Math.min(...stringsArr);

  return {
    min: minNumber,
    max: maxNumber
  };
}
