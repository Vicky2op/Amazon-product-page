let field = document.querySelector(".items");
let li = Array.from(field.children);

const defaultSort = document.getElementById("default");
const priceLtH = document.getElementById("LowToHigh");
const priceHtL = document.getElementById("HighToLow");
const nameAtZ = document.getElementById("AtoZ");
const nameZtA = document.getElementById("ZtoA");
const stars = document.getElementById("StarRating");
const delivery = document.getElementById("DeliveryDate");

const allStars = document.getElementById("allStar");
const fiveStars = document.getElementById("fiveStar");
const fourStars = document.getElementById("fourStar");
const threeStars = document.getElementById("threeStar");
const twoStars = document.getElementById("twoStar");
const oneStar = document.getElementById("oneStar");

let select = document.getElementById("select");
let ar = [];
for (let i of li) {
  const dateString = i.lastElementChild;
  const secLast = dateString.previousElementSibling;
  const starSpan = secLast.previousElementSibling;
  const nameTag = starSpan.previousElementSibling;

  const price = secLast.textContent.trim();
  const star = Number(starSpan.lastElementChild.textContent.trim());
  const name = nameTag.textContent;
  const date = dateString.textContent.trim().replaceAll(" ", "")[13];

  i.setAttribute("data-name", name);
  i.setAttribute("data-price", price);
  i.setAttribute("data-rating", star);
  i.setAttribute("data-deliverydate", date);
  ar.push(i);
}


// SortingProducts
defaultSort.addEventListener("click", () => {
    console.log("Sorted, Default");
    while (field.firstChild) {
      field.removeChild(field.firstChild);
    }
    field.append(...ar);
    for(i of select.children){
      if(i.classList.contains("active")){
        i.classList.remove("active");
      }
    }
    defaultSort.classList.add("active");
  });
priceLtH.addEventListener("click", () => {
    console.log("Sorted, Price: Low to High");
    SortElemByPrice(field, li, true);
    for(i of select.children){
      if(i.classList.contains("active")){
        i.classList.remove("active");
      }
    }
    priceLtH.classList.add("active");
  });
priceHtL.addEventListener("click", () => {
    console.log("Sorted, Price: High to Low");
    SortElemByPrice(field, li, false)
    for(i of select.children){
      if(i.classList.contains("active")){
        i.classList.remove("active");
      }
    }
    priceHtL.classList.add("active");
  });
nameAtZ.addEventListener("click", () => {
    console.log("Sorted, Name: A to Z");
    SortElemByName(field, li, true)
    for(i of select.children){
      if(i.classList.contains("active")){
        i.classList.remove("active");
      }
    }
    nameAtZ.classList.add("active");
  });
nameZtA.addEventListener("click", () => {
    console.log("Sorted, Name: Z to A");
    SortElemByName(field, li, false)
    for(i of select.children){
      if(i.classList.contains("active")){
        i.classList.remove("active");
      }
    }
    nameZtA.classList.add("active");
  });
stars.addEventListener("click", () => {
    console.log("Sorted, Star Rating");
    SortElemByRating(field, li, false)
    for(i of select.children){
      if(i.classList.contains("active")){
        i.classList.remove("active");
      }
    }
    stars.classList.add("active");
  });
delivery.addEventListener("click", () => {
    console.log("Sorted, Delivery Date");
    SortElemByDate(field, li, true)
    for(i of select.children){
      if(i.classList.contains("active")){
        i.classList.remove("active");
      }
    }
    delivery.classList.add("active");
  });

//Total number of elements shown rn
let elemShown = document.getElementById("totalProductsShown");
newElemShown=li.length+" Products"
elemShown.textContent=elemShown.textContent.replace(elemShown.textContent,newElemShown);

// FilteringProducts
allStars.addEventListener("click", () => {
    let elemShown = document.getElementById("totalProductsShown");
    newElemShown=li.length+" Products"
    elemShown.textContent=elemShown.textContent.replace(elemShown.textContent,newElemShown)
});
fiveStars.addEventListener("click", () => {
  shownElements(5)
});
fourStars.addEventListener("click", () => {
  shownElements(4)
});
threeStars.addEventListener("click", () => {
  shownElements(3)
});
twoStars.addEventListener("click", () => {
  shownElements(2)
});
oneStar.addEventListener("click", () => {
  shownElements(1)
});

new FilterProduct().run();
let todayDate = new Date();
for (i of li) {
    days = Number(i.getAttribute("data-deliverydate"));
    giveDate(i, todayDate, days);
}
function FilterProduct() {
    let indicator = document.querySelector(".indicator").children;
  
    this.run = function () {
      for (let i = 0; i < indicator.length; i++) {
        indicator[i].onclick = function () {
          for (let x = 0; x < indicator.length; x++) {
            indicator[x].classList.remove("active");
          }
          this.classList.add("active");
          const displayItems = this.getAttribute("data-filter");
  
          for (let z = 0; z < li.length; z++) {
            li[z].style.transform = "scale(0)";
            setTimeout(() => {
              li[z].style.display = "none";
            }, 500);
  
            if (
              li[z].getAttribute("data-rating") == displayItems ||
              displayItems == "all"
            ) {
              li[z].style.transform = "scale(1)";
              setTimeout(() => {
                li[z].style.display = "block";
              }, 500);
              
            }
          }
        };
      }
    };
  } 
function shownElements(star) {
  hiddenItems=[];
  for(i of li){
    if(i.getAttribute("data-rating") == star){
      hiddenItems.push(i);
    }
  }
  itemsShownRn=hiddenItems.length;
  let elemShown = document.getElementById("totalProductsShown");
  newElemShown=itemsShownRn+" Products"
  elemShown.textContent=elemShown.textContent.replace(elemShown.textContent,newElemShown)
};
function giveDate(i, date, days) {
  // console.log(delDays)
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  resultStr = result.toString();
  slicedRes ="Delivery by :" + resultStr.slice(0, 3) + "," + resultStr.slice(3, 16);
  i.lastElementChild.textContent =i.lastElementChild.textContent.replace(i.lastElementChild.textContent,slicedRes);
}

function SortElemByPrice(field, li, asc) {
  let dm, sortli;
  dm = asc ? 1 : -1;
  sortli = li.sort((a, b) => {
    const ar = a.getAttribute("data-price");
    const br = b.getAttribute("data-price");
    const ax = Number(ar.substring(1));
    const bx = Number(br.substring(1));
    return ax > bx ? 1 * dm : -1 * dm;
  });
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
  field.append(...sortli);
}
function SortElemByName(field, li, asc) {
  let dm, sortli;
  dm = asc ? 1 : -1;
  sortli = li.sort((a, b) => {
    const ax = a.getAttribute("data-name");
    const bx = b.getAttribute("data-name");
    return ax > bx ? 1 * dm : -1 * dm;
  });
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
  field.append(...sortli);
}
function SortElemByRating(field, li, asc) {
  let dm, sortli;
  dm = asc ? 1 : -1;
  sortli = li.sort((a, b) => {
    const ax = a.getAttribute("data-rating");
    const bx = b.getAttribute("data-rating");
    return ax > bx ? 1 * dm : -1 * dm;
  });
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
  field.append(...sortli);
}
function SortElemByDate(field, li, asc) {
  let dm, sortli;
  dm = asc ? 1 : -1;
  sortli = li.sort((a, b) => {
    const ax = a.getAttribute("data-deliverydate");
    const bx = b.getAttribute("data-deliverydate");
    return ax > bx ? 1 * dm : -1 * dm;
  });
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
  field.append(...sortli);
}
function navFunction() {
  var x = document.getElementById("navbarr");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}