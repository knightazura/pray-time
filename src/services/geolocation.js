import axios from 'axios';

import SERVICES from './index'
import queryStringBuilder from '../lib/queryString'
import { places } from '../lib/data/places';

const searchCity = async function(keyword, offset = 0) {
  const query = queryStringBuilder({
    limit: 5,
    offset: offset,
    namePrefix: keyword
  })

  try {
    let place = await axios.get(`${SERVICES.GEOLOCATION_API}/geo/cities?${query}`)
    
    if (place.statusText === "OK" && place.status === 200) {
      // Set metadata
      const { metadata } = places;

      metadata.currentOffset = place.data.metadata.currentOffset;
      metadata.totalCount = place.data.metadata.totalCount;
      
      return [...place.data.data];
    }
  } catch (error) {
    return error;
  }

};

export {
  searchCity
}