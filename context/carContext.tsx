import React, { createContext, useState, useContext } from "react";

// Provide a default value for the context (it can be an empty object or null)
const ProductContext = createContext({
  productData: {},
  updateProductData: (newData: any) => {},
});

export const ProductProvider = ({ children }: { children: any }) => {
  const [productData, setProductData] = useState({
    name: "",
    modelId: "",
    colorId: "",
    engineTypeId: "",
    transmissionId: "",
    fuelTypeId: "",
    titleId: "",
    cityId: "",
    sellerId: "",
    cylinders: 0,
    year: 2023,
    doorsCount: 4,
    odometer: 0,
    salesPrice: 0,
    minPrice: 0,
    imagesUrls: [],
    keywords: [],
    isElectric: false,
    isHybrid: false,
    note: "",
  });

  const updateProductData = (newData: { name: string; modelId: string; colorId: string; engineTypeId: string; transmissionId: string; fuelTypeId: string; titleId: string; cityId: string; sellerId: string; cylinders: number; year: number; doorsCount: number; odometer: number; salesPrice: number; minPrice: number; imagesUrls: never[]; keywords: never[]; isElectric: boolean; isHybrid: boolean; note: string; }) => {
    setProductData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <ProductContext.Provider value={{ productData, updateProductData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
