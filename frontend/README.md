# **Проект: Место**

## _Место_ - это одностраничный сайт, в котором реализована возможность:

### Редактирования профиля

### Добавления, удаления и просмотр постов

### Регистрация и авторизация пользователя

## В работе используются такие технологии, как:

### React, react-router-dom

### JS

### HTML

### CSS

### ООП

### Webpack

### Адаптивная верстка:

```css
@media screen and (min-width: 768px) {
  .cool {
    width: calc(100% + 32px);
  }
}
```

### Открытие окна редактирования:

```javascript
const togglePopup = function () {
  popup.classList.toggle("popup_opened");
};

openPopup.addEventListener("click", togglePopup);
closeIcon.addEventListener("click", togglePopup);
```

### Добавление новых карточек:

```javascript
function addCard(item) {
  const cardTemplate = document.querySelector(".template").content;
  const cardElement = cardTemplate
    .querySelector(".cards__card")
    .cloneNode(true);
  cardElement.querySelector(".cards__text").textContent = item.title;
  cardElement.querySelector("img").src = item.link;
  cardsTable.prepend(cardElement);
}
```

### Ссылка проекта на GitHub Pages:

https://morjello.github.io/mesto-react/
