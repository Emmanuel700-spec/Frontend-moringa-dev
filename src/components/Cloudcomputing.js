import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categorySlice';

const Cloudcomputing = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const cloudcomputingCategory = categories.find((category) => category.id === 'cloudcomputing');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      {cloudcomputingCategory && (
        <div className="category-card">
          <div className='category-image'>
            <img src={cloudcomputingCategory.image} alt={cloudcomputingCategory.title} />
          </div>
          <div className='category-section'>
            <h2>{cloudcomputingCategory.title}</h2>
            <p>{cloudcomputingCategory.description}</p>
            <button>Subscribe</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cloudcomputing;
