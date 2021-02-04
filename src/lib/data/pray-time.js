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
  const today = DateTime.local();

  // If first day of the month,
  // then take first index
  let activeIndex = (today.day === 1) ? 0 : 1;
  let nextDayIndex = (today.day === 1) ? 1 : 2;

  let activeTime = prayTimes.value[activeIndex];
  let nextDayTime = prayTimes.value[nextDayIndex];

  // Parse all pray times
  let timings = activeTime.timings;

  let nearest = 0;
  let nap;
  let nextActivePrayIndex; // current next active pray index to take other times
  
  // Pick next pray
  Object.keys(timings)
    .filter(checkPrayNames)
    .forEach((name, index) => {
      let waktuSholat = prayTimeParser(timings[name])

      const { milliseconds: diff } = today.diff(waktuSholat).toObject();

      if ((nearest === 0 && diff < nearest) || (nearest !== 0 && diff > nearest)) {
        nearest = diff;
        nap = name;
        nextActivePrayIndex = index;
      }

      if (nextActivePrayIndex < index) {
        nextOtherPrays.value.push({
          name: name,
          time: timings[name],
          nextDay: false
        });

        // At the end of same day iteration
        // get next day pray times (if any)
        if (index === FIVE_PRAYS.length - 1) {
          let nextDayTimings = Object.keys(nextDayTime.timings).filter(checkPrayNames)

          for (let x = 0; x < ((nextDayTimings.length - 1) - nextActivePrayIndex); x++) {
            nextOtherPrays.value.push({
              name: FIVE_PRAYS[x],
              time: timings[FIVE_PRAYS[x]],
              nextDay: true
            });
          }
        }
      }
    });

  // Next Active Pray is...
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