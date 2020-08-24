const axios = require('axios');

function spoonacularAPI() {
	return axios({
		method  : 'GET',
		url     : 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
		headers : {
			'content-type'    : 'application/octet-stream',
			'x-rapidapi-host' : 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
			'x-rapidapi-key'  : '6bbecd6a8bmshebec736d8c314e5p1b8dacjsnb819d756b83a',
			useQueryString    : true
		},
		params  : {
			number       : '1',
			ranking      : '1',
			ignorePantry : 'false',
			ingredients  : 'apples%2Cflour%2Csugar'
		}
	})
		.then((response) => {
			return axios({
				method  : 'GET',
				url     : `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${response.data[0]
					.id}/information`,
				headers : {
					'content-type'    : 'application/octet-stream',
					'x-rapidapi-host' : 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
					'x-rapidapi-key'  : '6bbecd6a8bmshebec736d8c314e5p1b8dacjsnb819d756b83a',
					useQueryString    : true
				}
			})
				.then((response) => {
					// console.log('this is response.data.summary!!!!! >>>> ', response.data);
					// console.log('end');
					// console.log('end');
					// console.log('end');
					// console.log('end');
					// console.log('end');
					// console.log('end');
					// console.log('end');
					// console.log('end');
					// console.log('end');
					// console.log('end');
					// console.log('end');
					// console.log('end');

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

// console.log(spoonacularAPI());
export default spoonacularAPI;
