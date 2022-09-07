//node seeds/seeds.js 실행시 더미 데이터 20마리씩 추가
const axios = require("axios");
const dogbreedsArr = require("./dogbreeds");
const dogbreeds = dogbreedsArr.map((val) => val.name);
const catbreeds = require("./catbreeds");
const petname = require("./petname");
const owner = require("./ownername");
const species = ["dog", "cat"];
const sex = ["IM", "CM", "IF", "SF"];
const Animal = require("../models/animal");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/happyCall")
  .then(() => {
    console.log("mongoose connection open");
  })
  .catch((err) => {
    console.log("error happened");
    console.log(err);
  });

const randomGenerator = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

function phonenumberGenerator() {
  let num = "010";
  for (let i = 0; i < 8; i++) {
    num += Math.floor(Math.random() * 9) + 1;
  }
  return num;
}

const getRandomImgAndSeeds = async () => {
  let catImgURL = [];
  let dogImgURL = [];
  await axios
    .get(
      "https://api.thecatapi.com/v1/images/search?limit=20&api_key=live_9qx0ax2dURRspsPLxlpjPsmhFKDc4Zsc9P62xo2ERUQ4q3VIHBuwSBTDTLZQnqEb"
    )
    .then((res) => (catImgURL = [...res.data.map((a) => a.url)]));
  await axios
    .get("https://dog.ceo/api/breeds/image/random/20")
    .then((res) => (dogImgURL = [...res.data.message]));

  await Animal.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const randomSpecies = randomGenerator(species);
    const animal = new Animal({
      name: randomGenerator(petname),
      owner: randomGenerator(owner),
      phonenumber: phonenumberGenerator(),
      species: randomSpecies,
      breed:
        randomSpecies === "dog"
          ? randomGenerator(dogbreeds)
          : randomGenerator(catbreeds),
      sex: randomGenerator(sex),
      birth: `200${Math.floor(Math.random() * 10)}-0${Math.floor(
        Math.random() * 9
      )}-1${Math.floor(Math.random() * 10)}`,
      image: randomSpecies === "dog" ? dogImgURL[i] : catImgURL[i],
      memo: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    });
    await animal.save();
  }
};
getRandomImgAndSeeds();
