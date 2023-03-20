import { galleryItems } from './gallery-items.js';
// Change code below this line

const containerGallery = document.querySelector('.gallery');

let modal; // зміна modal в глоб. контексті

// 1.Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
const createGalleryMarkup = galleryItems => {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
            />
        </a>
        </div>
        `;
        })
        .join('');
};

containerGallery.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

// Реалізація делегування на div.gallery і отримання url великого зображення.

containerGallery.addEventListener('click', evt => {
    evt.preventDefault();

    if (evt.target.nodeName !== 'IMG') {
        return;
    }

    const originalImageUrl = evt.target.dataset.source;

    // Відкриваємо модалку
    modal = basicLightbox.create(`
        <div>
            <img src="${originalImageUrl}"/>
        </div>
    `);
   
    modal.show();
    document.addEventListener('keydown', escapeListener);

    // Закриваємо модалку - зображення
    modal.element().addEventListener('click', evt => {
        if (evt.target.nodeName === 'IMG') {
            modal.close();
        }
    });
});

//  Escape
function escapeListener(evt) {
    if (evt.code === 'Escape' && modal) {
        modal.close();
        document.removeEventListener('keydown', escapeListener);
    }
}

// за межами модалки
if (modal) {
    modal.on('close', () => {
        document.removeEventListener('keydown', escapeListener);
    });
}





// ! Завдання 1 - галерея зображень
// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у
// модальному вікні.
// Розбий його на декілька підзавдань:
// ? 1.Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// ? 2.Реалізація делегування на div.gallery і отримання url великого зображення.
// ? 3.Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// ? 4.Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// ? 5.Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
// Розмітка елемента галереї
// Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.
// <div class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </div>
// Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням
// користувач буде перенаправлений на іншу сторінку.Заборони цю поведінку за замовчуванням.
// Закриття з клавіатури
// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.
// Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування
// клавіатури було тільки доти, доки відкрите модальне вікно.Бібліотека basicLightbox містить метод
// для програмного закриття модального вікна.