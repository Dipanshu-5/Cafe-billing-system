import React from 'react';

const CafeLogo = () => (
    <div className="flex items-center space-x-2">
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-6.364-8.862A7.5 7.5 0 0012 21a7.5 7.5 0 006.364-7.362M12 3a2.655 2.655 0 011.879.78l.004.003.002.002.001.001A2.655 2.655 0 0112 3z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c-1.12 0-2.164.57-2.775 1.458A2.655 2.655 0 0012 3z"></path></svg>
        <span className="text-2xl font-semibold text-gray-800">The Cozy Cafe</span>
    </div>
);

const Invoice = ({ order, totals, invoiceId }) => {
  return (
    <div id="invoice" className="hidden print:block bg-white p-8 font-sans">
      <div className="container mx-auto">
        {/* Header */}
        <header className="flex justify-between items-start mb-8 pb-4 border-b">
          <div>
            <CafeLogo />
            <p className="text-gray-500 text-sm mt-2">123 Coffee Lane, Flavor Town</p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-800 uppercase tracking-wider">Invoice</h1>
            <p className="text-sm text-gray-600"><span className="font-semibold">Invoice #:</span> {invoiceId}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
          </div>
        </header>

        {/* Itemized List */}
        <main className="w-full overflow-x-auto mb-8">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="text-left py-3 px-4 text-gray-600 font-semibold uppercase text-sm">Item</th>
                        <th className="text-center py-3 px-4 text-gray-600 font-semibold uppercase text-sm">Quantity</th>
                        <th className="text-right py-3 px-4 text-gray-600 font-semibold uppercase text-sm">Unit Price</th>
                        <th className="text-right py-3 px-4 text-gray-600 font-semibold uppercase text-sm">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map(item => (
                        <tr key={item.id} className="border-b border-gray-200 odd:bg-gray-50">
                            <td className="py-3 px-4 text-gray-700">{item.name}</td>
                            <td className="text-center py-3 px-4 text-gray-700">{item.quantity}</td>
                            <td className="text-right py-3 px-4 text-gray-700">₹{item.price.toFixed(2)}</td>
                            <td className="text-right py-3 px-4 text-gray-800 font-medium">₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>


        {/* Totals Section */}
        <section className="flex justify-end">
          <div className="w-full max-w-sm">
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Tax ({(100 * (totals.tax / (totals.subtotal || 1))).toFixed(1)}%)</span>
                    <span>₹{totals.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-xl text-gray-800">
                    <span>Total Due</span>
                    <span>₹{totals.total.toFixed(2)}</span>
                </div>
                </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-12 pt-4 border-t">
          <p>*** THANK YOU ***</p>
        </footer>
      </div>
    </div>
  );
};

export default React.memo(Invoice);
