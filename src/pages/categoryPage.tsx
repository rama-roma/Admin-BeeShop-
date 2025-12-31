import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../services/categoryServices/category";
import { useState } from "react";
import { Modal } from "antd";

const CategoryPage = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const [openSub, setOpenSub] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  return (
    <main className="min-h-screen bg-[#1f1f2e] p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Category List</h1>

      <div className="flex justify-end mb-6">
        <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:scale-105 transition">
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
              <h2 className="text-white font-semibold text-lg mb-4">{category.categoryName}</h2>

              <div className="flex gap-3 w-full mb-2">
                <button className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-2 rounded-xl hover:scale-105 transition font-semibold">
                  Edit
                </button>
                <button className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 rounded-xl hover:scale-105 transition font-semibold">
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
          <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition font-semibold self-start">
            Add Subcategory
          </button>

          {selectedCategory?.subCategories?.map((sub: any) => (
            <div
              key={sub.id}
              className="flex justify-between items-center bg-[#1f1f2e] p-3 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <span className="text-white">{sub.subCategoryName}</span>
              <div className="flex gap-2">
                <button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-3 py-1 rounded-xl hover:scale-105 transition text-sm">
                  Edit
                </button>
                <button className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 rounded-xl hover:scale-105 transition text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </main>
  );
};

export default CategoryPage;
