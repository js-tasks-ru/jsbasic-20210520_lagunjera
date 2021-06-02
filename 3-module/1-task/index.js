function namify(users) {
  let namesArr = [];
  
  users.forEach(
    item => namesArr.push(item.name)
  );
  
  return namesArr;
}
