const obj = {
  name: "aman",
  age: 15,
};

obj["name1"] = obj["name"];
obj["name"] = null;
console.log(obj);
