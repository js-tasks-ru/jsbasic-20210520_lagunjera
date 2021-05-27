function ucFirst(str) {
  if (str.length > 0) {
    replacedFirstLetter = str.replace(str[0], str[0].toUpperCase());
    return replacedFirstLetter;
  } else {
    return "";
  }
}
