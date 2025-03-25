export const getCookie = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const cookies = document.cookie.split(";");
  const jwtCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("jwt_token=")
  );

  if (!jwtCookie) {
    return null;
  }

  return jwtCookie.split("=")[1];
};

export const getAuthHeaders = (jwtToken: string) => {
  return {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };
};
