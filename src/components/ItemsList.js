// src/components/ItemsList.js
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';  // Assuming you use Redux

const ItemsList = () => {
  const items = useSelector(state => state.items); // Access items from Redux store

  const processedItems = useMemo(() => {
    return items.map(item => item.toUpperCase());
  }, [items]);

  return (
    <div>
      <h2>Processed Items from Redux Store:</h2>
      <div>{processedItems}</div>
    </div>
  );
};

export default ItemsList;
