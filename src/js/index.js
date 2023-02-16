const btnBurger = document.querySelector(".header__burger-menu");
const spanLineBurger = document.querySelectorAll(".burger-menu__item");

const menu = document.querySelector(".header__list");
const headerNav = document.querySelector(".header__nav");

btnBurger.addEventListener("click", showBurgerMenu);
menu.addEventListener("click", clickOnlink);
headerNav.addEventListener("click", tabletAndDescMenu);

function showBurgerMenu(e) {
  spanLineBurger.forEach((item) => item.classList.toggle("active"));
  menu.classList.toggle("show");
}

function clickOnlink(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  spanLineBurger.forEach((item) => item.classList.remove("active"));
  menu.classList.remove("show");

  isActive();
  e.target.classList.add("header__item-link--active");
}

function isActive() {
  const activeClass = menu.querySelector(".header__item-link--active");
  if (activeClass) {
    activeClass.classList.remove("header__item-link--active");
  }
}

function tabletAndDescMenu(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }

  isActiveNavTablet();
  e.target.classList.add("header__nav-item-link--active");
}

function isActiveNavTablet() {
  const isActiveTabletLink = headerNav.querySelector(
    ".header__nav-item-link--active"
  );
  if (isActiveTabletLink) {
    isActiveTabletLink.classList.remove("header__nav-item-link--active");
  }
}
