import { ref } from "vue";
import { DateTime } from "luxon";

export const prayTimes = ref([]);
export const nextActivePray = ref({});
export const timer = ref({});
export const prayNow = ref(false);

export const setPrayTimes = function(times) {
  prayTimes.value = [].concat(times);

  // Check next active time
  nextActiveTime();

  // Do countdown timer
  startTimer();
}

export const nextActiveTime = function() {
  const today = DateTime.local();

  let activeTime = prayTimes.value[1];

  // If first day of the month
  if (today.day === 1) {
    activeTime = prayTimes.value[0];
  }

  // Parse all pray times
  let fivePrays = ['Asr', 'Dhuhr', 'Fajr', 'Isha', 'Maghrib'];
  let timings = activeTime.timings;

  let nearest = 0;
  let nap;
  
  // Pick next pray
  Object.keys(timings)
    .filter(name => fivePrays.includes(name))
    .forEach(name => {
      let waktuSholat = prayTimeParser(timings[name])

      const { milliseconds: diff } = today.diff(waktuSholat).toObject();

      if (nearest === 0 && diff < nearest) {
        nearest = diff;
        nap = name;
      } else if (nearest !== 0 && diff > nearest) {
        nearest = diff;
        nap = name;
      }
    });

  // Next Active Pray is...
  nextActivePray.value = {
    name: nap,
    time: timings[nap]
  };
}

const prayTimeParser = function(timing) {
  let prayTime = timing
    .split(" ")[0]
    .split(":");
  
  return DateTime.fromObject({
    hour: prayTime[0],
    minute: prayTime[1] 
  });
}

const startTimer = function () {
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