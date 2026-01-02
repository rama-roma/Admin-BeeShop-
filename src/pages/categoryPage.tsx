import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategory,
} from "../services/categoryServices/category";
import { useState } from "react";
import { Modal, notification } from "antd";
import { queryClient } from "../main";
import {
  addSubCategory,
  deleteSubCategory,
  editSubCategory,
} from "../services/subCategoryServices/subCategory";

const CategoryPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const editData = useMutation({
    mutationFn: editCategory,
    onSuccess: () => {
      notification.success({
        message: "Category Updated",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpenEdit(false);
    },
    onError: (error: any) => {
      notification.error({
        message: "Update failed",
        description:
          error?.message || "Something went wrong while updating the category.",
        placement: "topRight",
      });
    },
  });

  const addData = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      notification.success({
        message: "Category Added",
        description: "The product has been successfully added.",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      notification.error({
        message: "Error",
        description: error.message || "Failed to add category",
        placement: "topRight",
      });
    },
  });

  const deleteData = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notification.success({
        message: "Category Deleted",
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

  const deleteSub = useMutation({
    mutationFn: deleteSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notification.success({
        message: "Category Deleted",
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
  const [openSub, setOpenSub] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [openAddSub, setOpenAddSub] = useState(false);
  const [subName, setSubName] = useState("");

  const addSub = useMutation({
    mutationFn: addSubCategory,
    onSuccess: () => {
      notification.success({
        message: "Subcategory Added",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setSubName("");
      setOpenAddSub(false);
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to add subcategory",
        placement: "topRight",
      });
    },
  });
  const [openEditSub, setOpenEditSub] = useState(false);
  const [editSubId, setEditSubId] = useState<number | null>(null);
  const [editSubName, setEditSubName] = useState("");

  const editSub = useMutation({
    mutationFn: editSubCategory,
    onSuccess: () => {
      notification.success({
        message: "Subcategory Updated",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setEditSubId(null);
      setEditSubName("");
      setOpenEditSub(false);
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Token expired or update failed",
        placement: "topRight",
      });
    },
  });

  return (
    <main className="min-h-screen bg-[#1f1f2e] p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Category List
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((category: any) => (
          <div
            key={category.id}
            className="bg-[#2a2a3f] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={`https://store-api.softclub.tj/images/${category.categoryImage}`}
              alt={category.categoryName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col items-center">
              <h2 className="text-white font-semibold text-lg mb-4">
                {category.categoryName}
              </h2>

              <div className="flex gap-3 w-full mb-2">
                <button
                  onClick={() => {
                    setEditCategoryId(category.id);
                    setCategoryName(category.categoryName);
                    setOpenEdit(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-2 rounded-xl hover:scale-105 transition font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteData.mutate(category.id)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 rounded-xl hover:scale-105 transition font-semibold"
                >
                  Delete
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenSub(true);
                }}
                className="bg-gradient-to-r from-green-400 to-lime-500 text-black py-2 px-6 rounded-xl hover:scale-105 transition font-semibold"
              >
                Subcategories
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={openSub}
        onCancel={() => setOpenSub(false)}
        footer={null}
        title={
          <h2 className="text-white text-xl bg-[#1f1f2e] p-4 rounded-xl font-bold">
            {selectedCategory?.categoryName} - Subcategories
          </h2>
        }
        className="dark-modal rounded-2xl overflow-hidden"
      >
        <div className="flex flex-col gap-4 p-4 bg-[#2a2a3f] rounded-2xl">
          <button
            onClick={() => setOpenAddSub(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition font-semibold self-start"
          >
            Add Subcategory
          </button>

          {selectedCategory?.subCategories?.map((sub: any) => (
            <div
              key={sub.id}
              className="flex justify-between items-center bg-[#1f1f2e] p-3 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <span className="text-white">{sub.subCategoryName}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditSubId(sub.id);
                    setEditSubName(sub.subCategoryName);
                    setOpenEditSub(true);
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-3 py-1 rounded-xl hover:scale-105 transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSub.mutate(sub.id)}
                  className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 rounded-xl hover:scale-105 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={openEditSub}
        onCancel={() => setOpenEditSub(false)}
        footer={null}
        className="dark-modal rounded-2xl overflow-hidden"
        title={
          <h2 className="text-white text-xl bg-[#1f1f2e] p-4 rounded-xl font-bold">
            Edit Subcategory
          </h2>
        }
      >
        <div className="flex flex-col gap-4 p-6 bg-[#2a2a3f] rounded-2xl">
          <input
            value={editSubName}
            onChange={(e) => setEditSubName(e.target.value)}
            placeholder="Subcategory name"
            className="bg-[#1f1f2e] text-white border border-gray-600 p-3 rounded-lg"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpenEditSub(false)}
              className="bg-gray-700 text-white px-6 py-2 rounded-xl"
            >
              Cancel
            </button>

            <button
              disabled={!editSubName || editSubId === null}
              onClick={() => {
                if (editSubId !== null) {
                  editSub.mutate({
                    id: editSubId,
                    categoryId: selectedCategory.id,
                    name: editSubName,
                  });
                }
              }}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-2 rounded-xl hover:scale-105 transition disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={openAddSub}
        onCancel={() => setOpenAddSub(false)}
        footer={null}
        className="dark-modal rounded-2xl overflow-hidden"
        title={
          <h2 className="text-white text-xl bg-[#1f1f2e] p-4 rounded-xl font-bold">
            Add Subcategory
          </h2>
        }
      >
        <div className="flex flex-col gap-4 p-6 bg-[#2a2a3f] rounded-2xl">
          <input
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
            placeholder="Subcategory name"
            className="bg-[#1f1f2e] text-white border border-gray-600 p-3 rounded-lg"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpenAddSub(false)}
              className="bg-gray-700 text-white px-6 py-2 rounded-xl"
            >
              Cancel
            </button>

            <button
              disabled={!subName}
              onClick={() =>
                addSub.mutate({
                  categoryId: selectedCategory.id,
                  name: subName,
                })
              }
              className="bg-gradient-to-r from-green-400 to-lime-500 text-black px-6 py-2 rounded-xl hover:scale-105 transition disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        footer={null}
        className="dark-modal rounded-2xl overflow-hidden"
        title={
          <h2 className="text-white text-xl bg-[#1f1f2e] p-4 rounded-xl font-bold">
            Add Category
          </h2>
        }
      >
        <div className="flex flex-col gap-4 p-6 bg-[#2a2a3f] rounded-2xl">
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category name"
            className="bg-[#1f1f2e] text-white border border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCategoryImage(e.target.files?.[0] || null)}
            className="text-white"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setOpenAdd(false)}
              className="bg-gray-700 text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                const formData = new FormData();
                formData.append("categoryName", categoryName);
                if (categoryImage) {
                  formData.append("categoryImage", categoryImage);
                }

                addData.mutate(formData);
                setOpenAdd(false);
                setCategoryName("");
                setCategoryImage(null);
              }}
              disabled={!categoryName || !categoryImage}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
        className="dark-modal rounded-2xl overflow-hidden"
        title={
          <h2 className="text-white text-xl bg-[#1f1f2e] p-4 rounded-xl font-bold">
            Edit Category
          </h2>
        }
      >
        <div className="flex flex-col gap-4 p-6 bg-[#2a2a3f] rounded-2xl">
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="bg-[#1f1f2e] text-white border border-gray-600 p-3 rounded-lg"
            placeholder="Category name"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCategoryImage(e.target.files?.[0] || null)}
            className="text-white"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpenEdit(false)}
              className="bg-gray-700 text-white px-6 py-2 rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                const formData = new FormData();
                formData.append("Id", String(editCategoryId));
                formData.append("CategoryName", categoryName);
                if (categoryImage) {
                  formData.append("CategoryImage", categoryImage);
                }

                editData.mutate(formData);
              }}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-2 rounded-xl hover:scale-105 transition"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default CategoryPage;
