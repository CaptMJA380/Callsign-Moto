import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { storageService } from '../../services/storageService';
import { excelService } from '../../services/excelService';
import { Order, OrderStatus } from '../../types/order';
import { ProductVariant } from '../../types/product';
import { LivePatchPreview } from '../customizer/LivePatchPreview';
import {
  Shield,
  LayoutDashboard,
  ShoppingBag,
  Sliders,
  BarChart3,
  Users,
  FileSpreadsheet,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  XCircle,
  Eye,
  Edit2,
  Save,
  ArrowUpRight,
  TrendingUp,
  Sun,
  Moon,
  ArrowLeft
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'analytics' | 'customers' | 'export'>('overview');

  const [orders, setOrders] = useState<Order[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editStatus, setEditStatus] = useState<OrderStatus>('PENDING');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [courierNameInput, setCourierNameInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [statusUpdateMessage, setStatusUpdateMessage] = useState<string | null>(null);

  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [salesTimeframe, setSalesTimeframe] = useState<'day' | 'week' | 'month'>('month');

  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [productSavedFeedback, setProductSavedFeedback] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setOrders(storageService.getOrders());
    setVariants(storageService.getVariants());
  };

  const handleOpenOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditStatus(order.fulfilmentStatus);
    setTrackingNumberInput(order.trackingNumber || '');
    setCourierNameInput(order.courierName || '');
    setNotesInput(order.internalNotes || '');
    setStatusUpdateMessage(null);
  };

  const handleSaveOrderStatus = () => {
    if (!selectedOrder) return;

    const updated = storageService.updateOrderStatus(
      selectedOrder.id,
      editStatus,
      trackingNumberInput.trim() || undefined,
      notesInput.trim() || undefined,
      user?.username || 'Admin'
    );

    if (updated) {
      setSelectedOrder(updated);
      refreshData();
      setStatusUpdateMessage('Order details updated.');
      setTimeout(() => setStatusUpdateMessage(null), 3000);
    }
  };

  const handleSaveProductPrice = (variantId: string) => {
    const updated = variants.map(v => (v.id === variantId ? { ...v, basePrice: Number(editPrice) } : v));
    storageService.saveVariants(updated);
    setVariants(updated);
    setEditingVariantId(null);
    setProductSavedFeedback(true);
    setTimeout(() => setProductSavedFeedback(false), 2500);
  };

  // Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus !== 'FAILED' ? o.totalAmount : 0), 0);
  const totalOrdersCount = orders.length;
  const totalUnitsSold = orders.reduce((sum, o) => sum + o.items.reduce((iSum, item) => iSum + item.quantity, 0), 0);
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  const pendingCount = orders.filter(o => o.fulfilmentStatus === 'PENDING').length;
  const inProductionCount = orders.filter(o => o.fulfilmentStatus === 'IN_PRODUCTION').length;
  const dispatchedCount = orders.filter(o => o.fulfilmentStatus === 'DISPATCHED').length;
  const deliveredCount = orders.filter(o => o.fulfilmentStatus === 'DELIVERED').length;
  const cancelledCount = orders.filter(o => o.fulfilmentStatus === 'CANCELLED').length;

  const variantQuantities: Record<string, number> = {};
  orders.forEach(o => {
    o.items.forEach(i => {
      variantQuantities[i.variantId] = (variantQuantities[i.variantId] || 0) + i.quantity;
    });
  });
  let bestSellingVariant = 'TRICOLOUR_EDITION';
  let bestCount = -1;
  Object.entries(variantQuantities).forEach(([k, v]) => {
    if (v > bestCount) {
      bestCount = v;
      bestSellingVariant = k;
    }
  });

  const filteredOrders = orders.filter(o => {
    const query = orderSearch.toLowerCase();
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(query) ||
      o.customer.fullName.toLowerCase().includes(query) ||
      o.customer.phone.includes(query) ||
      o.customer.email.toLowerCase().includes(query) ||
      o.items.some(i => i.customName.toLowerCase().includes(query));

    const matchesStatus = statusFilter === 'ALL' || o.fulfilmentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] overflow-y-auto font-sans transition-colors duration-300">
      
      {/* Top Header */}
      <div className="glass-nav sticky top-0 z-30 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors"
            title="Return to Storefront"
          >
            <ArrowLeft className="w-4 h-4 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-black/[0.06] dark:bg-white/[0.08] flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#FF7700]" />
            </div>
            <div>
              <span className="font-sans font-semibold text-sm text-[#1D1D1F] dark:text-white block leading-tight">
                Admin Console
              </span>
              <span className="text-[11px] font-mono text-[#86868B]">
                {user?.username} ({user?.role})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme switch in Admin */}
          <button
            onClick={toggleTheme}
            className="p-1.5 px-3 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] text-xs font-sans text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-1.5"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
          >
            Storefront
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-black/[0.06] dark:border-white/[0.06] px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
            activeTab === 'overview'
              ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
              : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
            activeTab === 'orders'
              ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
              : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
            activeTab === 'products'
              ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
              : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Products</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
            activeTab === 'analytics'
              ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
              : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
            activeTab === 'customers'
              ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
              : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Customers</span>
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
            activeTab === 'export'
              ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
              : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Excel Export</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto p-6 sm:p-8">
        
        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1 */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none transition-colors">
                <div className="flex items-center justify-between text-xs text-[#86868B] mb-2 font-medium">
                  <span>Gross Sales</span>
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div className="text-3xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-1">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-[#86868B]">
                  18% GST included
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none transition-colors">
                <div className="flex items-center justify-between text-xs text-[#86868B] mb-2 font-medium">
                  <span>Total Orders</span>
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Package className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="text-3xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-1">
                  {totalOrdersCount}
                </div>
                <div className="text-[11px] text-[#86868B]">
                  {totalUnitsSold} tabs manufactured
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none transition-colors">
                <div className="flex items-center justify-between text-xs text-[#86868B] mb-2 font-medium">
                  <span>Average Order Value</span>
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="text-3xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-1">
                  ₹{avgOrderValue}
                </div>
                <div className="text-[11px] text-[#86868B]">
                  Per rider checkout
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none transition-colors">
                <div className="flex items-center justify-between text-xs text-[#86868B] mb-2 font-medium">
                  <span>Top Edition</span>
                  <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7700]" />
                  </div>
                </div>
                <div className="text-lg font-sans font-bold text-[#1D1D1F] dark:text-white truncate mb-1">
                  {bestSellingVariant === 'TRICOLOUR_EDITION'
                    ? 'Tricolour Edition'
                    : bestSellingVariant === 'NAME_BLOOD'
                    ? 'Name + Blood'
                    : 'Name Tab'}
                </div>
                <div className="text-[11px] text-[#86868B]">
                  Highest conversion
                </div>
              </div>

            </div>

            {/* Pipeline Status Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none transition-colors">
              <h2 className="text-xs font-sans uppercase tracking-wider text-[#86868B] mb-4 font-semibold">
                Fulfilment Status Pipeline
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                
                <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Pending</span>
                  </div>
                  <div className="text-2xl font-sans font-bold text-[#1D1D1F] dark:text-white">{pendingCount}</div>
                  <div className="text-[10px] text-[#86868B]">Queued for digitization</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Production</span>
                  </div>
                  <div className="text-2xl font-sans font-bold text-[#1D1D1F] dark:text-white">{inProductionCount}</div>
                  <div className="text-[10px] text-[#86868B]">On embroidery machine</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Dispatched</span>
                  </div>
                  <div className="text-2xl font-sans font-bold text-[#1D1D1F] dark:text-white">{dispatchedCount}</div>
                  <div className="text-[10px] text-[#86868B]">With express courier</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Delivered</span>
                  </div>
                  <div className="text-2xl font-sans font-bold text-[#1D1D1F] dark:text-white">{deliveredCount}</div>
                  <div className="text-[10px] text-[#86868B]">Order complete</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium mb-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancelled</span>
                  </div>
                  <div className="text-2xl font-sans font-bold text-[#1D1D1F] dark:text-white">{cancelledCount}</div>
                  <div className="text-[10px] text-[#86868B]">Refunded</div>
                </div>

              </div>
            </div>

            {/* Sales Trends Bar Chart */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-sans font-bold text-[#1D1D1F] dark:text-white">
                    Sales Trends
                  </h2>
                  <p className="text-xs text-[#86868B]">
                    Daily and weekly revenue flow
                  </p>
                </div>

                <div className="flex rounded-full bg-black/[0.05] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] p-1 text-xs">
                  <button
                    onClick={() => setSalesTimeframe('day')}
                    className={`px-3 py-1 rounded-full ${salesTimeframe === 'day' ? 'bg-black text-white dark:bg-white dark:text-black font-semibold' : 'text-[#86868B]'}`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setSalesTimeframe('week')}
                    className={`px-3 py-1 rounded-full ${salesTimeframe === 'week' ? 'bg-black text-white dark:bg-white dark:text-black font-semibold' : 'text-[#86868B]'}`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setSalesTimeframe('month')}
                    className={`px-3 py-1 rounded-full ${salesTimeframe === 'month' ? 'bg-black text-white dark:bg-white dark:text-black font-semibold' : 'text-[#86868B]'}`}
                  >
                    Month
                  </button>
                </div>
              </div>

              {/* High-Contrast Interactive Bar Chart */}
              <div className="h-44 w-full flex items-end gap-3 pt-6 border-b border-black/[0.08] dark:border-white/[0.06] pb-2">
                {[
                  { label: 'Mon', rev: 998 },
                  { label: 'Tue', rev: 1497 },
                  { label: 'Wed', rev: 498 },
                  { label: 'Thu', rev: 1847 },
                  { label: 'Fri', rev: 2490 },
                  { label: 'Sat', rev: 3450 },
                  { label: 'Sun', rev: 2890 }
                ].map((bar, idx) => {
                  const heightPercent = Math.min(100, Math.max(15, (bar.rev / 3500) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="text-[10px] font-mono text-[#86868B] opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{bar.rev}
                      </div>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full rounded-t-lg bg-[#1D1D1F] dark:bg-white hover:bg-[#FF7700] dark:hover:bg-[#FF7700] transition-colors"
                      />
                      <span className="text-[11px] font-sans text-[#86868B]">{bar.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Orders Snapshot */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-sans font-bold text-[#1D1D1F] dark:text-white">
                  Recent Orders
                </h2>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/[0.06] dark:border-white/[0.06] text-[#86868B]">
                      <th className="py-2.5">Order</th>
                      <th className="py-2.5">Customer</th>
                      <th className="py-2.5">Callsign</th>
                      <th className="py-2.5">Total</th>
                      <th className="py-2.5">Status</th>
                      <th className="py-2.5 text-right">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                    {orders.slice(0, 4).map(o => (
                      <tr key={o.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                        <td className="py-3 font-semibold text-[#1D1D1F] dark:text-white">{o.orderNumber}</td>
                        <td className="py-3 text-[#1D1D1F] dark:text-white">{o.customer.fullName}</td>
                        <td className="py-3 font-bold text-[#FF7700]">
                          {o.items[0]?.customName}
                        </td>
                        <td className="py-3 font-semibold text-[#1D1D1F] dark:text-white">₹{o.totalAmount}</td>
                        <td className="py-3">{renderStatusPill(o.fulfilmentStatus)}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleOpenOrder(o)}
                            className="p-1 rounded text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: ORDERS MANAGEMENT ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] p-4 rounded-2xl shadow-sm dark:shadow-none">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  placeholder="Search by ID, name, mobile, callsign..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-[#86868B]" />
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PRODUCTION">In Production</option>
                  <option value="DISPATCHED">Dispatched</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-sm dark:shadow-none">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-black/[0.06] dark:border-white/[0.06] text-[#86868B]">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Callsign</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-[#86868B]">
                          No matching orders.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(o => (
                        <tr key={o.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 font-semibold text-[#1D1D1F] dark:text-white">{o.orderNumber}</td>
                          <td className="p-4 text-[#86868B]">
                            {new Date(o.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-[#1D1D1F] dark:text-white">{o.customer.fullName}</div>
                            <div className="text-[10px] text-[#86868B]">{o.customer.phone}</div>
                          </td>
                          <td className="p-4">
                            {o.items.map((i, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-[#1D1D1F] dark:text-[#F5F5F7]">
                                <span className="font-bold text-[#FF7700]">{i.customName}</span>
                                {i.bloodGroup && <span className="text-rose-500 font-bold">({i.bloodGroup})</span>}
                              </div>
                            ))}
                          </td>
                          <td className="p-4 font-semibold text-[#1D1D1F] dark:text-white">₹{o.totalAmount}</td>
                          <td className="p-4">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                              {o.paymentStatus}
                            </span>
                          </td>
                          <td className="p-4">{renderStatusPill(o.fulfilmentStatus)}</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleOpenOrder(o)}
                              className="px-3 py-1 rounded-full bg-black/[0.06] dark:bg-white/[0.06] hover:bg-black/[0.1] dark:hover:bg-white/[0.1] text-[#1D1D1F] dark:text-white text-[11px] font-medium"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: PRODUCTS ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                  Product Catalogue &amp; Pricing
                </h2>
                <p className="text-xs text-[#86868B]">
                  Update live selling prices and specifications.
                </p>
              </div>

              {productSavedFeedback && (
                <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-sans flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Prices Saved</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {variants.map(v => (
                <div key={v.id} className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#86868B] block mb-1">{v.sku}</span>
                    <h3 className="text-xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-4">{v.name}</h3>

                    <div className="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] mb-4">
                      <div className="text-[11px] text-[#86868B] mb-1 font-sans font-medium">Selling Price (INR):</div>
                      {editingVariantId === v.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={editPrice}
                            onChange={e => setEditPrice(Number(e.target.value))}
                            className="w-24 px-2.5 py-1 rounded-xl bg-white dark:bg-black border border-black/30 dark:border-white/40 text-[#1D1D1F] dark:text-white font-mono font-bold text-sm"
                          />
                          <button
                            onClick={() => handleSaveProductPrice(v.id)}
                            className="p-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-sans font-bold text-[#1D1D1F] dark:text-white">₹{v.basePrice}</span>
                          <button
                            onClick={() => {
                              setEditingVariantId(v.id);
                              setEditPrice(v.basePrice);
                            }}
                            className="text-xs text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white flex items-center gap-1 font-medium"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 text-[11px] text-[#86868B]">
                      <div>Max Name: <strong className="text-[#1D1D1F] dark:text-white">{v.maxNameLength} chars</strong></div>
                      <div>Blood Group: <strong className="text-[#1D1D1F] dark:text-white">{v.requiresBloodGroup ? 'Yes' : 'No'}</strong></div>
                      <div>Indian Flag: <strong className="text-[#1D1D1F] dark:text-white">{v.includesFlag ? 'Yes' : 'No'}</strong></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: ANALYTICS ================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight">
              Business Intelligence
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none">
                <h3 className="text-xs font-sans uppercase tracking-wider text-[#86868B] mb-4 font-semibold">
                  Variant Volume Distribution
                </h3>
                <div className="space-y-3">
                  {variants.map(v => {
                    const count = variantQuantities[v.id] || 0;
                    const pct = totalUnitsSold > 0 ? Math.round((count / totalUnitsSold) * 100) : 0;
                    return (
                      <div key={v.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#1D1D1F] dark:text-white font-medium">{v.name}</span>
                          <span className="text-[#86868B]">{count} units ({pct}%)</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden">
                          <div
                            style={{ width: `${pct}%` }}
                            className="h-full bg-black dark:bg-white rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none">
                <h3 className="text-xs font-sans uppercase tracking-wider text-[#86868B] mb-4 font-semibold">
                  Status Breakdown
                </h3>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03]">
                    <span className="text-amber-600 dark:text-amber-400 font-medium">Pending:</span>
                    <strong className="text-[#1D1D1F] dark:text-white">{pendingCount}</strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03]">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Production:</span>
                    <strong className="text-[#1D1D1F] dark:text-white">{inProductionCount}</strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03]">
                    <span className="text-purple-600 dark:text-purple-400 font-medium">Dispatched:</span>
                    <strong className="text-[#1D1D1F] dark:text-white">{dispatchedCount}</strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03]">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Delivered:</span>
                    <strong className="text-[#1D1D1F] dark:text-white">{deliveredCount}</strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03]">
                    <span className="text-rose-600 dark:text-rose-400 font-medium">Cancelled:</span>
                    <strong className="text-[#1D1D1F] dark:text-white">{cancelledCount}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: CUSTOMERS ================= */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h2 className="text-xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight">
              Customer Directory
            </h2>

            <div className="bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-sm dark:shadow-none">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-black/[0.06] dark:border-white/[0.06] text-[#86868B]">
                    <tr>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Orders</th>
                      <th className="p-4">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                        <td className="p-4 font-semibold text-[#1D1D1F] dark:text-white">{o.customer.fullName}</td>
                        <td className="p-4 text-[#86868B]">{o.customer.phone}</td>
                        <td className="p-4 text-[#86868B]">{o.customer.email}</td>
                        <td className="p-4 text-[#1D1D1F] dark:text-white">{o.shippingAddress.city}, {o.shippingAddress.state}</td>
                        <td className="p-4 text-[#86868B]">{o.items.length} items</td>
                        <td className="p-4 font-semibold text-[#1D1D1F] dark:text-white">₹{o.totalAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: EXCEL EXPORT ================= */}
        {activeTab === 'export' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                Export Orders to Excel (.xlsx)
              </h2>
              <p className="text-xs text-[#86868B] mt-1">
                Generates a clean spreadsheet with formula-injection escaping.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-none space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => excelService.exportOrdersToExcel(orders, 'All_Orders')}
                  className="p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export All Orders ({orders.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    excelService.exportOrdersToExcel(
                      orders.filter(o => o.fulfilmentStatus === 'PENDING' || o.fulfilmentStatus === 'IN_PRODUCTION'),
                      'Pending_Production_Batch'
                    )
                  }
                  className="p-4 rounded-2xl bg-black/[0.06] dark:bg-white/[0.06] hover:bg-black/[0.1] dark:hover:bg-white/[0.1] text-[#1D1D1F] dark:text-white font-semibold text-xs uppercase tracking-wider border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  <span>Export Active Batch</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ORDER INSPECTION MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xl" onClick={() => setSelectedOrder(null)} />

          <div className="relative bg-white dark:bg-[#121215] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto transition-colors">
            
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] dark:border-white/[0.08] mb-6">
              <div>
                <span className="text-[11px] font-sans text-[#86868B] uppercase">Order Details</span>
                <h3 className="text-2xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                  #{selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full text-[#86868B] hover:text-black dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
              >
                ✕
              </button>
            </div>

            {statusUpdateMessage && (
              <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{statusUpdateMessage}</span>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-xs font-sans uppercase text-[#86868B] mb-3 font-semibold">
                Customisation Specifications
              </h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-black/[0.03] dark:bg-black border border-black/[0.06] dark:border-white/[0.06]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-xs text-[#1D1D1F] dark:text-white">
                        {item.variantName} (Qty: {item.quantity})
                      </span>
                      <span className="font-mono text-xs text-[#1D1D1F] dark:text-white">₹{item.totalPrice}</span>
                    </div>

                    <div className="scale-85 origin-center pointer-events-none mb-2">
                      <LivePatchPreview
                        variantId={item.variantId}
                        riderName={item.customName}
                        bloodGroup={item.bloodGroup || ''}
                        hasFlag={item.hasFlag}
                        showInspectionControls={false}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-[#86868B] pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
                      <div>Name: <span className="text-[#1D1D1F] dark:text-white">{item.customName}</span></div>
                      <div>Blood: <span className="text-rose-500">{item.bloodGroup || 'N/A'}</span></div>
                      <div>Flag: <span className="text-[#1D1D1F] dark:text-white">{item.hasFlag ? 'Yes' : 'No'}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-[#86868B] text-[10px] block mb-1">Customer</span>
                <div className="font-semibold text-[#1D1D1F] dark:text-white">{selectedOrder.customer.fullName}</div>
                <div className="text-[#86868B]">{selectedOrder.customer.phone}</div>
                <div className="text-[#86868B]">{selectedOrder.customer.email}</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-[#86868B] text-[10px] block mb-1">Address</span>
                <div className="text-[#1D1D1F] dark:text-white">{selectedOrder.shippingAddress.addressLine1}</div>
                <div className="text-[#1D1D1F] dark:text-white">{selectedOrder.shippingAddress.addressLine2}</div>
                <div className="text-[#86868B]">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] mb-6 space-y-3">
              <h4 className="text-xs font-sans uppercase text-[#1D1D1F] dark:text-white font-semibold">
                Update Production Status
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[10px] text-[#86868B] mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value as OrderStatus)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-white/[0.04] border border-black/[0.1] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PRODUCTION">IN_PRODUCTION</option>
                    <option value="DISPATCHED">DISPATCHED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-[#86868B] mb-1">Courier</label>
                  <input
                    type="text"
                    value={courierNameInput}
                    onChange={e => setCourierNameInput(e.target.value)}
                    placeholder="BlueDart / Delhivery"
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-white/[0.04] border border-black/[0.1] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#86868B] mb-1">Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumberInput}
                    onChange={e => setTrackingNumberInput(e.target.value)}
                    placeholder="BD749102849IN"
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-white/[0.04] border border-black/[0.1] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveOrderStatus}
                className="w-full py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

function renderStatusPill(status: OrderStatus) {
  switch (status) {
    case 'PENDING':
      return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">Pending</span>;
    case 'IN_PRODUCTION':
      return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">Production</span>;
    case 'DISPATCHED':
      return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">Dispatched</span>;
    case 'DELIVERED':
      return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Delivered</span>;
    case 'CANCELLED':
      return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">Cancelled</span>;
  }
}
