/* global gapi */
import React, { Component } from "react";
import Home from "../Home/Home";

const config = {
  clientId:
    "568280133217-hbqdet1g3089es9trln0m8e9qj7o8l86.apps.googleusercontent.com",
  scope: "https://mail.google.com/",
};

class App extends Component {
  state = {
    gapiLoaded: false,
  };

  listHistory(userId, gapi) {
    var getPageOfHistory = function (request, result) {
      request.execute(function (resp) {
        result = result.concat(resp.history);
        var nextPageToken = resp.nextPageToken;
        if (nextPageToken) {
          request = gapi.client.gmail.users.history.list({
            userId: userId,
            pageToken: nextPageToken,
          });
          getPageOfHistory(request, result);
        } else {
        }
      });
    };
    var request = gapi.client.gmail.users.history.list({});
    getPageOfHistory(request, []);
  }
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      console.log("OnLoad");
      const initClient = () => {
        gapi.client.init(config).then(() => {
          const gapi = window.gapi;
          const auth2 = gapi.auth2.getAuthInstance();
          auth2.isSignedIn.listen(this.handleSigninStatusChange);

          const currentUser = auth2.currentUser.get();
          const authResponse = currentUser.getAuthResponse(true);
          if (authResponse && currentUser) {
            // save access token
            console.log(authResponse);
          }
          this.setState({
            gapiLoaded: true,
          });
        });
      };
      gapi.load("client:auth2", initClient);
    };

    document.body.appendChild(script);
  }

  handleSigninStatusChange = (isSignedIn) => {
    const auth2 = gapi.auth2.getAuthInstance();
    if (isSignedIn) {
      const currentUser = auth2.currentUser.get();
      const authResponse = currentUser.getAuthResponse(true);
      if (authResponse) {
        // save access token

        console.log(authResponse);
      }
    }
  };

  render() {
    const { gapiLoaded } = this.state;

    return gapiLoaded ? (
      <div>
        <Home />
      </div>
    ) : (
      <div>Please provide clientId in the config</div>
    );
  }
}

export default App;
