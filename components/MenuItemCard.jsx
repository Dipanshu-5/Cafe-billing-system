import React from 'react';

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const MenuItemCard = ({ item, onAddItem }) => {
  return (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">₹{item.price.toFixed(2)}</p>
        <button
          onClick={() => onAddItem(item)}
          aria-label={`Add ${item.name} to order`}
          className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-colors flex items-center justify-center"
        >
          <PlusIcon />
          Add
        </button>
      </div>
  );
};

export default React.memo(MenuItemCard);
