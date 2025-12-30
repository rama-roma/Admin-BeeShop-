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
  const res = await fetch(
    `https://store-api.softclub.tj/Product/update-product?id=${id}`,
    {
      method: "PUT", 
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  const data = await res.json();
  return data;
};
