export const getColor = async() => {
    try {
      const res = await fetch("https://store-api.softclub.tj/Color/get-colors");
      const data = await res.json();
      return data.data;    
    } 
    catch (error) {
        console.log(error);
    }
}