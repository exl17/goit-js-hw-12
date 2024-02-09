import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

let lightbox = new SimpleLightbox('.image-card a', { captionsData: "alt",}); 

const loadBtn = document.getElementById('loadBtn');
const imageContainer = document.getElementById('imageContainer');
let currentPage = 1;
let currentSearchQuery = '';

const API_KEY = '42176709-03057e91c34187fd30d01f158';

function showLoader() {
  const loader = document.createElement('div');
    loader.className = 'loader';
    imageContainer.appendChild(loader);
    
}

function hideLoader() {
  const loader = imageContainer.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}

async function performSearch(searchQuery) {
    showLoader();
    currentSearchQuery = searchQuery;
    currentPage = 1; // Reset page number for new search
    const imageType = 'photo';
    const orientation = 'horizontal';
    const safeSearch = true;

    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: imageType,
        orientation: orientation,
        safesearch: safeSearch,
        per_page: 15,
        page: currentPage // Specify the page parameter
    });
    const URL = `https://pixabay.com/api/?${params}`;

    try {
        const response = await axios.get(URL);
        const data = response.data;
        hideLoader();
        imageContainer.innerHTML = '';

        const fragment = document.createDocumentFragment();

        if (parseInt(data.totalHits) > 0) {
            data.hits.forEach(hit => {
                const cardContainer = document.createElement('li');
                cardContainer.className = 'image-card';

                const imgElement = document.createElement('img');
                imgElement.src = hit.webformatURL;
                imgElement.alt = hit.tags;

                const galleryLink = document.createElement('a');
                galleryLink.href = hit.largeImageURL;
                galleryLink.appendChild(imgElement);

                const detailsContainer = document.createElement('div');
                detailsContainer.className = 'image-details';

                const likesElement = document.createElement('p');
                likesElement.textContent = `Likes ${hit.likes}`;

                const viewsElement = document.createElement('p');
                viewsElement.textContent = `Views ${hit.views}`;

                const commentsElement = document.createElement('p');
                commentsElement.textContent = `Comments ${hit.comments}`;

                const downloadsElement = document.createElement('p');
                downloadsElement.textContent = `Downloads ${hit.downloads}`;

                detailsContainer.appendChild(likesElement);
                detailsContainer.appendChild(viewsElement);
                detailsContainer.appendChild(commentsElement);
                detailsContainer.appendChild(downloadsElement);

                cardContainer.appendChild(galleryLink);
                cardContainer.appendChild(detailsContainer);

                fragment.appendChild(cardContainer);
            });

            imageContainer.appendChild(fragment);
            lightbox.refresh();
            loadBtn.style.display = 'block'; // Show the load more button
        } else {
            iziToast.error({
                message: 'Please enter a valid search query.',
                position: 'topRight',
            });
        }
    } catch (error) {
        hideLoader();
        console.error('Error during fetch:', error.message);
    }
}

async function loadMoreImages() {
    currentPage++;
    const params = new URLSearchParams({
        key: API_KEY,
        q: currentSearchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: currentPage // Increment the page number for subsequent requests
    });
    const URL = `https://pixabay.com/api/?${params}`;

    try {
        const response = await axios.get(URL);
        const data = response.data;

        const fragment = document.createDocumentFragment();

        if (parseInt(data.totalHits) > 0) {
            data.hits.forEach(hit => {
                const cardContainer = document.createElement('li');
                cardContainer.className = 'image-card';

                const imgElement = document.createElement('img');
                imgElement.src = hit.webformatURL;
                imgElement.alt = hit.tags;

                const galleryLink = document.createElement('a');
                galleryLink.href = hit.largeImageURL;
                galleryLink.appendChild(imgElement);

                const detailsContainer = document.createElement('div');
                detailsContainer.className = 'image-details';

                const likesElement = document.createElement('p');
                likesElement.textContent = `Likes ${hit.likes}`;

                const viewsElement = document.createElement('p');
                viewsElement.textContent = `Views ${hit.views}`;

                const commentsElement = document.createElement('p');
                commentsElement.textContent = `Comments ${hit.comments}`;

                const downloadsElement = document.createElement('p');
                downloadsElement.textContent = `Downloads ${hit.downloads}`;

                detailsContainer.appendChild(likesElement);
                detailsContainer.appendChild(viewsElement);
                detailsContainer.appendChild(commentsElement);
                detailsContainer.appendChild(downloadsElement);

                cardContainer.appendChild(galleryLink);
                cardContainer.appendChild(detailsContainer);

                fragment.appendChild(cardContainer);
            });

            imageContainer.appendChild(fragment);
            lightbox.refresh();
        }
    } catch (error) {
        console.error('Error loading more images:', error.message);
    }
}

loadBtn.addEventListener('click', loadMoreImages);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const searchInputValue = document.getElementById('searchInput').value;
        if (searchInputValue.trim() !== '') {
            performSearch(searchInputValue);
            loadBtn.style.display = 'none'; // Hide the load more button when initiating a new search
        } else {
            iziToast.error({
                message: 'Please enter a valid search query.',
                position: 'topRight',
            });
        }

        event.target.reset();
    });
    loadBtn.style.display = 'none'; // Hide the load more button initially
});
