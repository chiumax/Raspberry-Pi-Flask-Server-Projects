var currentModals = [];
const $ = id => {
  return document.getElementById(id);
};

const getTimer = () => {
  const currTime = Date.now();

  axios.get("/get_timer").then(response => {
    res = response.data;
    var template = "";
    var modalTemplate = "";
    for (var id in res) {
      if (!res[id].disabled) {
        if (currentModals.indexOf(id) == -1) {
          currentModals.push(id);
          modalTemplate += `
        
        <div class="modal micromodal-slide" id="${id}editModal" aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
          <div
            class="modal__container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="${id}editModal-title"
          >
            <header class="modal__header">
              <h2 class="modal__title" id="${id}editModal-title">
                Edit
              </h2>
              <button
                class="modal__close  "
                aria-label="Close modal"
                data-micromodal-close
              ></button>
            </header>
            <main class="modal__content" id="${id}editModal-content">
            <form method="post">
           
            <div class="modalTimeWrapper">
            Name: <input type="text" name="name" id="${id}name" /><br />
              Hour:
              <input
                type="number"
                name="hour"
                id="${id}hour"
                min="0"
                value="0"
              />Minute:
              <input
                type="number"
                name="minute"
                id="${id}minute"
                min="0"
                value="0"
              />Second:
              <input
                type="number"
                name="second"
                id="${id}second"
                min="0"
                value="0"
              />
            </div>
          </form>
            </main>
            <footer class="modal__footer">
              <button class="modal__btn modal__btn-primary  " data-micromodal-close onclick="return editTimer(${id})">
                Edit
              </button>
              <button
                class="modContinueal__btn  "
                data-micromodal-close
                aria-label="Close this dialog window"
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      </div>
      <div class="modal micromodal-slide" id="${id}deleteModal" aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
          <div
            class="modal__container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="deleteModal-title"
          >
            <header class="modal__header">
              <h2 class="modal__title_warn" id="${id}deleteModal-title">
                Delete
              </h2>
              <button
                class="modal__close  "
                aria-label="Close modal"
                data-micromodal-close
              ></button>
            </header>
            <main class="modal__content" id="${id}deleteModal-content">
              <p>
                This action is irreversible! <br />
                Are you sure?
              </p>
            </main>
            <footer class="modal__footer">
              <button
                class="modal__btn modal__btn-primary-warn  "
                data-micromodal-close
                onclick="return deleteTimer(${id})"
              >
                Delete
              </button>
              <button
                class="modal__btn  "
                data-micromodal-close
                aria-label="Close this dialog window"
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      </div>
        
        
        `;
        }
        template += `
        <div class="col-md-4">
        <div class="card">
        <div class="timerTitle">${
          res[id].name
        } <span style="color: #${Math.floor(Math.random() * 16777215).toString(
          16
        )}">•</span></div>
          <div id="${id}" class="clockWrap">
            <div class="timeSpan">
              <span class="days"></span>
              <div class="smalltext">D</div>
            </div>
            <div class="colon">:</div>
            <div class="timeSpan">
              <span class="hours"></span>
              <div class="smalltext">H</div>
            </div>
            <div class="colon">:</div>
            <div class="timeSpan">
              <span class="minutes"></span>
              <div class="smalltext">M</div>
            </div>
            <div class="colon">:</div>
            <div class="timeSpan">
              <span class="seconds"></span>
              <div class="smalltext">S</div>
            </div>
          </div>
          <div>
            <button value="Edit" class=" " id="${id}" onclick="return editTimerModal(${id})" data-micromodal-trigger="modal-1">Edit</button>
            <button value="Delete" class=" " id="${id}" onclick="return deleteTimerModal(${id})">Delete</button>
          </div>
        </div>
      </div>
        `;
      }
    }
    const bodyContainer = document.getElementById("body");
    const clockContainer = document.getElementById("clockContainer");

    bodyContainer.insertAdjacentHTML("afterend", modalTemplate);

    clockContainer.innerHTML = template;
    for (var id in res) {
      if (!res[id].disabled) {
        initializeClock(id, res[id].end);
      }
    }
  });
  ////

  ////
  return false;
};

const createTimer = e => {
  console.log(e);
  const id = Date.now();
  let name = $("name").value;
  let hour = $("hour").value;
  let minute = $("minute").value;
  let second = $("second").value;
  name = !!name ? name : "timer";
  hour = !!hour ? hour : 0;
  minute = !!minute ? minute : 0;
  second = !!second ? second : 0;
  console.log("Create Timer:", id);
  const end =
    parseInt(second) * 1000 +
    parseInt(minute) * 1000 * 60 +
    parseInt(hour) * 1000 * 60 * 60 +
    parseInt(id);
  console.log(name, second, minute, hour);

  axios
    .post("/create_timer", {
      id: id,
      end: end,
      name: name,
      hour: hour,
      minute: minute,
      second: second,
      disabled: false,
      headers: {
        "X-Content-Type-Options": "application/x-www-form-urlencoded"
      }
    })
    .then(function(response) {
      console.log(response);
      console.log("Timer created");
    })
    .catch(function(error) {
      console.log(error);
    });
};

const editTimer = id => {
  console.log(id);
  const name = $(id + "name").value;
  const hour = $(id + "hour").value;
  const minute = $(id + "minute").value;
  const second = $(id + "second").value;
  const end =
    parseInt(second) * 1000 +
    parseInt(minute) * 1000 * 60 +
    parseInt(hour) * 1000 * 60 * 60 +
    id;
  console.log("Edit Timer:", id);
  console.log(name, hour, minute);
  axios
    .post("/edit_timer", {
      id: id,
      end: end,
      name: name,
      hour: hour,
      minute: minute,
      second: second,
      disabled: false,
      headers: {
        "X-Content-Type-Options": "application/x-www-form-urlencoded"
      }
    })
    .then(function(response) {
      console.log(response);
      console.log("Timer edited");
    })
    .catch(function(error) {
      console.log(error);
    });
};

const deleteTimer = id => {
  console.log(id);
  //change to reflect modal

  axios
    .post("/delete_timer", {
      id: id,
      disabled: true,
      headers: {
        "X-Content-Type-Options": "application/x-www-form-urlencoded"
      }
    })
    .then(function(response) {
      console.log(response);
      console.log("Timer deleted");
    })
    .catch(function(error) {
      console.log(error);
    });
};
const editTimerModal = id => {
  MicroModal.show(id + "editModal");
};

const deleteTimerModal = id => {
  MicroModal.show(id + "deleteModal");
};
function getTimeRemaining(endtime) {
  var t = endtime - Date.now();
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector(".days");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    console.log(t.total);
    console.log("time");
    if (t.total <= 0) {
      console.log("STOP");
      clearInterval(timeinterval);
      daysSpan.innerHTML = "Timer End";
      hoursSpan.innerHTML = "";
      minutesSpan.innerHTML = "";
      secondsSpan.innerHTML = "";
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

//nosniff

//TODO display messages pop up (has been deleted, has been edited, created)
// remove timer when it ends

const polling = () => {
  getTimer();
};

setInterval(polling, 3000);
