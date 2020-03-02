import React from 'react';
import API from './API';

function App() {
  const state = useImageSearchState();

  const formSubmitted = event => {
    event.preventDefault();
    state.setLoading(true);
    API.search(state.searchTerm)
      .then(images => {
        state.setImages(images);
      }).then(() => {
        state.setLoading(false);
      });
  }

  return (
    <div>
      <h1>{state.title}</h1>
      <form onSubmit={evt => formSubmitted(evt)}>
        <label htmlFor='searchTerm'>Search Term</label>
        <input value={state.searchTerm} onChange={state.searchTermChanged} id='searchTerm' name='searchTerm' type='text' className='u-full-width' />
        <button type='submit'>Search</button>
      </form>
      {
        state.loading ? <img alt="Loading..." src="https://i.imgur.com/LVHmLnb.gif" /> : ''
      }

      <section className="images">
        {
          state.images.map(image => {
            return <img alt={image.description} key={image.id} src={image.image_url[0]} />
          })
        }
      </section>
    </div>
  );
}

export default App;

const useImageSearchState = () => {
  // eslint-disable-next-line 
  const [title, setTitle] = React.useState('React Image Search');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const searchTermChanged = (event) => setSearchTerm(event.target.value);
  return {
    title,
    searchTerm, searchTermChanged,
    loading, setLoading,
    images, setImages
  }
}