import * as XLSX from 'xlsx';
import { Order } from '../types/order';

/**
 * Escapes leading formula trigger characters (=, +, -, @, \t, \r)
 * to protect against CSV / Excel Formula Injection (CSV Injection / CWE-1236).
 */
function sanitizeExcelCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  const str = String(value).trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

export const excelService = {
  exportOrdersToExcel(orders: Order[], fileNameSuffix: string = 'Fulfilment_Export'): void {
    if (!orders || orders.length === 0) {
      alert('No orders available to export for the selected filter.');
      return;
    }

    // Flatten order items: 1 row per order item, preserving Order ID for grouping
    const rows: Record<string, string | number>[] = [];

    orders.forEach((order) => {
      order.items.forEach((item, itemIdx) => {
        rows.push({
          'Order ID': sanitizeExcelCell(order.orderNumber),
          'Item Line #': itemIdx + 1,
          'Order Date (UTC/IST)': sanitizeExcelCell(new Date(order.createdAt).toLocaleString('en-IN')),
          'Fulfilment Status': sanitizeExcelCell(order.fulfilmentStatus),
          'Payment Status': sanitizeExcelCell(order.paymentStatus),
          'Payment Method': sanitizeExcelCell(order.paymentMethod),
          'Payment Ref': sanitizeExcelCell(order.paymentTransactionId || 'N/A'),
          'Tracking Number': sanitizeExcelCell(order.trackingNumber || 'Pending'),
          'Courier': sanitizeExcelCell(order.courierName || 'Pending'),
          
          // Customer & Shipping
          'Customer Full Name': sanitizeExcelCell(order.customer.fullName),
          'Customer Phone': sanitizeExcelCell(order.customer.phone),
          'Customer Email': sanitizeExcelCell(order.customer.email),
          'Address Line 1': sanitizeExcelCell(order.shippingAddress.addressLine1),
          'Address Line 2': sanitizeExcelCell(order.shippingAddress.addressLine2 || ''),
          'Landmark': sanitizeExcelCell(order.shippingAddress.landmark || ''),
          'City': sanitizeExcelCell(order.shippingAddress.city),
          'State': sanitizeExcelCell(order.shippingAddress.state),
          'PIN Code': sanitizeExcelCell(order.shippingAddress.pincode),
          'Delivery Notes': sanitizeExcelCell(order.shippingAddress.deliveryInstructions || ''),

          // Customisation details
          'Product SKU': sanitizeExcelCell(item.variantId),
          'Product Variant': sanitizeExcelCell(item.variantName),
          'Custom Rider Name': sanitizeExcelCell(item.customName),
          'Blood Group': sanitizeExcelCell(item.bloodGroup || 'N/A'),
          'Indian Flag Included': item.hasFlag ? 'YES' : 'NO',
          'Fabric Base': sanitizeExcelCell(item.customisationSnapshot.fabricBase || '1000D Tactical Cordura'),
          'Thread Color': sanitizeExcelCell(item.customisationSnapshot.threadColor || 'Classic White'),
          'Item Quantity': item.quantity,
          'Unit Price (INR)': item.unitPrice,
          'Item Total (INR)': item.totalPrice,

          // Order Financial Totals
          'Order Subtotal (INR)': order.subtotal,
          'Discount (INR)': order.discountAmount,
          'Shipping Fee (INR)': order.shippingFee,
          'Final Order Total (INR)': order.totalAmount,
          'Internal Production Notes': sanitizeExcelCell(order.internalNotes || '')
        });
      });
    });

    // Create Worksheet
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Set column widths for professional readability
    const colWidths = [
      { wch: 14 }, // Order ID
      { wch: 12 }, // Item Line
      { wch: 22 }, // Order Date
      { wch: 16 }, // Fulfilment Status
      { wch: 14 }, // Payment Status
      { wch: 14 }, // Payment Method
      { wch: 20 }, // Payment Ref
      { wch: 18 }, // Tracking Number
      { wch: 16 }, // Courier
      { wch: 22 }, // Full Name
      { wch: 16 }, // Phone
      { wch: 26 }, // Email
      { wch: 30 }, // Addr 1
      { wch: 24 }, // Addr 2
      { wch: 20 }, // Landmark
      { wch: 16 }, // City
      { wch: 16 }, // State
      { wch: 10 }, // PIN
      { wch: 24 }, // Notes
      { wch: 20 }, // SKU
      { wch: 24 }, // Variant
      { wch: 20 }, // Custom Name
      { wch: 14 }, // Blood Group
      { wch: 18 }, // Flag
      { wch: 22 }, // Fabric Base
      { wch: 16 }, // Thread Color
      { wch: 12 }, // Qty
      { wch: 14 }, // Unit Price
      { wch: 14 }, // Item Total
      { wch: 18 }, // Subtotal
      { wch: 14 }, // Discount
      { wch: 16 }, // Shipping
      { wch: 18 }, // Total
      { wch: 30 }  // Internal Notes
    ];
    worksheet['!cols'] = colWidths;

    // Create Workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Production_Orders');

    // Filename timestamp
    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `CallsignMoto_Orders_${fileNameSuffix}_${dateStr}.xlsx`;

    // Trigger download
    XLSX.writeFile(workbook, fileName);
  }
};
