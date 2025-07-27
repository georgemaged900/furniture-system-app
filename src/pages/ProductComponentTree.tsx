import React, { useEffect, useState } from "react";
import { _getRequest } from "../utils/request";

interface SubcomponentDto {
  subcomponentId: number;
  subcomponentName: string;
  material: string;
  customNotes: string;
  count: number;
  totalQuantity: number;
  detailLength: number;
  detailWidth: number;
  detailThickness: number;
  cuttingLength: number;
  cuttingThickness: number;
  finalLength: number;
  finalWidth: number;
  finalThickness: number;
  veneerInner: string;
  veneerOuter: string;
}

interface ComponentDto {
  componentId: number;
  componentName: string;
  quantity: number;
  subcomponents: SubcomponentDto[];
}

interface ProductDto {
  productId: number;
  productName: string;
  price: number;
  components: ComponentDto[];
}

const ProductComponentTree = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGroupedView = () => {
    _getRequest<ProductDto[]>("Product/componentHierarchy")
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchGroupedView();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (products.length === 0) return <p className="p-4">No data found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6"> Products View (Grouped)</h1>
      {products.map((product) => (
        <div key={product.productId} className="mb-6 border rounded-xl shadow p-4 bg-white">
          <h2 className="text-xl font-semibold mb-2">
            {product.productName} - {product.price} EGP
          </h2>

          {product.components.map((component) => (
            <div key={component.componentId} className="ml-4 mb-4">
              <h3 className="font-medium text-lg text-gray-800">
                 {component.componentName} × {component.quantity}
              </h3>

              <table className="table-auto border-collapse w-full mt-2 text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Material</th>
                    <th className="border px-2 py-1">Notes</th>
                    <th className="border px-2 py-1">Count</th>
                    <th className="border px-2 py-1">Total Qty</th>
                    <th className="border px-2 py-1">Detail (L×W×T)</th>
                    <th className="border px-2 py-1">Cutting (L×T)</th>
                    <th className="border px-2 py-1">Final (L×W×T)</th>
                    <th className="border px-2 py-1">Veneer (In/Out)</th>
                  </tr>
                </thead>
                <tbody>
                  {component.subcomponents.map((sub) => (
                    <tr key={sub.subcomponentId}>
                      <td className="border px-2 py-1">{sub.subcomponentName}</td>
                      <td className="border px-2 py-1">{sub.material}</td>
                      <td className="border px-2 py-1">{sub.customNotes}</td>
                      <td className="border px-2 py-1">{sub.count}</td>
                      <td className="border px-2 py-1">{sub.totalQuantity}</td>
                      <td className="border px-2 py-1">
                        {sub.detailLength}×{sub.detailWidth}×{sub.detailThickness}
                      </td>
                      <td className="border px-2 py-1">
                        {sub.cuttingLength}×{sub.cuttingThickness}
                      </td>
                      <td className="border px-2 py-1">
                        {sub.finalLength}×{sub.finalWidth}×{sub.finalThickness}
                      </td>
                      <td className="border px-2 py-1">
                        {sub.veneerInner} / {sub.veneerOuter}
                      </td>
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

export default ProductComponentTree;
