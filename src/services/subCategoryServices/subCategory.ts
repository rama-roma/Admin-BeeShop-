export const getSubCategory = async() => {
    try {
      const res = await fetch("https://store-api.softclub.tj/SubCategory/get-sub-category");
      const data = await res.json();
      return data.data;    
    } 
    catch (error) {
        console.log(error);
    }
}