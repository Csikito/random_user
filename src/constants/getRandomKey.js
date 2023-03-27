const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let keys = [];

const getRandomKey = () => {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < 30; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  if (keys.includes(result)) {
    return getRandomKey();
  } else {
    keys.push(result);
    return result;
  }
};

export default getRandomKey;
