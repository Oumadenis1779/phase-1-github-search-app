const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const repoResults = document.getElementById('repoResults');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = searchInput.value;
    searchUsers(searchTerm);
});

async function searchUsers(searchTerm) {
    const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    const data = await response.json();
    displayUsers(data.items);
}

async function getUserRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    const data = await response.json();
    displayRepos(data);
}

function displayUsers(users) {
    searchResults.innerHTML = '';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <h3>${user.login}</h3>
            <img src="${user.avatar_url}" alt="${user.login}" style="width: 100px; height: 100px;">
            <button onclick="getUserRepos('${user.login}')">Show Repos</button>
        `;
        searchResults.appendChild(userDiv);
    });
}

function displayRepos(repos) {
    repoResults.innerHTML = '';
    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description}</p>
            <a href="${repo.html_url}" target="_blank">Visit Repository</a>
        `;
        repoResults.appendChild(repoDiv);
    });
}

const toggleBtn = document.getElementById('toggleBtn');
let searchType = 'user'; // Variable to store the current search type

toggleBtn.addEventListener('click', function () {
    searchType = searchType === 'user' ? 'repo' : 'user';
    toggleBtn.textContent = `Search ${searchType === 'user' ? 'Users' : 'Repos'}`;
});

// Modify the form submission event listener
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = searchInput.value;
    if (searchType === 'user') {
        searchUsers(searchTerm);
    } else {
        searchRepos(searchTerm);
    }
});

// Add a new function to search repositories
async function searchRepos(searchTerm) {
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    const data = await response.json();
    displayRepos(data.items);
}
