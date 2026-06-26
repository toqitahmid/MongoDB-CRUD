'use server';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createUser = async(formData) => {

    const newUser = Object.fromEntries(formData.entries());
    const res = await fetch(`http://localhost:5000/users`,{
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
    const data = await res.json();

    if(data.insertedId){
        revalidatePath('/users');
    }
    return data;
}

export const updateUser = async(userId,formData) =>{
    const updatedUser = Object.fromEntries(formData.entries());
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const data = await res.json();
    if(data.modifiedCount > 0){
        revalidatePath('/users');
        redirect('/users')
    }
}

export const deleteUser = async(userId) => {
    const res = await fetch(
      `http://localhost:5000/users/${userId}`,
    {method: 'DELETE'}
    );
    const data = await res.json();
    console.log(data);
    if(data.deletedCount > 0){
        revalidatePath('/users');
    }
    return data;
}