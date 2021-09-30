const searchInput = document.querySelector(".search-input");
const usersContainer = document.querySelector(".users-container");
const user = document.querySelector(".user");
usersContainer.textContent = "Loading...";
let fetchedUsers;

const generateUserInfo = (userId) => {
  const chosenUser = [...fetchedUsers].find(user => {
    return user.id === Number(userId);
  });

  return `
      <p>Name: ${chosenUser.name}</p>
      <p>Username: ${chosenUser.username}</p>
      <p>Email: ${chosenUser.email}</p>
      <p>City: ${chosenUser.address.city}</p>
      <p>Company: ${chosenUser.company.name}</p>
  `
};

const onHashChange = () => {
  const newHash = location.hash;
  if (newHash.length === 0) {
    user.innerHTML = "";
  } else {
    user.innerHTML = generateUserInfo(newHash.slice(3));
  }
};

const showUsersList = (users) => {
  usersContainer.innerHTML = users.map(user => {
    return `<li><a data-id="${user.id}" href="#${'id' + user.id}">${user.name}</a></li>`;
  }).join("");

  const links = document.querySelectorAll("a");
  [...links].forEach(link => {
    link.addEventListener("click", (e) => {
      user.innerHTML = generateUserInfo(e.target.dataset.id);
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

