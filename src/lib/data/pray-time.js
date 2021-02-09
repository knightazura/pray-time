import { ref } from "vue";
import { DateTime } from "luxon";

const FIVE_PRAYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export const prayTimes = ref([]);
export const nextActivePray = ref({});
export const nextOtherPrays = ref([]);
export const timer = ref({});
export const prayNow = ref(false);

export const setPrayTimes = function(times) {
  // Initialization and reset
  prayTimes.value = [].concat(times);
  nextOtherPrays.value = []

  // Check next active time
  nextActiveTime();

  // Do countdown timer
  startTimer();
}

export const nextActiveTime = () => {
  // Init.
  const today     = DateTime.local();
  let nearest     = 0;
  let activeTime  = prayTimes.value[0];
  let nextDayTime = prayTimes.value[1];
  let nap;                  // next ACTIVE pray
  let nextActivePrayIndex;  // next ACTIVE pray index

  // Iterate over prays to take pray time
  Object.keys(activeTime.timings)
    .filter(checkPrayNames)
    .forEach((name, index) => {
      let waktuSholat = prayTimeParser(timings[name])

      const { milliseconds: diff } = today.diff(waktuSholat).toObject();

      // Get next ACTIVE pray
      if ((nearest === 0 && diff < nearest) || (nearest !== 0 && diff > nearest)) {
        nearest = diff;
        nap = name;
        nextActivePrayIndex = index;
      }

      // Get other next prays for today
      if (nextActivePrayIndex < index) {
        nextOtherPrays.value.push({
          name: name,
          time: timings[name],
          nextDay: false
        });

        // At the end of the day iteration
        // get tomorrow pray times (up to 4)
        if (index === FIVE_PRAYS.length - 1) {
          Object.keys(nextDayTime.timings)
            .filter(checkPrayNames)
            .forEach((name, index) => {
              if (index < nextActivePrayIndex) {
                nextOtherPrays.value.push({
                  name: FIVE_PRAYS[index],
                  time: timings[FIVE_PRAYS[index]],
                  nextDay: true
                });
              }
            });
        }
      }
    });

  // Next ACTIVE Pray is...
  nextActivePray.value = {
    name: nap,
    time: timings[nap]
  };
}

const checkPrayNames = name => FIVE_PRAYS.includes(name);

const prayTimeParser = timing => {
  let prayTime = timing
    .split(" ")[0]
    .split(":");
  
  return DateTime.fromObject({
    hour: prayTime[0],
    minute: prayTime[1] 
  });
}

const startTimer = () => {
  let prayTime = prayTimeParser(nextActivePray.value.time);
  let tr = DateTime.local().diff(prayTime).toObject().milliseconds;

  // Init countdown timer
  timer.value = DateTime.local().diff(prayTime, ['hours', 'minutes', 'second']).toObject();

  let counter = setInterval(() => {
    if (tr === 0) {
      clearInterval(counter);
      prayNow.value = true;

      nextActiveTime();

      startTimer();
    } else {
      tr += 60000;
      timer.value = DateTime.local().diff(prayTime, ['hours', 'minutes', 'second']).toObject();
    }
  }, 60000);
}