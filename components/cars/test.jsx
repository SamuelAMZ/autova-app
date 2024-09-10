import { useProduct } from "@/context/ProductContext";
import axios from "axios";

export default function FinalPage() {
  const { productData } = useProduct();

  const handleSubmit = async () => {
    try {
      await axios.post("/api/submit", productData);
      // Handle successful submission
    } catch (error) {
      // Handle error
    }
  };

  return (
    <TouchableOpacity onPress={handleSubmit}>
      <ThemedText>Submit Product</ThemedText>
    </TouchableOpacity>
  );
}


import { useProduct } from "@/context/ProductContext";

export default function BrandPage() {
  const { updateProductData, productData } = useProduct();

  const handleBrandSelect = (brand) => {
    updateProductData({ model: brand });
  };

  return (
    // Your UI logic for selecting a brand
    <TouchableOpacity onPress={() => handleBrandSelect("selectedbrand")}>
      <ThemedText>Select Brand</ThemedText>
    </TouchableOpacity>
  );
}
