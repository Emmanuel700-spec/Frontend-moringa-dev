import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categorySlice';

const Devops= () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const devopsCategory = categories.find((category) => category.id ===  'devops');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
       {devopsCategory && (
        <div className="category-card">
          <div className='category-image'>
            <img src= {devopsCategory.image} alt= {devopsCategory.title} />
          </div>
          <div className='category-section'>
            <h2>{devopsCategory.title}</h2>
            <p>{devopsCategory.description}</p>
            <button>Subscribe</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devops;
