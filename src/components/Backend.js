import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categorySlice';

const Backend = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const backendCategory = categories.find((category) => category.id === 'backend');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      {backendCategory && (
        <div className="category-card">
          <div className='category-image'>
            <img src={backendCategory.image} alt={backendCategory.title} />
          </div>
          <div className='category-section'>
            <h2>{backendCategory.title}</h2>
            <p>{backendCategory.description}</p>
            <button>Subscribe</button>
          </div>       

        </div>
      )}
    </div>
  );
};

export default Backend;
