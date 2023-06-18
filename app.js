const giphyAPIKey = '0uEvD8S8CcBEahOcRcUJrZkHzHIYvesH';
const gifForm = document.getElementById('gif-form');
const gifContainer = document.getElementById('gif-container');
const removeAllBtn = document.getElementById('remove-all-btn');

    const getGif = async (searchTerm) => {
      try {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${searchTerm}&limit=1`
        );

        const data = response.data;
        if (data.data.length > 0) {
          return data.data[0].images.original.url; // return the URL of the first gif
        } else {
          return null; // no gifs found
        }
      } catch (error) {
        console.error('Error while fetching GIF: ', error);
        return null;
      }
    };

    const addGifToContainer = (gifUrl) => {
      const gifDiv = document.createElement('div');
      const gifImg = document.createElement('img');
      gifImg.src = gifUrl;
      gifDiv.appendChild(gifImg);
      gifContainer.appendChild(gifDiv);
    }

    const removeAllGifs = () => {
      while (gifContainer.firstChild) {
        gifContainer.removeChild(gifContainer.firstChild);
      }
    }

    gifForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const searchInput = document.getElementById('search-input');
      const searchTerm = searchInput.value;

      const gifUrl = await getGif(searchTerm);
      if (gifUrl) {
        addGifToContainer(gifUrl);
      } else {
        alert('No gifs found for your search term.');
      }

      searchInput.value = '';
    });

    removeAllBtn.addEventListener('click', () => {
      removeAllGifs();
    });