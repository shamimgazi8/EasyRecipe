export const state = {
  selectedID: {},
  Recipe: {},
  Search: {
    result: [],
    query: {},
  },
  bookmarks: [],
};
export const searchQuery = async function (query) {
  try {
    if (!query) return;
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${query}`
    );
    if (!response.ok)
      throw new Error(
        `This Recipe  --{ ${query} }-- is not Found⛔ TRY SOMETHING ELSE!`
      );
    const data = await response.json();
    state.Search.result = data.recipes;
  } catch (err) {
    alert(err.message);
  }
};
export const selectedRecipe = async function () {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${state.selectedID}`
    );
    if (!response.ok) throw new Error("This Recipe Details is not Found");
    const data = await response.json();
    const { recipe } = data;
    state.Recipe = {
      id: recipe.recipe_id,
      img: recipe.image_url,
      publisher: recipe.publisher,
      url: recipe.publisher_url,
      title: recipe.title,
      ingredients: recipe.ingredients,
      source: recipe.source_url,
    };
    if (state.bookmarks.some((b_mark) => b_mark.id == state.selectedID))
      state.Recipe.bookmark = true;
    else state.Recipe.bookmark = false;
  } catch (err) {
    console.log(err.message);
  }
};
export const bookmarked_logic = function (recipe) {};
