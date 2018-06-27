import { connect } from "react-redux";
import { Search } from "./Search";
import { searchOperations } from "./duck";

const mapStateToProps = state => {
  const {
    searchKeyword,
    foodCategory,
    recipeData,
    limit,
    offset,
    tabIndex
  } = state.search;
  return { searchKeyword, foodCategory, recipeData, limit, offset, tabIndex };
};

const mapDispatchToProps = dispatch => {
  const onUpdateKeyword = event => {
    dispatch(searchOperations.updateSearchKeyword(event.target.value));
  };
  const onUpdateFoodCategory = foodCategory =>
    dispatch(searchOperations.updateFoodCategory(foodCategory));
  const fetchRecipe = (foodCategory, searchKeyword, limit, offset) =>
    dispatch(
      searchOperations.fetchRecipe(foodCategory, searchKeyword, limit, offset)
    );
  const setActiveTab = (event, tabIndex) => {
    dispatch(searchOperations.dispatchTabChange(tabIndex));
  };
  const fetchRecipeOnScroll = (
    foodCategory,
    searchKeyword,
    limit,
    offset,
    showLoading
  ) => {
    if (showLoading) {
      return;
    }
    dispatch(
      searchOperations.fetchRecipe(foodCategory, searchKeyword, limit, offset)
    );
  };
  return {
    onUpdateKeyword,
    onUpdateFoodCategory,
    fetchRecipe,
    fetchRecipeOnScroll,
    setActiveTab
  };
};

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;
