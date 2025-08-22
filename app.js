class GitHubAPI {
  constructor(username) {
    this.username = username.value;
  }

  async getData() {
    const response = await axios(
      `https://api.github.com/users/${this.username}`
    );

    return response.data;
  }

  displayData() {
    this.getData()
      .then((userProfile) => {
        document.getElementById("ghError").innerHTML = "";
        document.getElementById("ghAvatar").src = userProfile.avatar_url;
        document.getElementById("ghName").textContent = userProfile.login;
        document.getElementById("ghBio").textContent = userProfile.bio;
        document.getElementById("ghReposCount").textContent =
          userProfile.public_repos;
        document.getElementById("ghFollowers").textContent =
          userProfile.followers;
        document.getElementById("ghFollowing").textContent =
          userProfile.following;
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          document.getElementById("ghError").textContent =
            "Username can't be found!";
        } else {
          document.getElementById("ghError").textContent =
            "Something went wrong. Please try again.";
        }
      });
  }
}

class GitHubRepo extends GitHubAPI {
  constructor(repo_container, username) {
    super(username);
    this.repo_container = repo_container;
  }

  async getRepoData() {
    const response = await axios(
      `https://api.github.com/users/${this.username}/repos`
    );

    return response.data;
  }

  displayRepoData() {
    this.repo_container.innerHTML = "";
    this.getRepoData().then((userProfile) => {
      userProfile.forEach((repo) => {
        const li = document.createElement("li");
        li.textContent = repo.name;
        this.repo_container.appendChild(li);
      });
    });
  }
}

const repoContainer = document.getElementById("ghRepos");
const form = document.getElementById("ghForm");
const username = document.getElementById("ghUser");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value === "") {
    document.getElementById("ghError").textContent = "Please enter username!";
    return;
  }
  const userProfile = new GitHubAPI(username);
  const userRepo = new GitHubRepo(repoContainer, username);
  userRepo.displayRepoData();
  userProfile.displayData();
  username.value = "";
});
