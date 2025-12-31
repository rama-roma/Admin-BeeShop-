import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBrand,
  addBrand,
  editBrand,
  deleteBrand,
} from "../services/brandServices/brand";
import { useState } from "react";
import { Modal, notification } from "antd";

const BrandPage = () => {
  const queryClient = useQueryClient();
  const [openAdd, setOpenAdd] = useState(false);
  const [name, setName] = useState("");

  const { data } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrand,
  });

  const addMutation = useMutation({
    mutationFn: addBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      setName("");
      setOpenAdd(false);

      notification.success({
        message: "Brand Added",
        description: "The brand has been successfully added.",
        placement: "topRight",
      });
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to add the brand.",
        placement: "topRight",
      });
    },
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  const editData = useMutation({
    mutationFn: editBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      setOpenEdit(false);
      notification.success({
        message: "Brand Updated",
        description: "The brand has been successfully updated.",
        placement: "topRight",
      });
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to update the brand.",
        placement: "topRight",
      });
    },
  });

  const deleteData = useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      notification.success({
        message: "Brand Deleted",
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
  return (
    <>
      <main>
        <section className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Brand List</h1>

          <div className="mb-6">
            <button
              onClick={() => setOpenAdd(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
            >
              Add Brand
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((brand: any) => (
              <div
                key={brand.id}
                className="bg-[#ffffff08] border border-gray-600 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition"
              >
                <h2 className="text-xl font-semibold text-white">
                  {brand.brandName}
                </h2>
                <p className="text-gray-400 text-sm mt-1">ID: {brand.id}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => {
                      setSelectedBrand(brand);
                      setEditName(brand.brandName);
                      setOpenEdit(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-4 py-2 rounded-xl hover:scale-105 transition font-semibold text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteData.mutate(brand.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-red-500/30 hover:from-red-600 hover:to-rose-700 hover:shadow-lg hover:shadow-red-600/40 active:scale-95 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Modal
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        footer={null}
        className="dark-modal rounded-2xl overflow-hidden"
        title={
          <h2 className="text-white text-xl bg-[#1f1f2e] p-5 rounded-2xl font-bold">
            Add Brand
          </h2>
        }
      >
        <div className="flex flex-col gap-4 p-6 bg-[#1f1f2e] rounded-2xl">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Brand name"
            className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setOpenAdd(false)}
              className="bg-gray-700 text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => addMutation.mutate(name)}
              disabled={!name || addMutation.isPending}
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
          <h2 className="text-white text-xl bg-[#1f1f2e] p-5 rounded-2xl font-bold">
            Edit Brand
          </h2>
        }
      >
        <div className="flex flex-col gap-4 p-6 bg-[#1f1f2e] rounded-2xl">
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Brand name"
            className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpenEdit(false)}
              className="bg-gray-700 text-white px-6 py-2 rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                editData.mutate({
                  id: selectedBrand.id,
                  name: editName,
                })
              }
              className="bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BrandPage;
