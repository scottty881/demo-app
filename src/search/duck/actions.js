import { createActions } from "reduxsauce";

const { Creators, Types } = createActions({
  updateFoodCategory: ["foodCategory"],
  updateSearchKeyword: ["searchKeyword"],
  requestRecipeData: ["foodCategory", "searchKeyword"],
  receiveRecipeData: ["recipeData"],
  updateTabIndex: ["tabIndex"]
});
export { Creators, Types };
