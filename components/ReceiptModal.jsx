import React from 'react';
import { X, Printer, Download, Share2 } from 'lucide-react';
import { APP_NAME, DEFAULT_CURRENCY } from '../constants';
import { formatCurrency, formatDate, formatTime, exportOrderToCSV } from '../utils';

const ReceiptModal = ({
  order,
  totals,
  invoiceId,
  onClose,
  preferences,
}) => {
  const currentDate = new Date();

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent = exportOrderToCSV(order, totals, invoiceId);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceId}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
  const currency = preferences?.currencySymbol ?? DEFAULT_CURRENCY;
  const text = `Invoice ${invoiceId} - ${formatCurrency(totals.total, currency)} - ${APP_NAME}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${invoiceId}`,
          text: text,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled or failed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert('Invoice details copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 print:bg-white print:inset-0 print:block print:opacity-100 print:p-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:rounded-none print:w-full print:max-w-none">
        <div className="p-6 print:p-8 print:bg-white">
          {/* Header - Hidden when printing */}
          <div className="flex justify-between items-start mb-6 print:hidden">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Invoice</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              data-close-modal
            >
              <X size={24} />
            </button>
          </div>

          {/* Printable Invoice Section */}
          <div id="invoice" className="print:block bg-white text-black">
            {/* Invoice Header */}
            <div className="mb-6 text-center print:text-left print:flex print:justify-between print:items-start print:bg-white">
              <div className="print:bg-white">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 print:text-black print:text-2xl">
                  {APP_NAME}
                </h1>
              </div>
              <div className="text-right print:text-left print:bg-white mt-4 print:mt-0">
                <p className="text-2xl font-bold text-blue-600 print:text-black print:text-xl">INVOICE</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1 print:text-gray-700">{invoiceId}</p>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-6 mb-6 print:grid-cols-2 print:gap-4 print:bg-white">
              <div className="print:bg-white">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 print:text-black">Bill To:</h3>
                <p className="text-gray-600 dark:text-gray-400 print:text-gray-700">Customer</p>
                <p className="text-gray-600 dark:text-gray-400 print:text-gray-700">Walk-in Customer</p>
              </div>
              <div className="text-right print:text-left print:bg-white">
                <div className="space-y-1 text-sm print:bg-white">
                  <div className="flex justify-between print:block print:bg-white">
                    <span className="text-gray-600 dark:text-gray-400 print:text-gray-700">Date:</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium print:text-black">
                      {formatDate(currentDate)}
                    </span>
                  </div>
                  <div className="flex justify-between print:block print:bg-white">
                    <span className="text-gray-600 dark:text-gray-400 print:text-gray-700">Time:</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium print:text-black">
                      {formatTime(currentDate)}
                    </span>
                  </div>
                  <div className="flex justify-between print:block print:bg-white">
                    <span className="text-gray-600 dark:text-gray-400 print:text-gray-700">Order #:</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium print:text-black">
                      {order.length} items
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6 print:bg-white">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden print:border-black print:bg-white">
                <table className="w-full print:bg-white">
                  <thead className="bg-gray-50 dark:bg-gray-700 print:bg-gray-200">
                    <tr className="print:bg-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 print:text-black print:font-bold print:border-b print:border-black">
                        Item
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-100 print:text-black print:font-bold print:border-b print:border-black">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100 print:text-black print:font-bold print:border-b print:border-black">
                        Price
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100 print:text-black print:font-bold print:border-b print:border-black">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600 print:divide-black">
                    {order.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 print:bg-white print:hover:bg-white">
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 print:text-black print:border-b print:border-gray-300">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400 print:text-black print:border-b print:border-gray-300">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400 print:text-black print:border-b print:border-gray-300">
                          {formatCurrency(item.price, preferences?.currencySymbol ?? DEFAULT_CURRENCY)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100 font-medium print:text-black print:font-bold print:border-b print:border-gray-300">
                          {formatCurrency(item.price * item.quantity, preferences?.currencySymbol ?? DEFAULT_CURRENCY)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 print:border-t-2 print:border-black print:bg-white">
              <div className="space-y-2 max-w-xs ml-auto print:bg-white">
                <div className="flex justify-between text-sm print:bg-white">
                  <span className="text-gray-600 dark:text-gray-400 print:text-gray-700">Subtotal:</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium print:text-black print:font-bold">
                    {formatCurrency(totals.subtotal, preferences?.currencySymbol ?? DEFAULT_CURRENCY)}
                  </span>
                </div>
                <div className="flex justify-between text-sm print:bg-white">
                  <span className="text-gray-600 dark:text-gray-400 print:text-gray-700">Tax (8.5%):</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium print:text-black print:font-bold">
                    {formatCurrency(totals.tax, preferences?.currencySymbol ?? DEFAULT_CURRENCY)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2 print:border-t-2 print:border-black print:bg-white">
                  <span className="text-gray-900 dark:text-gray-100 print:text-black">Total:</span>
                  <span className="text-gray-900 dark:text-gray-100 print:text-black">
                    {formatCurrency(totals.total, preferences?.currencySymbol ?? DEFAULT_CURRENCY)}
                  </span>
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="mt-8 text-center print:mt-12 print:bg-white">
              <p className="text-gray-600 dark:text-gray-400 print:text-gray-700">
                *** THANK YOU ***
              </p>
            </div>
          </div>

          {/* Action Buttons - Hidden when printing */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              data-print-invoice
            >
              <Printer className="w-4 h-4" />
              Print Invoice
            </button>
            
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
            >
              New Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReceiptModal);
