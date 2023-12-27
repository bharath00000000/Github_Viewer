import React, { useState } from "react";
import './App.css';
function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState(null);
  const handleSearch = async () => {
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      const userData = await userResponse.json();
      setUserData(userData);
      const repositoriesResponse = await fetch(userData.repos_url);
      const repositoriesData = await repositoriesResponse.json();
      setRepositories(repositoriesData);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{backgroundColor:"blueviolet"}}>
      <center>
        <div className="username">
          <h1>GITHUB PROFILE VIEWER</h1>
        </div>
        <div>
          <input type="text" name="username" value={username} placeholder="Enter a github username" onChange={(e) => setUsername(e.target.value)} />
          <button onClick={handleSearch}>Search username</button>
        </div>
        {userData && (
          <div>
            <img src={userData.avatar_url} alt="profile" />
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
            <p>{userData.followers}</p>
            <p>{userData.following}</p>
            <p>Public Repositories:{userData.public_repos}</p>
          </div>
        )

        }
        {repositories && (
          <div>
            <h2>Repositories</h2>
            <ul>
              {
                repositories.map((repo) => (
                  <li key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="nopener noreferrer">{repo.name}
                    </a>

                  </li>
                ))
              }
            </ul>
          </div>
        )

        }
      </center>
    </div>
  )
}
export default App;