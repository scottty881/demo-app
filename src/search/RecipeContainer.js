import { connect } from "react-redux";
import Recipe from "./Recipe";

const mapStateToProps = state => {
  const { recipeData, showLoading, foodCategory } = state.search;
  return {
    isFirstSearch: !foodCategory && !recipeData.length,
    recipeData,
    showLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const RecipeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);

export default RecipeContainer;
