import loding from "../../photo/loding.png";
import * as model from "../model.js";
const inputSearch = document.querySelector(".search_input");
const btnSearch = document.querySelector(".search_btn");
class searchView {
  _parantEL = document.querySelector(".search_result");
  _childEL = document.querySelector(".rec");
  _data;
  render(data) {
    this._data = data;
    const html = this.generateHTML();
    this._parantEL.innerHTML = "";
    this._parantEL.insertAdjacentHTML("afterbegin", html);
  }
  generateHTML() {
    return `
        ${this._data
          .map((res) => {
            return `
         <div class="rec-1 rec" id="${res.recipe_id}">
         <img src=${res.image_url} alt="" />
         <p>${res.title}</p>
       </div>`;
          })
          .join("")}
         `;
  }
  renderSpinner = function () {
    const html = `
  <div class="spinner">
  <img src=${loding} alt="" />
  </div>
  `;
    this._parantEL.innerHTML = "";
    this._parantEL.insertAdjacentHTML("afterbegin", html);
  };
  addeventhandaler(handeler) {
    btnSearch.addEventListener("click", function (e) {
      e.preventDefault();
      handeler();
    });
  }
  generate_selected_recipe(handeler) {
    document.querySelector(".heading").addEventListener("click", function (e) {
      const selected_item = e.target.closest(".rec");
      if (!selected_item) return;
      const id = selected_item.id;
      model.state.selectedID = id;
      handeler();
    });
  }
}
export default new searchView();
