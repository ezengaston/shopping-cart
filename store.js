import items from "./items.json";
import { addToCart } from "./shoppingCart";
import formatCurrency from "./util/formatCurrency.js";
import addGlobalEventListener from "./util/addGlobalEventListener.js";

const storeItemTemplate = document.querySelector("#store-item-template");
const storeItemContainer = document.querySelector("[data-store-container]");

export function setupStore() {
  if (storeItemContainer == null) return;
  addGlobalEventListener("click", "[data-add-button]", (e) => {
    const id = e.target.closest("[data-store-item]").dataset.itemId;
    addToCart(parseInt(id));
  });

  items.forEach(renderStoreItem);
}

function renderStoreItem(item) {
  const templateClone = storeItemTemplate.content.cloneNode(true);

  const storeItem = templateClone.querySelector("[data-store-item]");
  storeItem.dataset.itemId = item.id;

  const itemName = templateClone.querySelector("[data-name]");
  itemName.innerText = item.name;

  const itemCategory = templateClone.querySelector("[data-category]");
  itemCategory.innerText = item.category;

  const itemPrice = templateClone.querySelector("[data-price]");
  itemPrice.innerText = formatCurrency(item.priceCents / 100);

  const itemImage = templateClone.querySelector("[data-image]");
  itemImage.src = `https://dummyimage.com/210x130/${item.imageColor}/${item.imageColor}`;

  storeItemContainer.appendChild(templateClone);
}
