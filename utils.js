export const formatCurrency = (value, symbol = '\u20b9') => {
  try {
    return `${symbol}${value.toFixed(2)}`;
  } catch (e) {
    return `${symbol}${Number(value).toFixed(2)}`;
  }
};

export const formatDate = date => {
  return date.toLocaleDateString();
};

export const formatTime = date => {
  return date.toLocaleTimeString();
};

export const exportOrderToCSV = (order, totals, invoiceId) => {
  const headers = ['Item', 'Quantity', 'Price', 'Total'];
  const rows = order.map(i => [i.name, String(i.quantity), String(i.price), String((i.price * i.quantity).toFixed(2))]);
  const totalsRows = [['', '', 'Subtotal', String(totals.subtotal.toFixed(2))], ['', '', 'Tax', String(totals.tax.toFixed(2))], ['', '', 'Total', String(totals.total.toFixed(2))]];

  const csvContent = [headers, ...rows, [], ['Invoice ID', invoiceId], ...totalsRows]
    .map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\r\n');

  return csvContent;
};
