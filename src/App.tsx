import React, { useState } from 'react';
import { Plus, Package, DollarSign, Hash, Edit2, Trash2, X, TrendingUp } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  normalPrice: number;
  retailPrice: number;
  quantity: number;
}

interface EditModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

interface DeleteModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function EditModal({ product, isOpen, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: product.name,
    normalPrice: product.normalPrice.toString(),
    retailPrice: product.retailPrice.toString(),
    quantity: product.quantity.toString()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.normalPrice || !formData.retailPrice || !formData.quantity) {
      return;
    }

    const updatedProduct: Product = {
      ...product,
      name: formData.name,
      normalPrice: parseFloat(formData.normalPrice),
      retailPrice: parseFloat(formData.retailPrice),
      quantity: parseInt(formData.quantity)
    };

    onSave(updatedProduct);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Edit2 className="w-5 h-5" />
            Edit Product
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Normal Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.normalPrice}
              onChange={(e) => setFormData({...formData, normalPrice: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retail Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.retailPrice}
              onChange={(e) => setFormData({...formData, retailPrice: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteModal({ product, isOpen, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Product</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    normalPrice: '',
    retailPrice: '',
    quantity: ''
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.normalPrice || !formData.retailPrice || !formData.quantity) {
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      normalPrice: parseFloat(formData.normalPrice),
      retailPrice: parseFloat(formData.retailPrice),
      quantity: parseInt(formData.quantity)
    };

    setProducts([...products, newProduct]);
    setFormData({ name: '', normalPrice: '', retailPrice: '', quantity: '' });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, quantity: newQuantity }
        : product
    ));
  };

  const incrementQuantity = (id: string, increment: number) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, quantity: Math.max(0, product.quantity + increment) }
        : product
    ));
  };

  const editProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    setDeletingProduct(null);
  };

  const calculateTotalCost = (price: number, quantity: number) => price * quantity;
  const calculateGrossProfit = (retailPrice: number, normalPrice: number, quantity: number) => 
    (retailPrice - normalPrice) * quantity;
  const calculateGrossProfitMargin = (retailPrice: number, normalPrice: number) => 
    normalPrice > 0 ? ((retailPrice - normalPrice) / normalPrice) * 100 : 0;

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  const formatPercentage = (percentage: number) => `${percentage.toFixed(1)}%`;

  const totalGrossProfit = products.reduce((sum, product) => 
    sum + calculateGrossProfit(product.retailPrice, product.normalPrice, product.quantity), 0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Product Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage your inventory and track product costs</p>
        </div>

        {/* Add Product Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Product
          </h2>
          
          <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Normal Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.normalPrice}
                onChange={(e) => setFormData({...formData, normalPrice: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="0.00"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retail Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.retailPrice}
                onChange={(e) => setFormData({...formData, retailPrice: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="0.00"
                required
              />
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Quantity
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="0"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  Add Product
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Product Inventory
            </h2>
            <p className="text-gray-600 mt-1">
              {products.length} product{products.length !== 1 ? 's' : ''} in inventory
            </p>
          </div>
          
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600">Add your first product to get started with inventory management.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Product Name</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Normal Price</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Retail Price</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Quantity</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Total Cost</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Total Retail</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Gross Profit</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Margin %</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-900">
                        {formatCurrency(product.normalPrice)}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-900">
                        {formatCurrency(product.retailPrice)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{product.quantity}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-green-600">
                          {formatCurrency(calculateTotalCost(product.normalPrice, product.quantity))}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-blue-600">
                          {formatCurrency(calculateTotalCost(product.retailPrice, product.quantity))}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-purple-600">
                          {formatCurrency(calculateGrossProfit(product.retailPrice, product.normalPrice, product.quantity))}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-semibold ${
                          calculateGrossProfitMargin(product.retailPrice, product.normalPrice) > 0 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {formatPercentage(calculateGrossProfitMargin(product.retailPrice, product.normalPrice))}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-center gap-2">
                            <input
                              type="number"
                              value={product.quantity}
                              onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-center"
                              min="0"
                            />
                            <button
                              onClick={() => incrementQuantity(product.id, 1)}
                              className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-sm font-medium"
                            >
                              +1
                            </button>
                            <button
                              onClick={() => incrementQuantity(product.id, -1)}
                              className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium"
                            >
                              -1
                            </button>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-medium flex items-center gap-1"
                            >
                              <Edit2 className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => setDeletingProduct(product)}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Normal Cost</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(products.reduce((sum, product) => 
                      sum + calculateTotalCost(product.normalPrice, product.quantity), 0
                    ))}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Retail Value</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(products.reduce((sum, product) => 
                      sum + calculateTotalCost(product.retailPrice, product.quantity), 0
                    ))}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Gross Profit</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(totalGrossProfit)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {editingProduct && (
          <EditModal
            product={editingProduct}
            isOpen={!!editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={editProduct}
          />
        )}

        {deletingProduct && (
          <DeleteModal
            product={deletingProduct}
            isOpen={!!deletingProduct}
            onClose={() => setDeletingProduct(null)}
            onConfirm={() => deleteProduct(deletingProduct.id)}
          />
        )}
      </div>
    </div>
  );
}

export default App;