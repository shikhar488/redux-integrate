// PostsList.js
import{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumsLoading, fetchAlbumsSuccess, fetchAlbumsFailed } from './redux/albumsSlice';

const AlbumsList = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.items);
  const status = useSelector((state) => state.albums.status);
  const error = useSelector((state) => state.albums.error);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchAlbumsLoading());
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        dispatch(fetchAlbumsSuccess(data));
      } catch (err) {
        dispatch(fetchAlbumsFailed(err.message));
      }
    };

    if (status === 'idle') {
      fetchData();
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <ul>
      {albums.slice(0, 10).map((album) => (
        <li key={album.id}>
          <h3>{album.title}</h3>
        </li>
      ))}
    </ul>
  );
};

export default AlbumsList;
