const phat = {
  name: "Phat",
  age: 20,
};
const { name, ...rest } = phat;

console.log(rest);
