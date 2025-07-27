import { TextField, Stack } from "@mui/material";

interface Component {
  name: string;
  quantity: number;
}

interface Props {
  component: Component;
  onChange: (component: Component) => void;
}

export default function ComponentForm({ component, onChange }: Props) {
  return (
    <Stack spacing={2}>
      <TextField
        label="اسم المكون"
        value={component.name}
        onChange={(e) => onChange({ ...component, name: e.target.value })}
      />
      <TextField
        label="الكمية"
        type="number"
        value={component.quantity}
        onChange={(e) =>
          onChange({ ...component, quantity: parseInt(e.target.value) })
        }
      />
    </Stack>
  );
}
