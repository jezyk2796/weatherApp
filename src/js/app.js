window.addEventListener("load", () => {
  const city = document.querySelector(".timezone");
  const dateElement = document.querySelector(".date");
  const timeElement = document.querySelector(".time");
  const dayElement = document.querySelector(".day");
  const currentDescription = document.querySelector(".current-description");
  const currentDegree = document.querySelector(".degree");
  const currentIcon = document.querySelector(".current-icon i");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;

      const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=945a05b7b60aff343b86c6ec33f4afd3`;

      // CLOCK
      const showTime = () => {
        const fullDate = new Date();

        let hours = fullDate.getHours();
        if (hours < 10) {
          hours = `0${hours}`;
        }
        let minutes = fullDate.getMinutes();
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        let seconds = fullDate.getSeconds();
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }

        timeElement.innerHTML = `${hours}:${minutes}:${seconds}`;

        setTimeout(showTime, 1000);
      }
      showTime();

      // DATE
      const showDate = () => {
        const fullDate = new Date();

        // set date
        let day = fullDate.getDate();
        if (day < 10) {
          day = `0${day}`;
        }

        let month = fullDate.getMonth();
        month += 1;
        if (month < 10) {
          month = `0${month}`;
        }

        const year = fullDate.getFullYear();
        const currentDate = `${day}.${month}.${year}`;

        // set day
        const dayOfWeek = fullDate.getDay();
        let dayName;

        switch (dayOfWeek) {
          case 0:
            dayName = "Sunday";
            break;
          case 1:
            dayName = "Monday";
            break;
          case 2:
            dayName = "Tuesday";
            break;
          case 3:
            dayName = "Wednesday";
            break;
          case 4:
            dayName = "Thursday";
            break;
          case 5:
            dayName = "Friday";
            break;
          case 6:
            dayName = "Saturday";
            break;
        }

        // show date
        dateElement.innerHTML = currentDate;
        // show day
        dayElement.textContent = dayName;
      };
      showDate();

      // put data from API into HTML elements
      const showData = (element, data) => {
        element.innerHTML = data;
      };

      const showIcon = (id, icon) => {
        if (id >= 800) {
          if (icon.includes('d')) {
            currentIcon.className = `wi wi-owm-day-${id}`;
          } else if (icon.includes('n')) {
            currentIcon.className = `wi wi-owm-night-${id}`;
          }
        } else {
          currentIcon.className = `wi wi-owm-${id}`;
        }
      };

      fetch(api)
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          // ------------
          console.log(data)

          showData(city, data.city.name);

          return data.list;
        })
        .then(list => {
          // --------------
          console.log(list[0]);

          const temp = `${Math.floor(list[0].main.temp)}&deg;`;

          showData(currentDescription, list[0].weather[0].description);
          showData(currentDegree, temp);
          showIcon(list[0].weather[0].id, list[0].weather[0].icon);
        })
        .catch(error => {
          return console.error(`Error: ${error}`);
        });

    });
  }
  // else {
  //     show error
  // }
});