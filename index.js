// const url = "https://api.github.com/users";
// const searchGithubAPIUrl = "https://api.github.com/search/users?q=";
// const serachInputEl = document.getElementById("search");

// const usercontainer = document.getElementById("usercontainer");
// const userListContainerEl = document.getElementById("userListContainer");
// const listcontainer = document.getElementsByClassName("listcontainer")

// const generateprofile = (profile) => {
//   return `
//     <div class="userbox">
//         <div class="topsection">
//           <div class="profile">
//             <img src="${profile.avatar_url}" alt="" />
//           </div>

//           <div class="username">
//             <h1>${profile.name}</h1>
//             <h1>${profile.login}</h1>
//           </div>
//         </div>
//         <div class="status">
//           <div class="followers">
//             <h1>Followers</h1>
//             <p>${profile.followers}</p>
//           </div>

//           <div class="following">
//             <h1>Following</h1>
//             <p>${profile.following}</p>
//           </div>
//         </div>
//       </div>`;
// };


// const createUserList = (users) => {
//     if (users.length > 0) { 
//         return users.map((user) => {
//             return (
//                `<div class ="listbox"> <li data-user-value='${user.login}'>${user.login}</li> </div>`
//             )
//         }).join("");
//     }

//     return "<li>No user found</li>";
// }

// const fetchProfile = async (username) => {
//     try {
//         const res = await fetch(`${url}/${username}`);
//         const data = await res.json();
//         usercontainer.innerHTML = generateprofile(data);

//         console.log("data", data);
//     } catch (error) {
//        console.log({error});
//     }
// };

// serachInputEl.addEventListener("keyup", async (e) => {

//     const res = await fetch(`${searchGithubAPIUrl}${e.target.value}+in:login`);
//     const data = await res.json();
//     userListContainerEl.innerHTML = createUserList(data.items);
//     userListContainerEl.addEventListener('click', function(e) {
//         if(e.target && e.target.nodeName == "LI") {
//             fetchProfile(e.target.innerText)
            
//             userListContainerEl.innerHTML = '';
//             listcontainer[0].style.display = "none";
//         }
        
//     });
//     listcontainer[0].style.display = "block";
    
// });


// Set the URL for the GitHub users API
const url = "https://api.github.com/users";

// Set the URL for searching GitHub users
const searchGithubAPIUrl = "https://api.github.com/search/users?q=";

// Get the search input element from the HTML page
const searchInputEl = document.getElementById("search");

// Get the elements representing the user container, user list container, and list container from the HTML page
const usercontainer = document.getElementById("usercontainer");
const userListContainerEl = document.getElementById("userListContainer");
const listcontainer = document.getElementsByClassName("listcontainer");

// Define a function to generate HTML markup for a user profile based on user data
const generateProfile = (profile) => {
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
            <h1>Following</h1>
            <p>${profile.following}</p>
          </div>
        </div>
      </div>`;
};

// Define a function to create a list of users based on user data
const createUserList = (users) => {
    if (users.length > 0) { 
        return users.map((user) => {
            return (
               `<div class ="listbox"> <li data-user-value='${user.login}'>${user.login}</li> </div>`
            )
        }).join("");
    }

    return "<li>No user found</li>";
}

// Define a function to fetch and display a user's profile based on their username
const fetchProfile = async (username) => {
    try {
        const res = await fetch(`${url}/${username}`);
        const data = await res.json();
        usercontainer.innerHTML = generateProfile(data);

        console.log("data", data);
    } catch (error) {
       console.log({error});
    }
};

// Debounce function to limit the frequency of API requests
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};


// Add a keyup event listener to the search input element
searchInputEl.addEventListener("keyup", debounce( async (e) => {
    // Fetch GitHub users based on the input value
    const res = await fetch(`${searchGithubAPIUrl}${e.target.value}+in:login`);
    const data = await res.json();
    
    // Update the user list container with the list of users
    userListContainerEl.innerHTML = createUserList(data.items);
    
    // Add a click event listener to the user list container
    userListContainerEl.addEventListener('click', function(e) {
        if(e.target && e.target.nodeName == "LI") {
            // Fetch and display the profile of the selected user
            fetchProfile(e.target.innerText);
            
            // Clear the list of users and hide the list container
            userListContainerEl.innerHTML = '';
            listcontainer[0].style.display = "none";
        }
    });
    
    // Display the list container if there are search results
    listcontainer[0].style.display = "block";
},1000));















