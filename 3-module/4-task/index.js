function showSalary(users, age) {
  let usersFilteredByAge = users.filter(user => user.age <= age);

  return usersFilteredByAge.map(user => user.name + ", " + user.balance)
                           .join("\n");
}
