export const getProduct = async () => {
  try {
    const res = await fetch(
      "https://store-api.softclub.tj/Product/get-products"
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getByIdProduct = async (id: number) => {
  try {
    const res = await fetch(
      `https://store-api.softclub.tj/Product/get-product-by-id?id=${id}`
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://store-api.softclub.tj/Product/delete-product?id=${id}`,
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

export const addProduct = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  const res = await fetch("https://store-api.softclub.tj/Product/add-product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

export const editProduct = async (payload: any) => {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });
  const url = `https://store-api.softclub.tj/Product/update-product?${params.toString()}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const addImageToProduct = async (
  productId: number,
  images: any
) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("ProductId", String(productId));

  formData.append("Files", images); 
  console.log(images);

  const res = await fetch(
    "https://store-api.softclub.tj/Product/add-image-to-product",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return res.json();
};



export const deleteProductImage = async (imageId: number) => {
  const res = await fetch(
    `https://store-api.softclub.tj/Product/delete-image-from-product?imageId=${imageId}`,
    {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await res.json();
  return data.data;
};
