import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
} from "../services/productServices/product";
import { queryClient } from "../main";
import { Modal, notification } from "antd";
import { useState } from "react";
import { getBrand } from "../services/brandServices/brand";
import { getColor } from "../services/colorServices/color";
import { getSubCategory } from "../services/subCategoryServices/subCategory";

const ProductPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // const [newName, setNewName] = useState("");
  // const [newCategory, setNewCategory] = useState("");
  // const [newColor, setNewColor] = useState("");
  // const [newQuantity, setNewQuantity] = useState("");
  // const [newPrice, setNewPrice] = useState("");
  // const [newDiscountPrice, setNewDiscountPrice] = useState("");
  // const [newHasDicount, setNewHasDiscount] = useState(false);

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrand,
  });

  const { data: colors } = useQuery({
    queryKey: ["colors"],
    queryFn: getColor,
  });

  const { data: subCategory } = useQuery({
    queryKey: ["subCategory"],
    queryFn: getSubCategory,
  });

  const deleteData = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notification.success({
        message: "Product Deleted",
        description: "The product has been successfully deleted.",
        placement: "topRight",
      });
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to delete the product.",
        placement: "topRight",
      });
    },
  });

  const addData = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      notification.success({
        message: "Product Added",
        description: "The product has been successfully added.",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      notification.error({
        message: "Error",
        description: error.message || "Failed to add product",
        placement: "topRight",
      });
    },
  });

  const editData = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      editProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notification.success({
        message: "Product Updated",
        description: "The product has been successfully updated.",
        placement: "topRight",
      });
    },
    onError: (error: any) => {
      notification.error({
        message: "Error",
        description: error.message || "Failed to update product",
        placement: "topRight",
      });
    },
  });

  return (
    <>
      <main>
        <section className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-5">Product List</h1>
          <div className="mb-5">
            <button
              onClick={() => setOpenAdd(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.products?.map((product) => (
              <div
                key={product.id}
                className="bg-[#ffffff00] border-[2px] border-gray-600 rounded-2xl shadow-lg p-4 flex flex-col gap-3 hover:shadow-2xl transition"
              >
                <img
                  src={`https://store-api.softclub.tj/images/${product.image}`}
                  alt={product.productName}
                  className="w-40 h-40 object-cover rounded-xl"
                />

                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-semibold">
                    {product.productName}
                  </h2>
                  <p className="text-gray-500 text-sm">ID: {product.id}</p>
                  <p className="text-gray-500 text-sm">
                    Category: {product.categoryName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Color: {product.color}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Quantity: {product.quantity}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="font-bold">Price: ${product.discountPrice}</p>
                    {product.hasDiscount && (
                      <p className="text-green-600 font-semibold">
                        Discount: -20% → ${product.price}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteData.mutate(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product.id);
                        setOpenEdit(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Modal
        title={
          <h2 className="text-white text-xl bg-[#1f1f2e] p-5 rounded-2xl font-bold">
            Add Product
          </h2>
        }
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        footer={null}
        className="dark-modal rounded-2xl overflow-hidden"
      >
        <form
          id="add-product-form"
          className="flex flex-col gap-4 p-6 bg-[#1f1f2e] rounded-2xl"
        >
          <input
            name="ProductName"
            placeholder="Product Name"
            className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
            required
          />
          <input
            name="Description"
            placeholder="Description"
            className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
            required
          />
          <input
            name="Code"
            placeholder="Code"
            className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="Price"
              type="number"
              placeholder="Price"
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
              required
            />
            <input
              name="DiscountPrice"
              type="number"
              placeholder="Discount Price"
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition"
            />
          </div>

          <input
            name="Quantity"
            type="number"
            placeholder="Quantity"
            className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
            required
          />

          <div className="grid grid-cols-3 gap-4">
            <select
              name="BrandId"
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Brand
              </option>
              {brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </select>

            <select
              name="ColorId"
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Color
              </option>
              {colors?.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.colorName}
                </option>
              ))}
            </select>

            <select
              name="SubCategoryId"
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select SubCategory
              </option>
              {subCategory?.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.subCategoryName}
                </option>
              ))}
            </select>
          </div>

          <input
            type="file"
            name="Images"
            multiple
            className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg placeholder-gray-400 transition"
            required
          />

          <select
            name="HasDiscount"
            className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="true">Has Discount</option>
            <option value="false">No Discount</option>
          </select>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setOpenAdd(false)}
              className="bg-gray-700 text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                const form = document.getElementById(
                  "add-product-form"
                ) as HTMLFormElement;
                const formData = new FormData(form);
                addData.mutate(formData, {
                  onSuccess: () => setOpenAdd(false),
                });
              }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 hover:shadow-2xl transition-transform font-semibold"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title={
          <h2 className="text-white text-xl bg-[#1f1f2e] p-5 rounded-2xl font-bold">
            Edit Product
          </h2>
        }
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
      >
        {selectedProduct && (
          <form
            id="edit-product-form"
            className="flex flex-col gap-4 p-6 bg-[#1f1f2e] rounded-2xl"
          >
            <input
              name="ProductName"
              defaultValue={selectedProduct.productName}
              placeholder="Product Name"
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
              required
            />
            <input
              name="Description"
              defaultValue={selectedProduct.description}
              placeholder="Description"
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
              required
            />
            <input
              name="Code"
              defaultValue={selectedProduct.code}
              placeholder="Code"
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="Price"
                type="number"
                defaultValue={selectedProduct.price}
                placeholder="Price"
                className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
                required
              />
              <input
                name="DiscountPrice"
                type="number"
                defaultValue={selectedProduct.discountPrice}
                placeholder="Discount Price"
                className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition"
              />
            </div>

            <input
              name="Quantity"
              type="number"
              defaultValue={selectedProduct.quantity}
              placeholder="Quantity"
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
              required
            />

            <div className="grid grid-cols-3 gap-4">
              <select
                name="BrandId"
                defaultValue={selectedProduct.brandId}
                className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                required
              >
                {brands?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>

              <select
                name="ColorId"
                defaultValue={selectedProduct.colorId}
                className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                required
              >
                {colors?.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.colorName}
                  </option>
                ))}
              </select>

              <select
                name="SubCategoryId"
                defaultValue={selectedProduct.subCategoryId}
                className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                required
              >
                {subCategory?.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.subCategoryName}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="file"
              name="Images"
              multiple
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg placeholder-gray-400 transition"
            />

            <select
              name="HasDiscount"
              defaultValue={selectedProduct.hasDiscount ? "true" : "false"}
              className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="true">Has Discount</option>
              <option value="false">No Discount</option>
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setOpenEdit(false)}
                className="bg-gray-700 text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const form = document.getElementById(
                    "edit-product-form"
                  ) as HTMLFormElement;
                  const formData = new FormData(form);
                  editData.mutate(
                    { id: selectedProduct.id, formData },
                    {
                      onSuccess: () => setOpenEdit(false),
                    }
                  );
                }}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 hover:shadow-2xl transition-transform font-semibold"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default ProductPage;
