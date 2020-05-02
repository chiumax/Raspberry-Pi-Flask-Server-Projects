const HEADER = {
  "X-Content-Type-Options": "application/x-www-form-urlencoded"
};
var sessionId = 0;
var username;
const SUCCESS_NOTIF = {
  globalPosition: "top center",
  className: "success"
};

const FAIL_NOTIF = {
  globalPosition: "top center",
  className: "error"
};

const get = id => {
  return document.getElementById(id);
};

const signOut = () => {
  sessionId = 0;
  setLogInMenu(false);
};

const setLogInMenu = setOff => {
  if (setOff) {
    get("logName").innerHTML = `Welcome, ${username}`;
    get(
      "logIn"
    ).innerHTML = `<button class="btn waves-effect waves-light " value="Sign Out" onclick="return signOut()">Sign Out</button>`;
  } else {
    get("logName").innerHTML = "Log In";
    get("logIn").innerHTML = `<form method="post" onsubmit="login()">
    Name: <input type="text" name="user" id="user" /><br />
    Pass: <input type="text" name="pass" id="pass" /><br />

    <input
      type="button"
      name="type"
      class="btn waves-effect waves-light "
      value="Log In"
      onclick="return login('login')"
    />

    <input
      type="button"
      name="type"
      class="btn waves-effect waves-light "
      value="Create Account"
      onclick="return login('create')"
    />
  </form>`;
  }
};

const parseMessage = (message, users) => {
  var messageHTML = "";

  for (msg in message) {
    console.log(msg);
    if (message[msg].user == username) {
      messageHTML += `
      <div class="msgTxt mine messagess"><div style="color: ${
        users[message[msg].user].color
      }">${message[msg].user} - ${new Date(
        message[msg].timestamp
      ).toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "numeric"
      })}</div><div class="message">${message[msg].msg}</div></div>
      `;
    } else {
      messageHTML += `
      <div class="messageBoxWrap yours messagess"><div style="color: ${
        users[message[msg].user].color
      }">${message[msg].user} - ${new Date(
        message[msg].timestamp
      ).toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "numeric"
      })}</div><div class="message">${message[msg].msg}</div></div>
      `;
    }
  }
  get("messages").innerHTML = messageHTML;
};

const sendMessage = message => {
  const payload = {
    user: username,
    msg: message,
    time: Date.now(),
    sessionId: sessionId
  };

  if (sessionId == 0) {
    $.notify("Please Login to chat!", FAIL_NOTIF);
    return;
    // dialog "Please Login to chat!"
  }
  if (!/\S/.test(message)) {
    console.err("EMPTY");
    return;
    // string is not empty and not just whitespace
  }
  axios
    .post("/send_message", { ...payload, headers: HEADER })
    .then(response => {
      // send sess id later to check of still logged in
      const data = response.data;

      if (data == "FAIL") {
        $.notify(
          "You have been sighned out. Please login again to chat!",
          FAIL_NOTIF
        );
        //dialog "You have been signed out. Please login again!"
        // set login to sign out
      }
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
};

const getMessage = () => {
  const payload = {};

  axios
    .get("/get_messages")
    .then(response => {
      const data = response.data;
      console.log(data.messages);
      parseMessage(data.messages, data.users);
    })
    .catch(error => {
      console.log(error);
    });
};

const login = loginType => {
  if (!/\S/.test(get("user").value)) {
    console.err("EMPTY");
    return;
    // string is not empty and not just whitespace
  }
  if (!/\S/.test(get("pass").value)) {
    console.err("EMPTY");
    return;
    // string is not empty and not just whitespace
  }
  const payload = {
    type: loginType,
    user: get("user").value,
    pass: get("pass").value,
    time: Date.now(),
    sessionId: Date.now()
  };
  axios
    .post("/login", { ...payload, headers: HEADER })
    .then(response => {
      const data = response.data;
      username = undefined;
      sessionId = 0;
      // set interval
      switch (data) {
        case "create":
          username = payload.user;
          sessionId = payload.sessionId;
          setLogInMenu(true);
          $.notify("Account Created!", SUCCESS_NOTIF);
          break;
        case "exists":
          $.notify("Username already exists!", FAIL_NOTIF);
          break;
        case "log":
          username = payload.user;
          sessionId = payload.sessionId;
          setLogInMenu(true);
          $.notify(`Welcome, ${payload.user}!`, SUCCESS_NOTIF);
          break;
        case "incorrect":
          $.notify("Username or password is incorrect!", FAIL_NOTIF);
          break;
      }

      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

const polling = () => {
  getMessage();
};

setInterval(polling, 3000);
