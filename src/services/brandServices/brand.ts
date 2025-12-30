export const getBrand = async() => {
    try {
      const res = await fetch("https://store-api.softclub.tj/Brand/get-brands");
      const data = await res.json();
      return data.data;
    } 
    catch (error) {
        console.log(error);
    }
}