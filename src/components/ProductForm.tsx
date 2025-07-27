import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { _postRequest } from "../utils/request";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Props {
  onProductAdded: () => void; // Callback to refresh product list
}

const   ProductForm = ({ onProductAdded }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Basic validation
  if (!name.trim() || !price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
    alert(" يرجى ملء كل الحقول بشكل صحيح");
    return;
  }

  try {
    await _postRequest("Product", {
      name,
      price: Number(price),
    });
    setSuccessOpen(true);
    setName("");
    setPrice("");
    onProductAdded(); // Refresh product list
  } catch (error) {
    console.error(" Failed to add product:", error);
  }
};


  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="اسم المنتج"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="السعر"
            type="number"
            fullWidth
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            إضافة المنتج
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success" variant="filled">
          تمت إضافة المنتج بنجاح!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductForm;
