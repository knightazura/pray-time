import { ref } from "vue";
import { DateTime } from "luxon";

const FIVE_PRAYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

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

const setNextOtherPrays = (timings, index) => {
  nextOtherPrays.value.push({
    name: FIVE_PRAYS[index],
    time: timings[FIVE_PRAYS[index]],
    nextDay: true,
    icon: setPrayIconName(FIVE_PRAYS[index])
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

const extractTime = time => time.split(" ")[0];

const setPrayIconName = prayName => `${prayName.toLowerCase()}-icon`;

const setNextActivePray = (name, time) => {
  return {
    name: name,
    time: extractTime(time),
    icon: setPrayIconName(name)
  }
}

/**
 * :: Exported ::
 * Reactive data & states
 */
export const prayTimes = ref([]);
export const nextActivePray = ref({});
export const nextOtherPrays = ref([]);
export const timer = ref({});
export const prayNow = ref(false);

/**
 * :: Exported functions ::
 */
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
  let timings     = activeTime.timings;
  let nap;                  // next ACTIVE pray
  let nextActivePrayIndex = 0;  // next ACTIVE pray index

  // Iterate over prays to take pray time
  Object.keys(timings)
    .filter(checkPrayNames)
    .forEach((name, index) => {
      let waktuSholat = prayTimeParser(timings[name])

      const { milliseconds: diff } = today.diff(waktuSholat).toObject();

      // Get next ACTIVE pray
      if ((nearest === 0 && diff < nearest) || (nearest !== 0 && diff > nearest)) {
        nearest = diff;
        nextActivePrayIndex = index;
        nap = setNextActivePray(name, timings[name]);
      }

      // Get other next prays for today
      if (nextActivePrayIndex < index) {
        nextOtherPrays.value.push({
          name: name,
          time: timings[name],
          nextDay: false,
          icon: setPrayIconName(name)
        });

        // At the end of the day iteration
        // get tomorrow pray times (up to 4)
        if (index === FIVE_PRAYS.length - 1) {

          // next ACTIVE pray is tomorrow Fajr!
          if (nextActivePrayIndex === 0) {
            nap = setNextActivePray(FIVE_PRAYS[0], nextDayTime.timings[FIVE_PRAYS[0]]);

            // Because all next other prays are tomorrow
            // reset it!
            nextOtherPrays.value = [];
          }

          Object.keys(nextDayTime.timings)
            .filter(checkPrayNames)
            .forEach((name, index) => {
              if (index < nextActivePrayIndex) {
                setNextOtherPrays(timings, index);
              } else if (nextActivePrayIndex === 0 && index > nextActivePrayIndex) {
                setNextOtherPrays(timings, index);
              }
            });
        }
      }
    });

  // Next ACTIVE Pray is...
  nextActivePray.value = {...nap};
}