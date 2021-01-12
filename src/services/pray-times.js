import axios from 'axios';

import SERVICES from './index';
import queryStringBuilder from '../lib/queryString';

const currentDate = new Date();

const properTime = ((time, index, arr) => {
  let today = currentDate.getDate();

  // If first day of month, then only takes current day and next day
  if (Object.is(today, 1) && (index === 0 || index === 1)) {
    return time;
  }
  // If it's neither first day or last day of month,
  // then take times one day before and after respectively
  else if (today > 1 && (index <= today && index >= today - 2)) {
    return time;
  }
  // If it's last day of month, takes current day and yesterday
  else if (Object.is(today, arr.length) && (index === arr.length - 1 || index === arr.length - 2)) {
    return time;
  }
})

const prayTimesByCity = async function(place) {
  const query = queryStringBuilder({
    city: place.city,
    country: place.countryCode,
    method: 3,
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear()
  });

  try {
    let response = await axios.get(`${SERVICES.PRAYTIMES_API}/calendarByCity?${query}`);

    if (response.statusText === "OK" && response.status === 200) {
      let times = [...response.data.data];

      return times.filter(properTime);
    }
  } catch (error) {
    return error;
  }
}

export {
  prayTimesByCity
}