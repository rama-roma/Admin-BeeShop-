export const getProduct = async() => {
    try {
      const res = await fetch("https://store-api.softclub.tj/Product/get-products");
      const data = await res.json();
      return data.data;    
    } 
    catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (id: number) => {
  try {
    const token = localStorage.getItem("token"); 
    const res = await fetch(
      `https://store-api.softclub.tj/Product/delete-product?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data.data;
  } 
  catch (error) {
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



export const editProduct = async (id: number, formData: FormData) => {
  const token = localStorage.getItem("token");

  const params = new URLSearchParams({
    Id: String(id),
    BrandId: String(formData.get("BrandId")),
    ColorId: String(formData.get("ColorId")),
    ProductName: String(formData.get("ProductName")),
    Description: String(formData.get("Description")),
    Quantity: String(formData.get("Quantity")),
    Code: String(formData.get("Code")),
    Price: String(formData.get("Price")),
    HasDiscount: String(formData.get("HasDiscount")),
    SubCategoryId: String(formData.get("SubCategoryId")),
  });

  return fetch(
    `https://store-api.softclub.tj/Product/update-product?${params.toString()}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(res => res.json());
};
