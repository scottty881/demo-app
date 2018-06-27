import React from "react";
import RecipeContainer from "./RecipeContainer";
import ScrollListener from "react-scroll-listener";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const categories = [
  {
    value: "low-carb",
    displayValue: "Low Carb"
  },
  {
    value: "vegan",
    displayValue: "Vegan"
  },
  {
    value: "vegetarian",
    displayValue: "Vegetarian"
  },
  {
    value: "high-protein",
    displayValue: "High Protein"
  }
];
const scrollListener = new ScrollListener();

export class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  decideToFetch() {
    return () => {
      const {
        foodCategory,
        fetchRecipeOnScroll,
        searchKeyword,
        limit,
        offset,
        showLoading
      } = this.props;

      const isNearBottom =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 1000;
      console.log(isNearBottom);
      if (isNearBottom) {
        fetchRecipeOnScroll(
          foodCategory,
          searchKeyword,
          limit,
          offset,
          showLoading
        );
      }
    };
  }
  componentDidMount() {
    scrollListener.addScrollEndHandler("some-id", event => {
      // NOTE: if this were hitting a cache we controlled we could be more aggressive on loading and use the addScrollHandler instead
      //  the API has an aggressive rate limiter that makes being more aggressive not practical at the moment
      this.decideToFetch()();
    });
  }
  render() {
    let {
      onUpdateFoodCategory,
      foodCategory,
      fetchRecipe,
      searchKeyword,
      setActiveTab,
      onUpdateKeyword,
      limit,
      offset,
      tabIndex
    } = this.props;
    return (
      <div>
        <AppBar position="static" color="default" />
        <Tabs
          value={tabIndex}
          onChange={setActiveTab}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          {categories.map((category, index) => {
            return (
              <Tab
                key={index}
                value={index}
                label={category.displayValue}
                onClick={() => {
                  onUpdateFoodCategory(category.value);
                }}
                classes={{ selected: "tabSelected" }}
              />
            );
          })}
        </Tabs>
        <div className="searchBlock">
          <TextField
            label="Search compliant recipes"
            onChange={onUpdateKeyword}
          />
          <Button
            color="primary"
            onClick={() => {
              fetchRecipe(foodCategory, searchKeyword, limit, offset);
            }}
          >
            Search
          </Button>
        </div>
        <RecipeContainer />
      </div>
    );
  }
}
