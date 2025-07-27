// types.ts
export interface SubComponent {
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

export interface Component {
  componentId: number;
  componentName: string;
  quantity: number;
  subcomponents: SubComponent[];
}

export interface Product {
  productId: number;
  productName: string;
  price: number;
  components: Component[];
}
