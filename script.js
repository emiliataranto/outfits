const closetGrid = document.querySelector('.closet .grid');
const uploadInput = document.getElementById('uploadItem');

let currentCategory = null;
const uploadInput = document.getElementById('uploadItem');

let currentCategory = null;
let selectedItems = [];

document.addEventListener('DOMContentLoaded', () => {
  const uploadInput = document.getElementById('uploadItem');

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
      const item = document.createElement('div');
      item.className = 'item';
      item.style.backgroundImage = `url(${reader.result})`;
      item.style.backgroundSize = 'cover';
      item.style.backgroundPosition = 'center';

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

      grid.insertBefore(item, grid.lastElementChild);
    };

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


