import React, { useEffect, useState } from "react";
import { X, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

type Variant = {
  price: number;
  discount: number;
  stock: number;
  size: string;
};

const VendorAddProductModal: React.FC<Props> = ({ onClose }) => {
  const [variantEnabled, setVariantEnabled] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState<string | null>(null);
  const [variantImages, setVariantImages] = useState<{ [key: number]: string | null }>({});

  useEffect(() => {
    if (variantEnabled && variants.length === 0) {
      setVariants([{ price: 0, discount: 0, stock: 0, size: "" }]);
    }
    if (!variantEnabled) {
      setVariants([]);
    }
  }, [variantEnabled]);

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { price: 0, discount: 0, stock: 0, size: "" },
    ]);
  };

  const updateVariant = (
    index: number,
    field: keyof Variant,
    value: number | string
  ) => {
    const updated = [...variants];
    updated[index][field] = value as never;
    setVariants(updated);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
    setVariantImages((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isVariant?: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isVariant !== undefined) {
          setVariantImages((prev) => ({ ...prev, [isVariant]: result }));
        } else {
          setProductImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!productName.trim()) {
      toast.error("Please enter product name");
      return;
    }
    if (!productImage && !variantEnabled) {
      toast.error("Please upload product image");
      return;
    }
    if (variantEnabled && variants.length === 0) {
      toast.error("Please add at least one variant");
      return;
    }

    // Here you would typically make an API call to add the product
    toast.success("Product added successfully!");
    setProductName("");
    setProductImage(null);
    setVariants([]);
    setVariantImages({});
    setTimeout(onClose, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 z-10 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Product</h2>
          <button onClick={onClose}>
            <X className="cursor-pointer" size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* BASIC INFO */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Basic Information</h3>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Product Name</label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Smart phone"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Write here"
              />
            </div>

            {/* CATEGORY */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Category</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option>Smart phone</option>
                <option>Electronics</option>
                <option>Clothing</option>
              </select>
            </div>
          </div>

          {/* GLOBAL PRICING */}
          {!variantEnabled && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Pricing & Stock</h3>

              <div className="grid grid-cols-3 gap-3 ">
                <input type="number" placeholder="Price" className="border border-gray-200 p-2" />
                <input type="number" placeholder="Discount" className="border border-gray-200 p-2" />
                <input type="number" placeholder="Stock" className="border border-gray-200 p-2" />
              </div>

              {/* IMAGE */}
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center mt-5">
                {productImage ? (
                  <div className="relative">
                    <img src={productImage} alt="Product" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                    <button
                      onClick={() => setProductImage(null)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
                    <label className="bg-blue-500 text-white px-4 py-2 rounded text-sm cursor-pointer inline-block hover:bg-blue-600">
                      Choose Files
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">or drag and drop</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* VARIANT TOGGLE */}
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Product Variants</h3>

            <button
              onClick={() => setVariantEnabled(!variantEnabled)}
              className={`w-10 h-5 cursor-pointer rounded-full ${variantEnabled ? "bg-blue-500" : "bg-gray-300"
                } relative`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition ${variantEnabled ? "translate-x-5" : ""
                  }`}
              />
            </button>
          </div>

          {/* VARIANTS */}
          {variantEnabled && (
            <div className="space-y-3">

              <button
                onClick={addVariant}
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded text-sm"
              >
                <Plus size={14} /> Add Variant
              </button>

              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50 pt-10 relative"
                >
                  {/* DELETE */}
                  <button
                    onClick={() => removeVariant(index)}
                    className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                    title="Delete variant"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* IMAGE */}
                  <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                    {variantImages[index] ? (
                      <div className="relative">
                        <img src={variantImages[index]!} alt="Variant" className="w-24 h-24 object-cover rounded-lg mx-auto" />
                        <button
                          onClick={() => setVariantImages((prev) => ({ ...prev, [index]: null }))}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="mx-auto text-gray-400 mb-2" size={24} />
                        <label className="bg-blue-500 text-white px-3 py-1 rounded text-xs cursor-pointer inline-block hover:bg-blue-600">
                          Choose Files
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, index)}
                            className="hidden"
                          />
                        </label>
                      </>
                    )}
                  </div>

                  {/* INPUTS */}
                  <div className="grid grid-cols-4 gap-3">
                    <input
                      type="text"
                      value={variant.size || ""}
                      onChange={(e) =>
                        updateVariant(index, "size", e.target.value)
                      }
                      placeholder="Size (M, L, XL)"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      type="number"
                      value={variant.price || ""}
                      onChange={(e) =>
                        updateVariant(index, "price", Number(e.target.value) || 0)
                      }
                      placeholder="Price"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      type="number"
                      value={variant.discount || ""}
                      onChange={(e) =>
                        updateVariant(index, "discount", Number(e.target.value) || 0)
                      }
                      placeholder="% Discount"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      type="number"
                      value={variant.stock || ""}
                      onChange={(e) =>
                        updateVariant(index, "stock", Number(e.target.value) || 0)
                      }
                      placeholder="Stock"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer rounded-full border border-red-300 text-red-500 hover:bg-red-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleAddProduct}
            className="px-5 py-2 rounded-full cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorAddProductModal;