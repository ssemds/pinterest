export const getTokens = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  if (!tokens) {
    throw new Error("Invalid credentials, please log in again");
  }
  const Authorization = `Bearer ${tokens.access}`;

  const config = {
    headers: {
      Authorization,
    },
  };
  return config;
};
