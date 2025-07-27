import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { _getRequest, _putRequest } from "../utils/request";
import {
  TextField,
  Button,
  Typography,
  Container,
  Stack,
} from "@mui/material";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
  if (id) {
    _getRequest(`Product/${id}`).then((data) => {
      console.log("Fetched response", data);
      const product = data as Product;
      setProduct(product);
      setName(product.name);
      setPrice(product.price.toString());
    });
  }
}, [id]);



  const handleUpdate = async () => {
    const parsedPrice = parseFloat(price);
    if (!name || isNaN(parsedPrice)) {
      alert("يرجى ملء كل الحقول بشكل صحيح");
      return;
    }

    const updatedProduct: Product = {
      id: Number(id),
      name,
      price: parsedPrice,
    };

    await _putRequest(`Product/${id}`, updatedProduct);
    navigate("/products");
  };

  if (!product) return <div>جاري التحميل...</div>;

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        تعديل المنتج
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="السعر"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button variant="contained" onClick={handleUpdate}>
          حفظ التعديل
        </Button>
      </Stack>
    </Container>
  );
}
