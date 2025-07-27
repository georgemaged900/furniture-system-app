export interface ISubcomponent {
  id: number;
  name: string;
  material: string;
  customNotes: string;
  count: number;
  totalQuantity: number; // count * component quantity
  detailSize: {
    length: number;
    width: number;
    thickness: number;
  };
  cuttingSize: {
    length: number;
    width: number;  
    thickness: number;
  };
  finalSize: {
    length: number;
    width: number;
    thickness: number;
  };
  veneer: {
    inner: string;
    outer: string;
  };
  componentId: number;
}