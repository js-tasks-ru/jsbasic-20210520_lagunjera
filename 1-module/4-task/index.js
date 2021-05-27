function checkSpam(str) {
  lowerCasedStr = str.toLowerCase();
  
  if (lowerCasedStr.includes("1xbet") || lowerCasedStr.includes("xxx")) {
    return true;
  }
  return false;
}
