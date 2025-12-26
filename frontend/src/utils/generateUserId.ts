
export const generateUserId = (): string => {
  const existingId = sessionStorage.getItem("user_id");
  if (existingId) {
    return existingId;
  }

  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const newUserId = `Guest${randomNumber}`;

  sessionStorage.setItem("user_id", newUserId);

  return newUserId;
};

export const getUserId = (): string => {
  return generateUserId();
};

export const clearUserId = (): void => {
  sessionStorage.removeItem("user_id");
};
