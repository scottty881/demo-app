import React from "react";
import shortid from "shortid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteIcon from "@material-ui/icons/Favorite";

function Recipe({ recipeData }) {
  if (!recipeData.length) {
    return (
      <div className="recipeBlock">
        <p>No results were found</p>
      </div>
    );
  }
  return (
    <div className="recipeBlock">
      {recipeData.map(recipe => (
        <Card key={shortid.generate()}>
          <CardMedia image={recipe.image} className={"cardImage"} />
          <CardContent className="contentBlock">
            <div>
              <p className="primaryText">{recipe.label}</p>
              <p className="secondaryText">
                {recipe.calories.toFixed(0)} cal | {recipe.totalTime} min
              </p>
            </div>
            <FavoriteIcon color="primary" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Recipe;
