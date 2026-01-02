export const getCategory = async() => {
    try {
      const res = await fetch("https://store-api.softclub.tj/Category/get-categories");
      const data = await res.json();
      return data.data;    
    } 
    catch (error) {
        console.log(error);
    }
}

export const deleteCategory = async (id: number) => {
  try {
    const token = localStorage.getItem("token"); 
    const res = await fetch(
      `https://store-api.softclub.tj/Category/delete-category?id=${id}`,
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

export const addCategory = async (formData: FormData) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("https://store-api.softclub.tj/Category/add-category", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: formData, 
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const editCategory = async (formData: FormData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://store-api.softclub.tj/Category/update-category",
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
  } catch (error) {
    console.log(error);
  }
};
