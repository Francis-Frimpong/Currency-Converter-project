class GitHubAPI {
  constructor(username) {
    this.username = username;
  }

  async getData() {
    const response = await axios(
      `https://api.github.com/users/${this.username}`
    );

    return response;
  }

  displayData() {
    this.getData().then((userProfile) => {
      console.log(userProfile.data.login);
    });
  }
}

const userProfile = new GitHubAPI("Francis-Frimpong");
userProfile.displayData();

// axios
//   .get("https://api.github.com/users/Francis-Frimpong")
//   .then((res) => console.log(res.data))
//   .catch((err) => console.error(err));
