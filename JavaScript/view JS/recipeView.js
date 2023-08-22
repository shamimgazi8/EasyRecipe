//Importing Data
import loding from "../../photo/loding.png";
import time from "../../photo/time.png";
import people from "../../photo/people.png";
import bookmark from "../../photo/bookmark.png";
import bookmark_fill from "../../photo/bookmark-fill.png";
import checkMark from "../../photo/check.png";

class recipeView {
  _parantEL = document.querySelector(".recipe_info");
  #data;
  render(data) {
    this.#data = data;
    const html = this.generateHTML();
    this._parantEL.innerHTML = " ";
    this._parantEL.insertAdjacentHTML("afterbegin", html);
  }

  generateHTML() {
    return `
        <div class="recipe-1 recipe" id=${this.#data.id}>
       <div class="cover_img">
         <img src=${this.#data.img} alt="" />
       </div>
       <div class="pizza_name">
         <div><p>${this.#data.title}</p></div>
       </div>
       <div class="time_serving">
         <div class="cooking_time">
           <div class="serving_tool_time">
             <img class="ic" src=${time} alt="" />
             <p>75 MINUTES</p>
           </div>
         </div>
         <div class="serving">
           <div class="serving_tool">
             <img class="ic" src=${people} alt="" />
             <p>4 SERVINGS</p>
           </div>
         </div>
         <div class="bookmark_div"><img class="ic ic_book" src=${
           this.#data.bookmark === true ? bookmark_fill : bookmark
         } alt="" />
         </div>
       </div>
       <div class="ingredients">
         <div class="rec-head">
         <p>RECIPE INGREDIENTS</p>  
         </div>
         <div class="rec-1">
           <ul class="recipe_ingredient_list">
   ${this.#data.ingredients
     .map((ing) => {
       return `
     <li class="recipe_ingredient">
     <p> <img class="checkmark" src=${checkMark} alt="">
     ${ing}</p>
   </li>
   `;
     })
     .join("")}
           </ul>
         </div>
       </div>
       <div class="footer">
         <h1>HOW TO COOK IT</h1>
         <p>
           This recipe was carefully designed and tested <span class="publisher">
           ${this.#data.publisher}</span> by Closet Cooking.
           Please check out directions at their website.
         </p>
         <div class="directions" >
         <a href="${this.#data.source}">
         <button>DIRECTION</button>
        
         </a>
         </div>
         
       </div>
     </div>
       `;
  }
  redirect = function (data) {
    const direction = document.querySelector(".directions");
    direction.addEventListener("click", function () {
      window.location.href = data.source;
    });
  };
  renderSpinner = function () {
    const html = `
      <div class="spinner">
      <img src=${loding} alt="" />
      </div>
      `;
    this._parantEL.innerHTML = "";
    this._parantEL.insertAdjacentHTML("afterbegin", html);
  };
}
export default new recipeView();
