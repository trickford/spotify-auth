import React from "react";
import { SpotifyApiContext } from "react-spotify-api";
import Cookies from "js-cookie";

import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";
import axios from "axios";

const App = () => {
  const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"));
  const [userData, setUserData] = React.useState({});

  const getUserData = () => {
    console.log("getting user data:", token);

    const instance = axios.create({
      timeout: 1000,
      headers: { 'Authorization': `Bearer ${token}` },
    });
    // Make a request for a user with a given ID
    instance
      .get("https://api.spotify.com/v1/me")
      .then(function (response) {
        // handle success
        console.log(response);
        setUserData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  if(token) {
      getUserData();
  }

  return (
    <div className="app">
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          {/* Your Spotify Code here */}
          <p>You are authorized with token: {token}</p>
          <p>User type: {userData.type}</p>
          <p>User id: {userData.id}</p>
          <p>User url: {userData.href}</p>
          <p>User email: {userData.email}</p>
        </SpotifyApiContext.Provider>
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri="http://localhost:3000/callback"
          clientID="5b04f1e10c3a414799232a16932dba47"
          scopes={[Scopes.userReadPrivate, "user-read-email"]} // either style will work
          onAccessToken={(token) => setToken(token)}
        />
      )}
    </div>
  );
};
export default App;
