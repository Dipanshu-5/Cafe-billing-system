import React, { useState, useMemo } from 'react';
import MenuItemCard from './MenuItemCard';

const Menu = ({ menuByCategory, onAddItem }) => {
  const [selected, setSelected] = useState('All');
  const categories = useMemo(() => Object.keys(menuByCategory), [menuByCategory]);

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p className="text-lg text-gray-500 dark:text-gray-400">No menu items available at this time.</p>
      </div>
    );
  }

  const flattened = useMemo(() => {
    return categories.flatMap(cat => menuByCategory[cat] || []);
  }, [categories, menuByCategory]);

  const visibleItems = selected === 'All' ? flattened : menuByCategory[selected] || [];

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-4">
        <button
          onClick={() => setSelected('All')}
          className={`px-3 py-1 rounded-md font-semibold ${selected === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-3 py-1 rounded-md font-semibold ${selected === cat ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleItems.map(item => (
          <MenuItemCard key={item.id} item={item} onAddItem={onAddItem} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Menu);
