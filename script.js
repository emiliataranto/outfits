let closetData = JSON.parse(localStorage.getItem("closetData")) || {
  trousers: [],
  shirts: [],
  shorts: [],
  shoes: [],
  jackets: [],
  sweaters: [],
  dresses: []
};

let outfitsData = JSON.parse(localStorage.getItem("outfitsData")) || [];


const closetGrid = document.querySelector('.closet .grid');
const uploadInput = document.getElementById('uploadItem');

let currentCategory = null;
let selectedItems = [];

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS conectado ✅");

  const uploadInput = document.getElementById("uploadItem");
  const addItemButtons = document.querySelectorAll(".add-card[data-category]");
  const addOutfitBtn = document.getElementById("addOutfitBtn");

  // ADD ITEM (celu + desktop)
  addItemButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.category;
      console.log("Add item:", currentCategory);
      uploadInput.click();
    });
  });

  // SUBIR FOTO
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

  // ADD OUTFIT
  if (addOutfitBtn) {
    addOutfitBtn.addEventListener("click", () => {
      const builder = document.getElementById("builder");
      builder.classList.add("active");
      builder.scrollIntoView({ behavior: "smooth" });
    });
  }
});


  // hacemos la función global
  window.openUpload = function (category) {
    currentCategory = category;
    uploadInput.click();
  };

  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file || !currentCategory) return;

    const reader = new FileReader();
   reader.onload = () => {
  const imageData = reader.result;

  // guardar en data
  closetData[currentCategory].push(imageData);
  localStorage.setItem("closetData", JSON.stringify(closetData));

  renderClosetCategory(currentCategory);
};


      item.addEventListener('click', () => {
        item.classList.toggle('selected');
        if (selectedItems.includes(item)) {
          selectedItems = selectedItems.filter(i => i !== item);
        } else {
          selectedItems.push(item);
        }
      });

      const grid = document.querySelector(
        `.grid[data-category="${currentCategory}"]`
      );

      grid.insertBefore(item, grid.lastElementChild); };

    reader.readAsDataURL(file);
  });
});


let selectedItems = [];

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    e.target.classList.toggle('selected');

    if (selectedItems.includes(e.target)) {
      selectedItems = selectedItems.filter(i => i !== e.target);
    } else {
      selectedItems.push(e.target);
    }
  }
});

window.saveOutfit = function () {
  if (selectedItems.length === 0) return;

  const weather = document.getElementById('outfitWeather').value;
  const occasion = document.getElementById('outfitOccasion').value;
  const mood = document.getElementById('outfitMood').value;

  const outfit = document.createElement('div');
  outfit.className = 'outfit';
  outfit.dataset.weather = weather;
  outfit.dataset.occasion = occasion;
  outfit.dataset.mood = mood;
  
  const outfitData = {
  items: selectedItems.map(item => item.style.backgroundImage.slice(5, -2)),
  weather,
  occasion,
  mood
};

outfitsData.push(outfitData);
localStorage.setItem("outfitsData", JSON.stringify(outfitsData));


  outfit.style.display = 'grid';
  outfit.style.gridTemplateColumns = 'repeat(2, 1fr)';
  outfit.style.gap = '6px';

  selectedItems.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.remove('selected');
    outfit.appendChild(clone);
  });

  const grid = document.querySelector('.outfits .grid');
  grid.insertBefore(outfit, grid.querySelector('.add-card'));

  selectedItems.forEach(i => i.classList.remove('selected'));
  selectedItems = [];

  document.getElementById('builder').classList.remove('active');

  const msg = document.getElementById('savedMessage');
  msg.style.display = 'block';

  setTimeout(() => {
    msg.style.display = 'none';
  }, 2000);
};

  
  window.goToBuilder = function () {
  const builder = document.getElementById('builder');
  builder.classList.add('active');

  builder.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

}

function renderClosetCategory(category) {
  const grid = document.querySelector(`.grid[data-category="${category}"]`);

  // borrar todo menos el botón add
  grid.querySelectorAll(".item").forEach(i => i.remove());

  closetData[category].forEach(img => {
    const item = document.createElement("div");
    item.className = "item";
    item.style.backgroundImage = `url(${img})`;
    item.style.backgroundSize = "cover";
    item.style.backgroundPosition = "center";

   item.addEventListener("dblclick", () => {
  closetData[category] = closetData[category].filter(
    img => img !== item.style.backgroundImage.slice(5, -2)
  );

  localStorage.setItem("closetData", JSON.stringify(closetData));
  renderClosetCategory(category);
});


    grid.insertBefore(item, grid.lastElementChild);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  Object.keys(closetData).forEach(category => {
    renderClosetCategory(category);
  });

  renderOutfits();
});


function renderOutfits() {
  const grid = document.querySelector(".outfits .grid");

  grid.querySelectorAll(".outfit").forEach(o => o.remove());

  outfitsData.forEach((outfitData, index) => {
  const outfit = document.createElement("div");
  outfit.className = "outfit";
  outfit.dataset.weather = outfitData.weather;
  outfit.dataset.occasion = outfitData.occasion;
  outfit.dataset.mood = outfitData.mood;

  outfit.style.display = "grid";
  outfit.style.gridTemplateColumns = "repeat(2, 1fr)";
  outfit.style.gap = "6px";

  outfit.addEventListener("dblclick", () => {
    outfitsData.splice(index, 1);
    localStorage.setItem("outfitsData", JSON.stringify(outfitsData));
    renderOutfits();
  });

  outfitData.items.forEach(img => {
    const item = document.createElement("div");
    item.className = "item";
    item.style.backgroundImage = `url(${img})`;
    item.style.backgroundSize = "cover";
    item.style.backgroundPosition = "center";
    outfit.appendChild(item);
  });

  grid.insertBefore(outfit, grid.querySelector(".add-card"));
});

 

    outfitData.items.forEach(img => {
      const item = document.createElement("div");
      item.className = "item";
      item.style.backgroundImage = `url(${img})`;
      item.style.backgroundSize = "cover";
      item.style.backgroundPosition = "center";
      outfit.appendChild(item);
    });

    grid.insertBefore(outfit, grid.querySelector(".add-card"));
  });
}


window.chooseOutfit = function () {
  const weather = document.getElementById("filterWeather").value;
  const occasion = document.getElementById("filterOccasion").value;
  const mood = document.getElementById("filterMood").value;

  const outfits = document.querySelectorAll(".outfit");

  outfits.forEach(outfit => {
    const matchWeather =
      weather === "any" || outfit.dataset.weather === weather;
    const matchOccasion =
      occasion === "any" || outfit.dataset.occasion === occasion;
    const matchMood =
      mood === "any" || outfit.dataset.mood === mood;

    if (matchWeather && matchOccasion && matchMood) {
      outfit.style.display = "grid";
    } else {
      outfit.style.display = "none";
    }
  });
};
