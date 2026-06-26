export const getUsers = async() => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    return data;
}

export const getUserId = async (userId) => {
  const res = await fetch(`http://localhost:5000/users/${userId}`);
  if (!res.ok) {
    console.error("Fetch failed:", res.status, res.statusText);
    return null;
  }
  const data = await res.json();
  return data;
};