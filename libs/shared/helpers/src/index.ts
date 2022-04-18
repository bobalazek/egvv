export const convertTimeToMilliseconds = (time: string): number => {
  if (!time) {
    return 0;
  }

  const timeDotSplit = time.split('.');
  const timeCommaSplit = time.split(':');

  return (
    parseInt(timeDotSplit[1]) +
    parseInt(timeCommaSplit[2]) * 1000 +
    parseInt(timeCommaSplit[1]) * 60 * 1000 +
    parseInt(timeCommaSplit[0]) * 60 * 60 * 1000
  );
};

export const convertMillisecondsToTime = (duration?: number): string => {
  if (!duration) {
    return '';
  }

  const milliseconds = Math.floor(duration % 1000);
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const hoursString = String(hours).padStart(2, '0');
  const minutesString = String(minutes).padStart(2, '0');
  const secondsString = String(seconds).padStart(2, '0');
  const millisecondsString = String(milliseconds).padStart(3, '0');

  if (!hours && !minutes) {
    return `${secondsString}:${millisecondsString}`;
  } else if (!hours) {
    return `${minutesString}:${secondsString}:${millisecondsString}`;
  }

  return `${hoursString}:${minutesString}:${secondsString}:${millisecondsString}`;
};

export const sleep = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, time);
  });
};

export const convertToDashCase = (value: string) => {
  return value.toLowerCase().replace(/ /g, '-');
};

export const convertToHumanCase = (text: string) => {
  var tokens = text.split(/[ -]+/) || [];

  return tokens.map(capitalizeText).join(' ');
};

export const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.substring(1);
};
