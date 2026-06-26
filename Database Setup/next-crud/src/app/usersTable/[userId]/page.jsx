import { getUserId } from '@/app/lib/data';

const UserDetailsPage = async ({params}) => {
    const {userId} = await params;
     console.log("userId from params:", userId); 
    const user = await getUserId(userId);
     console.log("user data:", user);
     if (!user) {
       return <div>User not found or server is down.</div>;
     }
    return (
        <div>
            <h1>{user.name}</h1>
        </div>
    );
};

export default UserDetailsPage;