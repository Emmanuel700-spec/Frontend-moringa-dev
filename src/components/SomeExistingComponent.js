// src/components/SomeExistingComponent.js
import React, { useMemo } from 'react';

const SomeExistingComponent = () => {
  const items = ['apple', 'banana', 'cherry'];

  const processedItems = useMemo(() => {
    return items.map(item => item.toUpperCase());
  }, [items]);

  return (
    <div>
      <h2>Processed Items:</h2>
      <div>{processedItems}</div>
    </div>
  );
};

export default SomeExistingComponent;
