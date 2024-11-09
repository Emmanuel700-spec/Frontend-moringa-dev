import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categorySlice';

const Frontend = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const frontendCategory = categories.find((category) => category.id === 'frontend');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      {frontendCategory && (
        <div className="category-card">
          <div className='category-image'>
            <img src={frontendCategory.image} alt={frontendCategory.title} />
          </div>
          <div className='category-section'>
            <h2>{frontendCategory.title}</h2>
            <p>{frontendCategory.description}</p>
            <button>Subscribe</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Frontend;
