import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {categoryName}
      </h1>
      <p className="text-gray-500">Products for "{categoryName}" will appear here</p>
      <p className="text-gray-600 mb-8">
        Browse all products in the {categoryName} category
      </p>
    </>

  );
};

export default ProductCategory;
