window.addEventListener("load", () => {
  const city = document.querySelector(".timezone");
  const dateElement = document.querySelector(".date");
  const timeElement = document.querySelector(".time");
  const dayElement = document.querySelector(".day");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;

      const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=945a05b7b60aff343b86c6ec33f4afd3`;

      const showDate = () => {
        // set date
        const fullDate = new Date();

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
        dayElement.innerHTML = dayName;
      };
      showDate();

      const showData = (element, data) => {
        element.innerHTML = data;
      };

      fetch(api)
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          console.log(data);

          showData(city, data.city.name);
          //   city.innerHTML = data.city.name;
        });
    });
  }
  // else {
  //     show error
  // }
});
