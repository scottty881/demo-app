import request from "request";
import { Creators } from "./actions";
const APP_ID = "46f99e65";
const APP_KEY = "5269de07902ec8c13879cc46c22a6690";
const receiveRecipeData = Creators.receiveRecipeData;
const requestRecipeData = Creators.requestRecipeData;
const updateTabIndex = Creators.updateTabIndex;
const updateSearchKeyword = searchKeyword => {
  return dispatch => {
    dispatch(Creators.updateSearchKeyword(searchKeyword));
  };
};
const updateFoodCategory = foodCategory => {
  return dispatch => {
    dispatch(Creators.updateFoodCategory(foodCategory));
  };
};
const dispatchTabChange = tabIndex => {
  return dispatch => {
    console.log("tabIndex", tabIndex);
    dispatch(updateTabIndex(tabIndex));
  };
};
const fetchRecipe = (foodCategory, searchKeyword, limit, offset) => {
  return dispatch => {
    dispatch(requestRecipeData(foodCategory, searchKeyword));
    return new Promise(resolve => {
      request(
        {
          url: `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&diet=${foodCategory}&q=${searchKeyword}&from=${offset}&to=${offset +
            limit}`,
          headers: {
            "Content-Type": "application/json"
          }
        },
        (err, data) => {
          if (err) {
            return resolve();
          }
          return resolve(JSON.parse(data.body));
        }
      );
      // for testing:  resolve(require("./test.json"););
    }).then(responseData => {
      console.log(responseData);
      if (!responseData) {
        // the API returns 403/401 for searches without results, need a better solution here
        return dispatch(receiveRecipeData([]));
      }
      console.log(responseData);
      const mappedData = responseData.hits.map(row => {
        return row.recipe;
      });
      dispatch(receiveRecipeData(mappedData));
    });
  };
};
export default {
  fetchRecipe,
  updateFoodCategory,
  updateSearchKeyword,
  dispatchTabChange
};
