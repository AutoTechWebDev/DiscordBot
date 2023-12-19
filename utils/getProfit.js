module.exports = () => {
  const randomNumber = Math.floor(Math.random() * 99) + 1;
  if (randomNumber <= 5) return -0.1;
  if (randomNumber <= 14) return -0.075;
  if (randomNumber <= 24) return -0.05;
  if (randomNumber <= 34) return -0.025;
  if (randomNumber <= 44) return 0;
  if (randomNumber <= 55) return 0.025;
  if (randomNumber <= 65) return 0.05;
  if (randomNumber <= 75) return 0.075;
  if (randomNumber <= 85) return 0.1;
  if (randomNumber <= 94) return 0.125;
  return 0.15;
};
