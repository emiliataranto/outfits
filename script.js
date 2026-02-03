// =====================
// DATA
// =====================
let closetData = JSON.parse(localStorage.getItem("closetData")) || {
  trousers: [],
  shirts: [],
  shorts: [],
  shoes: [],
  jackets: [],
  sweaters: [],
  dresses: [],
  accessories: [],
  bags: []
};

let outfitsData = JSON.parse(localStorage.getItem("outfitsData")) || [];

let currentCategory = null;
let selectedItems = [];

// =====================
// DOM READY
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("uploadItem");
  const addItemButtons = document.querySelectorAll(".add-card[data-category]");
  const addOutfitBtn = document.getElementById("addOutfitBtn");

  // ADD ITEM
  addItemButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.category;
      uploadInput.click(); // en celu abre galería
    });
  });

  // UPLOAD IMAGE
  uploadInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file || !currentCategory) return;

    const reader = new FileReader();
    reader.onload = () => {
      closetData[currentCategory].push(reader.result);
      localStorage.setItem("closetData", JSON.stringify(closetData));
      renderClosetCategory(currentCategory);
    };
    reader.readAsDataURL(file);
  });

  // ADD OUTFIT BUTTON
  if (addOutfitBtn) {
    addOutfitBtn.addEventListener("click", () => {
      document.getElementById("builder").classList.add("active");
    });
  }

  // RENDER EVERYTHING
  Object.keys(closetData).forEach(renderClosetCategory);
  renderOutfits();
});

// =====================
// CLOSET
// =====================
function renderClosetCategory(category) {
  const grid = document.querySelector(`.grid[data-category="${category}"]`);
  if (!grid) return;

  grid.querySelectorAll(".item").forEach(i => i.remove());

  closetData[category].forEach(img => {
    const item = document.createElement("div");
    item.className = "item";
    item.style.backgroundImage = `url(${img})`;

    item.addEventListener("click", () => {
      item.classList.toggle("selected");
      selectedItems.includes(item)
        ? selectedItems = selectedItems.filter(i => i !== item)
        : selectedItems.push(item);
    });

    grid.insertBefore(item, grid.lastElementChild);
  });
}

// =====================
// SAVE OUTFIT
// =====================
window.saveOutfit = function () {
  if (!selectedItems.length) return;

  const outfitData = {
    items: selectedItems.map(i =>
      i.style.backgroundImage.slice(5, -2)
    ),
    weather: outfitWeather.value,
    occasion: outfitOccasion.value,
    mood: outfitMood.value
  };

  outfitsData.push(outfitData);
  localStorage.setItem("outfitsData", JSON.stringify(outfitsData));

  selectedItems.forEach(i => i.classList.remove("selected"));
  selectedItems = [];

  document.getElementById("builder").classList.remove("active");
  renderOutfits();
};

// =====================
// RENDER OUTFITS
// =====================
function renderOutfits() {
  const grid = document.querySelector(".outfits .grid");
  if (!grid) return;

  grid.querySelectorAll(".outfit").forEach(o => o.remove());

  outfitsData.forEach((data, index) => {
    const outfit = document.createElement("div");
    outfit.className = "outfit";
    outfit.dataset.weather = data.weather;
    outfit.dataset.occasion = data.occasion;
    outfit.dataset.mood = data.mood;

    data.items.forEach(img => {
      const item = document.createElement("div");
      item.className = "item";
      item.style.backgroundImage = `url(${img})`;
      outfit.appendChild(item);
    });

    outfit.addEventListener("dblclick", () => {
      outfitsData.splice(index, 1);
      localStorage.setItem("outfitsData", JSON.stringify(outfitsData));
      renderOutfits();
    });

    grid.insertBefore(outfit, grid.querySelector(".add-card"));
  });
}

// =====================
// FILTER
// =====================
window.chooseOutfit = function () {
  document.querySelectorAll(".outfit").forEach(o => {
    o.style.display = "grid";
  });
};
