import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo } from '../redux/todoSlicer';


const Foryou = () => {
  const dispatch = useDispatch();

  // Selecting specific parts of the state
  const { data, isLoading, error } = useSelector(state => state.todo); // Destructure data, isLoading, error

  useEffect(() => {
    dispatch(fetchTodo()); // Fetch data on component mounting
  }, [dispatch]);

  console.log(data); // You can keep this for debugging

  return (
    <div className="foryou-container">
      {isLoading ? (
        <h1>Loading ....</h1>
      ) : error ? (
        <h1>Error loading data</h1> // Handle error
      ) : (
        data && Array.isArray(data) && data.length > 0 ? (
          data.map((d) => (
            <div key={d.id} className='foryou-card'>
              <img src={d.image} alt={d.title} />
              <h2>{d.title}</h2>
              {/* <p>{d.description}</p> */}
              <button>Subscribe</button>
            </div>
          ))
        ) : (
          <h1>No data available</h1> // Handle case where there's no data
        )
      )}
    </div>
  );
};

export default Foryou;
