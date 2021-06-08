function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  
  for (friend of friends) {
    ul.insertAdjacentHTML('beforeEnd', `<li>${friend.firstName} ${friend.lastName}</li>`);
  }

  return ul;
}
