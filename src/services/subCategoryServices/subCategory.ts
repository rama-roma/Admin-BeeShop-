export const getSubCategory = async () => {
  try {
    const res = await fetch(
      "https://store-api.softclub.tj/SubCategory/get-sub-category"
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubCategory = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://store-api.softclub.tj/SubCategory/delete-sub-category?id=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addSubCategory = async ({
  categoryId,
  name,
}: {
  categoryId: number;
  name: string;
}) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://store-api.softclub.tj/SubCategory/add-sub-category?CategoryId=${categoryId}&SubCategoryName=${encodeURIComponent(
        name
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editSubCategory = async ({
  id,
  categoryId,
  name,
}: {
  id: number;
  categoryId: number;
  name: string;
}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `https://store-api.softclub.tj/SubCategory/update-sub-category?Id=${id}&CategoryId=${categoryId}&SubCategoryName=${encodeURIComponent(
      name
    )}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = res.json();
  return data;
};
