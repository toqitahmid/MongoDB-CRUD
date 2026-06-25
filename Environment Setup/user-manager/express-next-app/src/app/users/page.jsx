export const dynamic = "force-dynamic";

const usersData = async () => {
  const res = await fetch("http://localhost:5000");
  return res.json();
};

const UsersPage = async () => {
  const usersPromise = await usersData();
  return (
    <>
      <div>
        <h2 className="text-center text-3xl">{usersPromise.length}</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 my-10 w-10/12 mx-auto">
        {usersPromise.map((user) => (
          <div className="border-2 p-3 text-center" key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersPage;
