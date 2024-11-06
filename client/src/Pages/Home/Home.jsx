import useUserStore from "@/store/useUserStore";

function Home() {
    const {user} = useUserStore();
    console.log(user);
    
    return(
        <div>{user.email}</div>
    )
}

export default Home;