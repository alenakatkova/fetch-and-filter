const searchInput = document.querySelector(".search-input");
const usersContainer = document.querySelector(".users-container");
const user = document.querySelector(".user");
usersContainer.textContent = "Loading...";

let fetchedUsers;

const onHashChange = () => {
  user.innerHTML = location.hash;
};

const showUsersList = (users) => {
  usersContainer.innerHTML = users.map(user => {
    return `<li><a href="#${user.name}">${user.name}</a></li>`;
  }).join("");
  const links = document.querySelectorAll("a");
  [...links].forEach(link => {
    link.addEventListener("click", () => {
      onHashChange();
    });
  })
};

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
      fetchedUsers = users;
      showUsersList(fetchedUsers);
    })
    .finally(() => {
      searchInput.removeAttribute("disabled");
});

searchInput.addEventListener("input", () => {
  const filteredUsers = [...fetchedUsers]
      .filter(user => user.name
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()));

  showUsersList(filteredUsers);
});

window.addEventListener("hashchange", onHashChange);

