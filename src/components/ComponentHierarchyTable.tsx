import React, { useEffect, useState } from 'react';
import { Product } from '../types/types';

const ComponentHierarchyTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('Product/componentHierarchy') 
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="p-4">
      {products.map(product => (
        <div key={product.productId} className="mb-8 border rounded-lg shadow">
          <div className="bg-gray-100 px-4 py-2 font-bold text-lg">
            🪑 {product.productName} – {product.price} جنيه
          </div>
          {product.components.map(component => (
            <div key={component.componentId} className="p-4">
              <h3 className="text-md font-semibold mb-2">
                🧩 {component.componentName} (الكمية: {component.quantity})
              </h3>
              <table className="min-w-full border text-sm text-right">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-2 py-1">#</th>
                    <th className="border px-2 py-1">الاسم</th>
                    <th className="border px-2 py-1">الخامة</th>
                    <th className="border px-2 py-1">ملاحظات</th>
                    <th className="border px-2 py-1">العدد</th>
                    <th className="border px-2 py-1">إجمالي الكمية</th>
                    <th className="border px-2 py-1">تفاصيل</th>
                    <th className="border px-2 py-1">تقطيع</th>
                    <th className="border px-2 py-1">نهائي</th>
                    <th className="border px-2 py-1">قشرة داخلية</th>
                    <th className="border px-2 py-1">قشرة خارجية</th>
                  </tr>
                </thead>
                <tbody>
                  {component.subcomponents.map((sub, idx) => (
                    <tr key={sub.subcomponentId} className="hover:bg-gray-50">
                      <td className="border px-2 py-1">{idx + 1}</td>
                      <td className="border px-2 py-1">{sub.subcomponentName}</td>
                      <td className="border px-2 py-1">{sub.material}</td>
                      <td className="border px-2 py-1">{sub.customNotes}</td>
                      <td className="border px-2 py-1">{sub.count}</td>
                      <td className="border px-2 py-1">{sub.totalQuantity}</td>
                      <td className="border px-2 py-1">
                        {sub.detailLength} × {sub.detailWidth} × {sub.detailThickness}
                      </td>
                      <td className="border px-2 py-1">
                        {sub.cuttingLength} × – × {sub.cuttingThickness}
                      </td>
                      <td className="border px-2 py-1">
                        {sub.finalLength} × {sub.finalWidth} × {sub.finalThickness}
                      </td>
                      <td className="border px-2 py-1">{sub.veneerInner}</td>
                      <td className="border px-2 py-1">{sub.veneerOuter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ComponentHierarchyTable;
