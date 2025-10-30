import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { MENU_BY_CATEGORY, MENU_CATEGORIES } from './data';
import { TAX_RATE, INVOICE_ID_PREFIX } from './constants';
import Menu from './components/Menu';
import OrderSummary from './components/OrderSummary';
const ReceiptModal = lazy(() => import('./components/ReceiptModal'));
import Toast from './components/Toast';
import { useToast } from './hooks';
import { calculateTotals } from './utils';

const App = () => {
  const [order, setOrder] = useState([]);
  const [isReceiptVisible, setIsReceiptVisible] = useState(false);
  const [finalizedOrder, setFinalizedOrder] = useState([]);
  const [finalizedTotals, setFinalizedTotals] = useState({ subtotal: 0, tax: 0, total: 0 });
  const [invoiceId, setInvoiceId] = useState('');
  
  const { toasts, showToast } = useToast();

  const orderTotals = useMemo(() => calculateTotals(order, TAX_RATE), [order]);

  const handleAddItem = useCallback(item => {
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(orderItem => orderItem.id === item.id);
      if (existingItem) {
        return prevOrder.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      }
      return [...prevOrder, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to order.`, 'success');
  }, [showToast]);

  const handleUpdateQuantity = useCallback((itemId, newQuantity) => {
    const quantity = Number.isFinite(newQuantity) ? Math.max(0, Math.floor(newQuantity)) : 0;
    setOrder(prev =>
      quantity
        ? prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
        : prev.filter(item => item.id !== itemId)
    );
  }, []);

  const handleClearOrder = useCallback(() => {
    setOrder([]);
    showToast('Order cleared.', 'info');
  }, [showToast]);

  const handleFinalizeOrder = useCallback(() => {
    if (order.length === 0) return;
    setFinalizedOrder(order);
    setFinalizedTotals(orderTotals);
    setInvoiceId(`${INVOICE_ID_PREFIX}${Date.now()}`);
    setIsReceiptVisible(true);
  }, [order, orderTotals]);

  const handleNewOrder = useCallback(() => {
    setOrder([]);
    setIsReceiptVisible(false);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300 sticky top-0 z-10 print:hidden">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">POLO CAFE</h1>
          <div className="flex items-center gap-2 md:gap-4">
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8 print:hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Menu
              menuByCategory={MENU_BY_CATEGORY}
              categories={MENU_CATEGORIES}
              onAddItem={handleAddItem}
            />
          </div>
          <div>
            <OrderSummary
              order={order}
              totals={orderTotals}
              onUpdateQuantity={handleUpdateQuantity}
              onFinalizeOrder={handleFinalizeOrder}
              onClearOrder={handleClearOrder}
            />
          </div>
        </div>
      </main>
      {isReceiptVisible && (
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center">Loading...</div>}>
          <ReceiptModal
            order={finalizedOrder}
            totals={finalizedTotals}
            invoiceId={invoiceId}
            onClose={handleNewOrder}
            preferences={{ currencySymbol: '\u20b9' }}
          />
        </Suspense>
      )}
      <div className="fixed bottom-4 right-4 z-[100] space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </div>
  );
};

export default App;
