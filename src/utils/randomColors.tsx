export const generateColors = (red, green, blue): string => {
  red = Math.floor(Math.random() * 256);
  green = Math.floor(Math.random() * 256);
  blue = Math.floor(Math.random() * 256);
  return `rgb(${red},${green},${blue})`;
};
