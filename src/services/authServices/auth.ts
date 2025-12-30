export const loginUser = async (body: { userName: string; password: string }) => {
  const res = await fetch("https://store-api.softclub.tj/Account/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = await res.json();

  if (result.statusCode !== 200 || !result.data) {
    throw new Error(result.errors?.[0] || "Ошибка логина");
  }

  const token = result.data; 
  localStorage.setItem("token", token);
  localStorage.setItem("isAuth", "true");

  return result;
};


export const isAuth = () => {
  return localStorage.getItem("isAuth") === "true";
};
