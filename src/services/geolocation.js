import axios from 'axios';

import SERVICES from './index'
import queryStringBuilder from '../lib/queryString'

const searchCity = async function(keyword) {
  const query = queryStringBuilder({
    limit: 5,
    offset: 0,
    namePrefix: keyword
  })

  try {
    let place = await axios.get(`${SERVICES.GEOLOCATION_API}/geo/cities?${query}`)
    
    if (place.statusText === "OK" && place.status === 200) {
      return [...place.data.data];
    }
  } catch (error) {
    return error;
  }

};

export {
  searchCity
}