export const getBrand = async () => {
  try {
    const res = await fetch("https://store-api.softclub.tj/Brand/get-brands");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addBrand = async (name: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://store-api.softclub.tj/Brand/add-brand?BrandName=${name}`,
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

export const editBrand = async ({ id, name }: { id: number; name: string }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://store-api.softclub.tj/Brand/update-brand?Id=${id}&BrandName=${encodeURIComponent(
        name
      )}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteBrand = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://store-api.softclub.tj/Brand/delete-brand?id=${id}`,
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
