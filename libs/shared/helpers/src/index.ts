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
