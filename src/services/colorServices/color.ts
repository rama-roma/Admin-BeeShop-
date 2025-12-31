export const getColor = async () => {
  try {
    const res = await fetch("https://store-api.softclub.tj/Color/get-colors");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addColor = async (name: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://store-api.softclub.tj/Color/add-color?ColorName=${name}`,
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

export const deleteColor = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://store-api.softclub.tj/Color/delete-color?id=${id}`,
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


export const editColor = async (id: number, name: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://store-api.softclub.tj/Color/update-color?Id=${id}&ColorName=${encodeURIComponent(name)}`,
      {
        method: "PUT", 
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
