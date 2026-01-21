export const getFormattedTime = (seconds) => {
  const formattedMinuts = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;
  return `${formattedMinuts}:${formattedSeconds.toString().padStart(2, "0")}`;
};

export const getMinutesBySeconds = (seconds) => {
  return Math.floor(seconds / 60);
};
export const getFormattedSeconds = (seconds) => {
  return seconds % 60;
};
