import * as model from "./model.js";
import searchView from "./view JS/searchView.js";
import recipeView from "./view JS/recipeView.js";
import bookmark from "./view JS/bookmark.js";
const inputSearch = document.querySelector(".search_input");
const btnSearch = document.querySelector(".search_btn");
const searchviweResult = async function () {
  searchView.renderSpinner();
  const searchValue = inputSearch.value;
  await model.searchQuery(searchValue);
  searchView.render(model.state.Search.result);
  inputSearch.value = "";
};
const RecipeViewResult = async function () {
  recipeView.renderSpinner();
  await model.selectedRecipe();
  recipeView.render(model.state.Recipe);
  recipeView.redirect(model.state.Recipe);
};
const controlBookmark = function () {
  bookmark.render(model.state.Recipe);
  bookmark.renderDropdown(model.state.bookmarks);
  bookmark.storeBookMark();
};
const controlLocalStorage = function () {
  const storage = bookmark.restoreBookmarks();
  if (storage) bookmark.renderDropdown(model.state.bookmarks);
};
const controlRecipeAdd = function () {
  const openModalBtn = document.querySelector(".add_recipe");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalContainer = document.getElementById("modalContainer");
  const modal = document.querySelector(".modal");
  openModalBtn.addEventListener("click", function () {
    modalContainer.style.display = "block";
    setTimeout(() => {
      modalContainer.style.opacity = "1";
      modal.style.opacity = "1";
      modal.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10); // Small delay to allow transition to take effect
  });
  closeModalBtn.addEventListener("click", function () {
    modal.style.opacity = "0";
    modal.style.transform = "translate(-50%, -50%) scale(0.9)";
    modalContainer.style.opacity = "0";
    setTimeout(() => {
      modalContainer.style.display = "none";
    }, 300); // Wait for the transition to complete before hiding
  });
};

const init = function () {
  searchView.addeventhandaler(searchviweResult);
  searchView.generate_selected_recipe(RecipeViewResult);
  bookmark.addeventhandeler(controlBookmark);
  bookmark.recipe_view_Bookmark(RecipeViewResult);
  controlLocalStorage();
  controlRecipeAdd();
};
init();
