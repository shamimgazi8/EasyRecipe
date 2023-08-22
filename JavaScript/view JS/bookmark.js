import * as model from "../model.js";
import bookmarkpng from "../../photo/bookmark.png";
import bookmark_fill from "../../photo/bookmark-fill.png";
class bookmark {
  #data;
  #dropDownData;
  _parantEL = document.querySelector(".heading");
  dropdown_parant = document.querySelector(".dropdown");

  render(data) {
    this.#data = data;
    const html = this.generatHtml();
    const _bookmarkParants = document.querySelector(".bookmark_div");
    _bookmarkParants.innerHTML = " ";
    _bookmarkParants.insertAdjacentHTML("afterbegin", html);
  }
  generatHtml() {
    return ` <img class="ic ic_book" src=${
      this.#data.bookmark === true ? bookmark_fill : bookmarkpng
    } alt="" />
 `;
  }

  addeventhandeler(handeler) {
    this._parantEL.addEventListener("click", function (e) {
      e.preventDefault();
      const el = e.target.closest(".ic_book");
      if (!el) return;
      if (
        !model.state.Recipe.bookmark ||
        model.state.Recipe.bookmark == false
      ) {
        model.state.Recipe.bookmark = true;
        model.state.bookmarks.push(model.state.Recipe);
      } else {
        const index = model.state.bookmarks.findIndex(
          (el) => el.id === model.state.Recipe.id
        );
        model.state.Recipe.bookmark = false;
        model.state.bookmarks.splice(index, 1);
      }
      console.log(model.state.bookmarks);
      handeler();
    });
  }
  renderDropdown(data) {
    this.#dropDownData = data;
    const html = this.dropdownHtml();
    this.dropdown_parant.innerHTML = "";
    this.dropdown_parant.insertAdjacentHTML("afterbegin", html);
  }
  dropdownHtml() {
    return `
   ${this.#dropDownData
     .map((res) => {
       return `
    <div class="rec-1 rec" id="${res.id}">
    <img src=${res.img} alt="" />
    <p>${res.title}</p>
  </div>`;
     })
     .join("")}
    `;
  }
  recipe_view_Bookmark(handeler) {
    this.dropdown_parant.addEventListener("click", function (e) {
      const selectedItem = e.target.closest(".rec");
      if (!selectedItem) return;
      const id = selectedItem.id;
      model.state.selectedID = id;
      handeler();
    });
  }
  storeBookMark() {
    localStorage.setItem("Bookmarks", JSON.stringify(model.state.bookmarks));
  }
  restoreBookmarks() {
    const storage = localStorage.getItem("Bookmarks");
    if (storage) model.state.bookmarks = JSON.parse(storage);
    return model.state.bookmarks;
  }
}
export default new bookmark();
