import React from 'react';

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

const OrderSummary = ({ order, totals, onUpdateQuantity, onFinalizeOrder, onClearOrder }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-20">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-4 mb-4">Current Order</h2>
      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
        {order.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">Your order is empty.</p>
        ) : (
          order.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                 <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors" aria-label={`Decrease quantity of ${item.name}`}><MinusIcon /></button>
                <span className="w-8 text-center font-medium dark:text-gray-100">{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors" aria-label={`Increase quantity of ${item.name}`}><PlusIcon /></button>
                <span className="text-lg font-bold w-16 text-right dark:text-gray-200">₹{(item.price * item.quantity).toFixed(2)}</span>
                 <button onClick={() => onUpdateQuantity(item.id, 0)} className="text-red-500 hover:text-red-700 p-1" aria-label={`Remove ${item.name} from order`}><TrashIcon /></button>
              </div>
            </div>
          ))
        )}
      </div>
      {order.length > 0 && (
        <>
          <div className="mt-6 pt-4 border-t dark:border-gray-700">
            <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
              <span>Subtotal</span>
              <span>₹{totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
              <span>Tax</span>
              <span>₹{totals.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-gray-800 dark:text-gray-100 mt-2">
              <span>Total</span>
              <span>₹{totals.total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <button
              onClick={onFinalizeOrder}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Finalize Bill
            </button>
            <button
              onClick={onClearOrder}
              className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Clear Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(OrderSummary);
