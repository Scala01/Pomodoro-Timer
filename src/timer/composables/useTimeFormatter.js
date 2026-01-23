export const getFormattedTime = (seconds) => {
  const formattedMinuts = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;
  return `${formattedMinuts}:${formattedSeconds.toString().padStart(2, "0")}`;
};

export const getTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return { min, sec };
};
export const getMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};
