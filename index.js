const searchInput = document.querySelector(".search-input");
const usersContainer = document.querySelector(".users-container");
usersContainer.textContent = "CLOCK";
let fetchedUsers;

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
      fetchedUsers = users;
      usersContainer.innerHTML = users.map(user => {
        return `<li>${user.name}</li>`;
      }).join("");
    })
    .finally(() => {
      searchInput.removeAttribute("disabled");
});

searchInput.addEventListener("input", () => {
  const filteredUsers = [...fetchedUsers]
      .filter(user => user.name
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()));

  usersContainer.innerHTML = filteredUsers
      .map(user => {
          return `<li>${user.name}</li>`;
      })
      .join("");
});