import { createUser, deleteUser } from "../lib/actions";
import { getUsers } from "../lib/data";
import UsersTable from "../usersTable/page";
import AddUser from "../components/AddUser";


const Users = async() => {
    const users = await getUsers();
    return (
        <div className = 'space-y-20 mt-5'>
            <h1 className="text-center">{users.length}</h1>
            <div className="text-center">
            <AddUser createUserAction = {createUser}></AddUser>
            </div>
            <UsersTable users={users} deleteUserAction = {deleteUser}></UsersTable>
        </div>
    );
};

export default Users;