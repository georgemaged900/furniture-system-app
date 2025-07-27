import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Required to get product ID from URL
import { _getRequest } from "../utils/request";

interface ISubcomponent {
  id: number;
  name: string;
  material: string;
  customNotes: string;
  count: number;
  totalQuantity: number;
  detailSize: { length: number; width: number; thickness: number };
  cuttingSize: { length: number; width: number; thickness: number };
  finalSize: { length: number; width: number; thickness: number };
  veneer: { inner: string; outer: string };
  componentId: number;
}

interface IComponent {
  id: number;
  name: string;
  quantity: number;
  subcomponents: ISubcomponent[];
}

interface IProduct {
  id: number;
  name: string;
  components: IComponent[];
}

const ProductDetailsPage = () => {
  const { id } = useParams(); // Get ID from the route
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await _getRequest<IProduct>(`Product/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>جاري التحميل...</div>;
  if (!product) return <div>المنتج غير موجود</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">المنتج: {product.name}</h1>

      {product.components.map((component) => (
        <div key={component.id} className="border rounded-xl p-4 shadow">
          <h2 className="text-xl font-semibold">
            المكون: {component.name} (x{component.quantity})
          </h2>
          <table className="w-full text-sm mt-4 border">
            <thead className="bg-gray-100">
              <tr>
                <th>الاسم</th>
                <th>الخامة</th>
                <th>العدد</th>
                <th>مقاس تفصيل</th>
                <th>مقاس تقصيب</th>
                <th>مقاس نهائي</th>
                <th>القشرة</th>
                <th>ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {component.subcomponents.map((sub) => (
                <tr key={sub.id} className="border-t">
                  <td>{sub.name}</td>
                  <td>{sub.material}</td>
                  <td>{sub.totalQuantity}</td>
                  <td>{`${sub.detailSize.length} × ${sub.detailSize.width} × ${sub.detailSize.thickness}`}</td>
                  <td>{`${sub.cuttingSize.length} × ${sub.cuttingSize.width} × ${sub.cuttingSize.thickness}`}</td>
                  <td>{`${sub.finalSize.length} × ${sub.finalSize.width} × ${sub.finalSize.thickness}`}</td>
                  <td>{`${sub.veneer.outer} / ${sub.veneer.inner}`}</td>
                  <td>{sub.customNotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ProductDetailsPage;
