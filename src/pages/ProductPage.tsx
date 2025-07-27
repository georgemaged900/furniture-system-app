import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { _getRequest } from "../utils/request";
import ProductForm from "../components/ProductForm";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { Button } from "@mui/material"; 
import { useNavigate } from "react-router-dom"; 
import { _deleteRequest } from "../utils/request"; 

interface Product {
  id: number;
  name: string;
  price: number;
}


const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    _getRequest<Product[]>("Product")
      .then(setProducts)
      .catch(console.error);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      try {
        await _deleteRequest(`Product/${id}`);
        fetchProducts(); // Refresh the list
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box maxWidth="md" mx="auto" p={4}>
      <Typography variant="h4" align="center" gutterBottom>
         قائمة المنتجات
      </Typography>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          إضافة منتج جديد
        </Typography>
        <ProductForm onProductAdded={fetchProducts} />
      </Box>

      <Typography variant="h6" gutterBottom>
         المنتجات المتاحة
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid size={12} key={product.id}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "#1976d2" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.name}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                السعر: {product.price} ج.م
              </Typography>

              <Box mt={2} display="flex" gap={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                >
                  تعديل
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(product.id)}
                >
                  حذف
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductPage;
