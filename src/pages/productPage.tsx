import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addImageToProduct,
  addProduct,
  deleteProduct,
  deleteProductImage,
  editProduct,
  getByIdProduct,
  getProduct,
} from "../services/productServices/product";
import { queryClient } from "../main";
import { Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { getBrand } from "../services/brandServices/brand";
import { getColor } from "../services/colorServices/color";
import { getSubCategory } from "../services/subCategoryServices/subCategory";

const ProductPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData(e.currentTarget);

    const payload = {
      Id: selectedProduct.id,
      BrandId: Number(formData.get("BrandId")),
      ColorId: Number(formData.get("ColorId")),
      SubCategoryId: Number(formData.get("SubCategoryId")),
      ProductName: formData.get("ProductName") || selectedProduct.productName,
      Description: formData.get("Description") || selectedProduct.description,
      Code: Date.now(),
      Quantity: Number(formData.get("Quantity")),
      Price: Number(formData.get("Price")),
      DiscountPrice: Number(formData.get("DiscountPrice")),
      HasDiscount: formData.get("HasDiscount") === "true",
    };

    editData.mutate(payload);
  };

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
    mutationFn: editProduct,

    onSuccess: () => {
      notification.success({
        message: "Updated",
        description: "Product updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpenEdit(false);
    },

    onError: (error: any) => {
      if (error.message === "TOKEN_EXPIRED") {
        notification.error({
          message: "Session expired",
          description: "Please login again",
        });
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        notification.error({
          message: "Error",
          description: "Failed to update product",
        });
      }
    },
  });

  async function handleEdit(product: any) {
    const full = await getByIdProduct(product.id);
    setSelectedProduct({
      id: full.id,
      productName: full.productName,
      description: full.description,
      code: full.code,
      price: full.price,
      discountPrice: full.discountPrice,
      quantity: full.quantity,
      brandId: full.brandId,
      colorId: full.colorId,
      subCategoryId: full.subCategoryId,
      hasDiscount: full.hasDiscount,
      images: full.images,
    });
  }

  useEffect(() => {
    if (selectedProduct) {
      setOpenEdit(true);
    }
  }, [selectedProduct]);

  const addImageMutation = useMutation({
    mutationFn: ({
      productId,
      images,
    }: {
      productId: number;
      images: any;
    }) => addImageToProduct(productId, images),
    onSuccess: () => {
      notification.success({
        message: "Images Added",
        description: "Images successfully added to product",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to add images",
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: (imageId: number) => deleteProductImage(imageId),

    onSuccess: () => {
      notification.success({
        message: "Deleted",
        description: "Image deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to delete image",
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
            {data?.products?.map((product: any) => (
              <div
                key={product.id}
                className="bg-[#ffffff00] border-[2px] border-gray-600 rounded-2xl shadow-lg p-4 flex flex-col gap-3 hover:shadow-2xl transition"
              >
                <div className="relative w-40 h-40">
                  <img
                    src={`https://store-api.softclub.tj/images/${
                      selectedProduct?.image?.images || product.image
                    }`}
                    alt={product.productName}
                    className="w-40 h-40 object-cover rounded-xl"
                  />

                  <label
                    htmlFor={`add-image-${product.id}`}
                    className="absolute bottom-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full shadow-md hover:bg-yellow-500 cursor-pointer text-xs flex items-center gap-1"
                  >
                    + Add
                  </label>

                  <input
                    type="file"
                    id={`add-image-${product.id}`}
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (!e.target.files || e.target.files.length === 0)
                        return;
                      addImageMutation.mutate({
                        productId: Number(product.id),
                        images: e.target.files[0],
                      });

                      e.target.value = "";
                    }}
                  />
                </div>

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
                      className="
    flex items-center gap-2
    bg-gradient-to-r from-red-500 to-rose-600
    text-white text-sm font-semibold
    px-4 py-2 rounded-xl
    shadow-md shadow-red-500/30
    hover:from-red-600 hover:to-rose-700
    hover:shadow-lg hover:shadow-red-600/40
    active:scale-95
    transition-all duration-200
  "
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="
    flex items-center gap-2
    bg-gradient-to-r from-yellow-400 to-amber-500
    text-white text-sm font-semibold
    px-4 py-2 rounded-xl
    shadow-md shadow-yellow-500/30
    hover:from-yellow-500 hover:to-amber-600
    hover:shadow-lg hover:shadow-yellow-600/40
    active:scale-95
    transition-all duration-200
  "
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
              {brands?.map((brand: any) => (
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
              {colors?.map((color: any) => (
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
              {subCategory?.map((sub: any) => (
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
        open={openEdit}
        onCancel={() => {
          setOpenEdit(false);
          setSelectedProduct(null);
        }}
        footer={null}
        destroyOnClose
        className="dark-modal rounded-2xl overflow-hidden"
        title={
          <h2 className="text-white text-xl bg-[#1f1f2e] p-5 rounded-2xl font-bold">
            Edit Product
          </h2>
        }
      >
        <div className="flex gap-4 text-white  bg-[#1f1f2e] p-5 rounded-2xl ">
          {selectedProduct?.images?.map((img:any) => {
            console.log(img, "lll");
            return (
              <div>
                <img
                  src={"https://store-api.softclub.tj/images/" + img.images}
                  alt=""
                  className="w-20 h-20"
                />
                <button className="p-2 bg-[red] mt-2 rounded-2xl" onClick={() => deleteImageMutation.mutate(img.id)}>Delete</button>
              </div>
            );
          })}
        </div>
        <form
          id="edit-product-form"
          className="flex flex-col gap-4 p-6 bg-[#1f1f2e] rounded-2xl"
          onSubmit={handleEditSubmit}
        >
          <input
            name="ProductName"
            defaultValue={selectedProduct?.productName}
            placeholder="Product Name"
            className="bg-[#2a2a3f] text-white p-3 rounded-lg border border-gray-600"
          />
          <input
            name="Description"
            defaultValue={selectedProduct?.description}
            placeholder="Description"
            className="bg-[#2a2a3f] text-white p-3 rounded-lg border"
          />

          <input
            name="Code"
            defaultValue={selectedProduct?.code}
            placeholder="Code"
            className="bg-[#2a2a3f] text-white p-3 rounded-lg border"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="Price"
              type="number"
              defaultValue={selectedProduct?.price}
              placeholder="Price"
              className="bg-[#2a2a3f] text-white p-3 rounded-lg border border-gray-600"
            />

            <input
              name="DiscountPrice"
              type="number"
              defaultValue={selectedProduct?.discountPrice}
              placeholder="Discount Price"
              className="bg-[#2a2a3f] text-white p-3 rounded-lg border border-gray-600"
            />
          </div>

          <input
            name="Quantity"
            type="number"
            defaultValue={selectedProduct?.quantity}
            placeholder="Quantity"
            className="bg-[#2a2a3f] text-white p-3 rounded-lg border border-gray-600"
          />

          <div className="grid grid-cols-3 gap-4">
            <select
              name="BrandId"
              defaultValue={selectedProduct?.brandId}
              className="bg-[#2a2a3f] text-white p-3 rounded-lg border border-gray-600"
            >
              {brands?.map((b: any) => (
                <option key={b.id} value={b.id}>
                  {b.brandName}
                </option>
              ))}
            </select>

            <select
              name="ColorId"
              defaultValue={selectedProduct?.colorId}
              className="bg-[#2a2a3f] text-white p-3 rounded-lg border border-gray-600"
            >
              {colors?.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.colorName}
                </option>
              ))}
            </select>

            <select
              name="SubCategoryId"
              defaultValue={selectedProduct?.subCategoryId}
              className="bg-[#2a2a3f] text-white p-3 rounded-lg border border-gray-600"
            >
              {subCategory?.map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.subCategoryName}
                </option>
              ))}
            </select>
          </div>

          <select
            name="HasDiscount"
            defaultValue={String(selectedProduct?.hasDiscount)}
            className="bg-[#2a2a3f] text-white p-3 rounded-lg border border-gray-600"
          >
            <option value="true">Has Discount</option>
            <option value="false">No Discount</option>
          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpenEdit(false)}
              className="px-6 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:scale-105 transition"
            >
              Save changes
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProductPage;
