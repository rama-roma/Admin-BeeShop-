import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addColor,
  deleteColor,
  editColor,
  getColor,
} from "../services/colorServices/color";
import { queryClient } from "../main";
import { useState } from "react";
import { Modal, notification } from "antd";

const ColorPage = () => {
  const { data } = useQuery({
    queryKey: ["color"],
    queryFn: getColor,
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const deleteData = useMutation({
    mutationFn: deleteColor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["color"] });
      notification.success({
        message: "Color Deleted",
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
  const [openAdd, setOpenAdd] = useState(false);
  const [name, setName] = useState("");

  const addData = useMutation({
    mutationFn: addColor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["color"] });
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

  const editData = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      editColor(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["color"] });
      setOpenEdit(false);
      notification.success({
        message: "Color Updated",
        description: "The color has been successfully updated.",
        placement: "topRight",
      });
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to update the color.",
        placement: "topRight",
      });
    },
  });
  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Color List</h1>
      <div className="mb-6">
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Add Color
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((color: any) => (
          <div
            key={color.id}
            className="flex flex-col items-center p-4 rounded-2xl shadow-lg hover:shadow-2xl transition bg-[#1f1f2e]"
          >
            <div
              className="w-20 h-20 rounded-full mb-3 border border-gray-500"
              style={{
                backgroundColor: color.hexCode || color.colorName || "#ccc",
              }}
            ></div>

            <h2 className="text-white font-semibold mb-3">{color.colorName}</h2>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setSelectedColor(color);
                  setEditName(color.colorName);
                  setOpenEdit(true);
                }}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-2 rounded-xl hover:scale-105 transition font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => deleteData.mutate(color.id)}
                className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 rounded-xl hover:scale-105 transition font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        footer={null}
        className="dark-modal rounded-2xl overflow-hidden"
        title={
          <h2 className="text-white text-xl bg-[#1f1f2e] p-5 rounded-2xl font-bold">
            Add Color
          </h2>
        }
      >
        <div className="flex flex-col gap-4 p-6 bg-[#1f1f2e] rounded-2xl">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Color name"
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
              onClick={() => addData.mutate(name)}
              disabled={!name || addData.isPending}
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
            Edit Color
          </h2>
        }
      >
        <div className="flex flex-col gap-4 p-6 bg-[#1f1f2e] rounded-2xl">
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Color name"
            className="bg-[#2a2a3f] text-white border border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setOpenEdit(false)}
              className="bg-gray-700 text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                editData.mutate({ id: selectedColor.id, name: editName })
              }
              disabled={!editName}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-2 rounded-xl hover:scale-105 transition font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default ColorPage;
