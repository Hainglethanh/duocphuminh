const loader = document.getElementById("loaderImageAnimate");
const galleryImageBlock = document.getElementById('galleryImages');
const sliderSingleBlock = document.getElementById('lightGallerySingle');
const sliderNavBlock = document.getElementById('lightGalleryNav');
const cardIncrease = 8;
const pageCount = Math.ceil(imagesApi.length / cardIncrease);
let currentPage = 1;

const createCard = (item, index) => {
    // return
    if (!item) return;

    const card = `<li class="the-media__gallery-image the-media__gallery-image--${index}" data-target="item-${index}">
                    <div class="the-media__gallery-image-wrap">
                        <img src="${item.url}" alt="">
                    </div>
                    <div class="the-media__gallery-image-caption">${item.title}</div>
                </li>`
    galleryImageBlock.insertAdjacentHTML('beforeend', card);
};

const createCardSlider = (item, index, type) => {
    // return
    if (!item) return;

    const titleCard = type == 'single' ? `<div class="lightgallery__image-caption"> ${item.title}</div>` : '';
    const anchor = type == 'nav' ? `data-anchor="item-${index}"` : '';

    const card = `<div class="lightgallery__item">
                    <div class="lightgallery__image" ${anchor}>
                        <img src="${item.url}" alt="">
                    </div>
                    ${titleCard}
                </div>`;

    if (type == 'single') {
        sliderSingleBlock.insertAdjacentHTML('beforeend', card);
    } else {
        sliderNavBlock.insertAdjacentHTML('beforeend', card);
    }
};

const addCards = (pageIndex) => {
    currentPage = pageIndex;

    const startRange = (pageIndex - 1) * cardIncrease;
    const endRange = currentPage == pageCount ? imagesApi.length : pageIndex * cardIncrease;

    for (let i = startRange + 1; i <= endRange; i++) {
        createCard(imagesApi[i - 1], i - 1);
        createCardSlider(imagesApi[i - 1], i - 1, 'single')
        createCardSlider(imagesApi[i - 1], i - 1, 'nav')
    }

};

const handleInfiniteScroll = () => {
    setTimeout(() => {

        const offsetTopBlock = (galleryImageBlock.offsetTop + galleryImageBlock.offsetHeight) - (window.innerHeight - 150)
        const currentX = document.documentElement.scrollTop || document.body.scrollTop;
        const endOfPage = offsetTopBlock <= currentX;

        // console.log('offsetTopBlock :' + offsetTopBlock, 'endOfPage: ' + endOfPage , 'currentX: ' + currentX, );
        if (endOfPage) {
            $('.lightgallery--single').slick('unslick');
            $('.lightgallery--nav').slick('unslick');

            addCards(currentPage + 1);

            $('.lightgallery--single').slick(getSliderGallerySingleSettings());
            $('.lightgallery--nav').slick(getSliderGalleryNavSettings());
        }

        if (currentPage > pageCount) {
            removeInfiniteScroll();
            return;
        }
    }, 500);
};

const removeInfiniteScroll = () => {
    loader.remove();
    window.removeEventListener("scroll", handleInfiniteScroll);
};

window.onload = function () {
    addCards(currentPage);
    $('.lightgallery--single').slick(getSliderGallerySingleSettings());
    $('.lightgallery--nav').slick(getSliderGalleryNavSettings());
    window.addEventListener("scroll", handleInfiniteScroll);
};



