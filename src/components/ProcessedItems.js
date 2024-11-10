// src/components/ProcessedItems.js
import React, { useMemo } from 'react';

const ProcessedItems = ({ items }) => {
  const processedItems = useMemo(() => {
    return items.map(item => item.toUpperCase());
  }, [items]);

  return <div>{processedItems}</div>;
};

export default ProcessedItems;
