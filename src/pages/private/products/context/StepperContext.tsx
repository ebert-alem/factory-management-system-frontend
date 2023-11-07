import { createContext } from "react";

export const StepperContext = createContext<{
  productData: {
    name: string;
    description: string;
    color: string;
    size: string;
    price: string;
    stock: string;
    imageUrl: string;
  };
  setProductData: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    color: string;
    size: string;
    price: string;
    stock: string;
    imageUrl: string;
  }>>;
  selectedMaterials: any[];
  setSelectedMaterials: React.Dispatch<React.SetStateAction<any[]>>;
  quantity: string[];
  setQuantity: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  productData: {
    name: '',
    description: '',
    color: '',
    size: '',
    price: '',
    stock: '',
    imageUrl: '',
  },
  setProductData: () => {},
  selectedMaterials: [],
  setSelectedMaterials: () => {},
  quantity: [],
  setQuantity: () => {},
});