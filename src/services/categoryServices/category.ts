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