
const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};



const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavBar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavBar);



const header = document.querySelector("[data-header]");
let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;

  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
  }
});

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

if (heroSlider && heroSliderItems.length > 0 && heroSliderPrevBtn && heroSliderNextBtn) {
  let currentSlidePos = 0;
  let lastActiveSliderItem = heroSliderItems[0];

  const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
  }

  const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }
    updateSliderPos();
  }

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = heroSliderItems.length - 1;
    } else {
      currentSlidePos--;
    }
    updateSliderPos();
  }

  heroSliderNextBtn.addEventListener("click", slideNext);
  heroSliderPrevBtn.addEventListener("click", slidePrev);

  let autoSlideInterval;

  const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
      slideNext();
    }, 7000);
  }

  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
  });

  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
  window.addEventListener("load", autoSlide);
}



const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;


  x = -(x * 2);
  y = -(y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++){
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);

  parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});


const revealServiceCards = function () {
  const serviceCards = document.querySelectorAll('.service-card');

  const revealOnScroll = function () {
    serviceCards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (cardTop < windowHeight - 100) {
        setTimeout(() => {
          card.classList.add('revealed');
        }, index * 200); 
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); 
};


const revealMenuCategories = function () {
  const menuCategories = document.querySelectorAll('.menu-category');

  const revealOnScroll = function () {
    menuCategories.forEach((category, index) => {
      const categoryTop = category.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (categoryTop < windowHeight - 100) {
        setTimeout(() => {
          category.classList.add('revealed');
        }, index * 150); 
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); 
};



const revealMenuCards = function () {
  const menuCards = document.querySelectorAll('.menu-card');

  const revealOnScroll = function () {
    menuCards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (cardTop < windowHeight - 100) {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 200); 
      }
    });
  };

  
  menuCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); 
};


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price: parseInt(price), quantity: 1 });
  }
  saveCart();
  alert('Item added to cart! Total items: ' + cart.length);
  updateCart();
}

function updateQuantity(name, change) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      saveCart();
      updateCart();
    }
  }
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
  const cartItemsList = document.getElementById('cart-items-list');
  const cartItems = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const cartSummary = document.getElementById('cart-summary');
  const emptyCart = document.getElementById('empty-cart');
  const cartCountElement = document.getElementById('cart-count');

  if (cartItemsList) {
    cartItemsList.innerHTML = '';
  }
  if (cartItems) {
    cartItems.innerHTML = '';
  }
  cartTotal = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    if (emptyCart) emptyCart.style.display = 'block';
    if (cartSummary) cartSummary.style.display = 'none';
    if (cartCountElement) cartCountElement.textContent = '0';
    return;
  }

  if (emptyCart) emptyCart.style.display = 'none';
  if (cartSummary) cartSummary.style.display = 'block';

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    cartTotal += itemTotal;
    totalItems += item.quantity;


    if (cartItemsList) {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.className = 'cart-item';
      cartItemDiv.innerHTML = `
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>${item.price} EGP each</p>
        </div>
        <div class="cart-item-controls">
          <div class="quantity-controls">
            <button class="quantity-btn decrease-btn">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn increase-btn">+</button>
          </div>
          <button class="remove-btn">Remove</button>
        </div>
      `;

     
      const decreaseBtn = cartItemDiv.querySelector('.decrease-btn');
      const increaseBtn = cartItemDiv.querySelector('.increase-btn');
      const removeBtn = cartItemDiv.querySelector('.remove-btn');

      decreaseBtn.addEventListener('click', () => updateQuantity(item.name, -1));
      increaseBtn.addEventListener('click', () => updateQuantity(item.name, 1));
      removeBtn.addEventListener('click', () => removeFromCart(item.name));

      cartItemsList.appendChild(cartItemDiv);
    }

 
    if (cartItems) {
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.quantity} - ${itemTotal} EGP`;
      cartItems.appendChild(li);
    }
  });

  if (cartTotalElement) {
    cartTotalElement.textContent = cartTotal;
  }
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert(`Order placed successfully! Total: ${cartTotal} EGP\nThank you for your order!`);
  cart = [];
  saveCart();
  updateCart();
}


document.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const name = e.target.getAttribute('data-name');
    const price = e.target.getAttribute('data-price');
    addToCart(name, price);

    window.location.href = 'cart.html';
  }
});


const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', checkout);
}

window.addEventListener('load', function() {
  revealServiceCards();
  revealMenuCategories();
  revealMenuCards();
  updateCart();
});







