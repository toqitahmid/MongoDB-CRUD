// app/users/new/page.jsx  (or wherever NewUser lives)
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function createUser(formData) {
  "use server";

  const newUser = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  const req = await fetch("http://localhost:5000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  const res = await req.json();

  if (res.success) {
    revalidatePath("/users"); // ✅ Clears the cache for the users page
    redirect("/users"); // ✅ Then redirects
  }
}

const NewUser = () => {
  return (
    <div>
      <h2 className="text-center">Create a new User</h2>
      <div className="flex justify-center items-center h-[60vh]">
        <form action={createUser} className="w-full max-w-96">
          <div>
            <label>Name</label>
            <input name="name" required minLength={3} placeholder="John Doe" />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
            />
          </div>
          <button type="submit">Create User</button>
          <button type="reset">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
