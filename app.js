class GitHubAPI {
  constructor(username) {
    this.username = username.value;
  }

  async getData() {
    const response = await axios(
      `https://api.github.com/users/${this.username}`
    );

    return response;
  }

  displayData() {
    this.getData().then((userProfile) => {
      document.getElementById("ghAvatar").src = userProfile.data.avatar_url;
      document.getElementById("ghName").textContent = userProfile.data.login;
      document.getElementById("ghBio").textContent = userProfile.data.bio;
      document.getElementById("ghReposCount").textContent =
        userProfile.data.public_repos;
      document.getElementById("ghFollowers").textContent =
        userProfile.data.followers;
      document.getElementById("ghFollowing").textContent =
        userProfile.data.following;
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

    return response;
  }

  displayRepoData() {
    this.repo_container.innerHTML = "";
    this.getRepoData().then((userProfile) => {
      userProfile.data.forEach((repo) => {
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
  const userProfile = new GitHubAPI(username);
  const userRepo = new GitHubRepo(repoContainer, username);
  userRepo.displayRepoData();
  userProfile.displayData();
  username.value = "";
});
