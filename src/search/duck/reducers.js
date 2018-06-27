import { Types } from "./actions";
const INITIAL_STATE = {
  foodCategory: "",
  searchKeyword: "",
  showLoading: false,
  limit: 10,
  offset: 0,
  tabIndex: 0,
  recipeData: []
};
const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.UPDATE_FOOD_CATEGORY: {
      const { foodCategory } = action;
      return { ...state, foodCategory };
    }

    case Types.UPDATE_SEARCH_KEYWORD: {
      const { searchKeyword } = action;
      return { ...state, searchKeyword };
    }

    case Types.REQUEST_RECIPE_DATA: {
      return {
        ...state,
        showLoading: true,
        offset: state.offset
      };
    }
    case Types.RECEIVE_RECIPE_DATA: {
      const { recipeData } = action;
      let newRecipeData = [];
      if (recipeData.length !== 0) {
        newRecipeData = state.recipeData.concat(recipeData);
      }
      return {
        ...state,
        recipeData: newRecipeData,
        showLoading: false,
        offset: state.offset + state.limit - 1
      };
    }
    case Types.UPDATE_TAB_INDEX: {
      const { tabIndex } = action;
      return { ...state, tabIndex };
    }
    default:
      return state;
  }
};

export default searchReducer;
