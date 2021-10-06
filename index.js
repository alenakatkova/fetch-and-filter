const searchInput = document.querySelector(".search-input");
const usersList = document.querySelector(".users-list");
const user = document.querySelector(".user");

let fetchedUsers;

const generateUserInfo = (userId) => {
  const chosenUser = [...fetchedUsers].find(user => {
    return user.id === userId;
  });

  return `
      <div class="card">
          <h5 class="card-header">${chosenUser.name}</h5>
          <div class="card-body">
              <table class="table table-hover table-borderless m-0">
                  <tbody>
                      <tr>
                          <th scope="row">City:</th>
                          <td>${chosenUser.address.city}</td>
                      </tr>
                      <tr>
                          <th scope="row">Email:</th>
                          <td>${chosenUser.email}</td>
                      </tr>

                      <tr>
                          <th scope="row">Phone:</th>
                          <td>${chosenUser.phone}</td>
                      </tr>
                      <tr>
                          <th scope="row">Website:</th>
                          <td>${chosenUser.website}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div class="card-footer text-muted">${chosenUser.company.name}: ${chosenUser.company.catchPhrase}</div>
      </div>
  `
};

const toggleUserInfoChangeWhenOnHashchange = () => {
  const newHash = location.hash;
  user.innerHTML = newHash.length !== 0 ? generateUserInfo(Number(newHash.slice(3))) : "";
};

const showUsersList = (users) => {
  usersList.innerHTML = users.map(user => {
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <a data-id="${user.id}" href="#${'id' + user.id}">${user.name}</a>
            <span class="badge bg-primary rounded-pill">${user.company.name}</span>
        </li>
    `;
  }).join("");
};

const cleanUserInfo = () => {
  history.pushState("", document.title, location.pathname);
  toggleUserInfoChangeWhenOnHashchange();
};

const filterUsers = () => {
  const filteredUsers = [...fetchedUsers]
      .filter(user => user.name
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()));
  showUsersList(filteredUsers);
  cleanUserInfo();
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

searchInput.addEventListener("input", filterUsers);
window.addEventListener("hashchange", toggleUserInfoChangeWhenOnHashchange);

