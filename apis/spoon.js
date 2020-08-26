const axios = require("axios");

// 'apples%2Cflour%2Csugar'
function spoonacularAPI(arrOfIngr, count = 0) {
  return axios({
    method: "GET",
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "6bbecd6a8bmshebec736d8c314e5p1b8dacjsnb819d756b83a",
      useQueryString: true,
    },
    params: {
      number: "5",
      cuisine: "",
      instructionsRequired: "true",
      query: arrOfIngr.join(", "),
    },
  })
    .then((response) => {
      return axios({
        method: "GET",
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${response.data.results[count].id}/information`,
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "6bbecd6a8bmshebec736d8c314e5p1b8dacjsnb819d756b83a",
          useQueryString: true,
        },
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

export default spoonacularAPI;
