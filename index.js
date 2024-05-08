const url = "https://api.github.com/users";
const searchinput = document.getElementById("search");
const searchbtn = document.getElementById("btnid");
const newbox = document.getElementById("newbox");

const generateprofile = (profile) => {
  return `
    <div class="userbox">
        <div class="topsection">
          <div class="profile">
            <img src="${profile.avatar_url}" alt="" />
          </div>

          <div class="username">
            <h1>${profile.name}</h1>
            <h1>${profile.login}</h1>
          </div>
        </div>
        <div class="status">
          <div class="followers">
            <h1>Followers</h1>
            <p>${profile.followers}</p>
          </div>

          <div class="following">
            <h1>Followers</h1>
            <p>${profile.following}</p>
          </div>
        </div>
      </div>`;
};

const fetchdata = async () => {
  const searchusername = searchinput.value; //input value store in this variable

  try {
    const res = await fetch(`${url}/${searchusername}`);
    const data = await res.json();
    if (res.ok) {
      newbox.innerHTML = generateprofile(data); //when username is corect and data is fetch then generateprofile data store in inerhtml id newbox
    } else {
      newbox.innerHTML = "<p>Error: Unable to fetch user data</p>";
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
searchbtn.addEventListener("click", fetchdata);
