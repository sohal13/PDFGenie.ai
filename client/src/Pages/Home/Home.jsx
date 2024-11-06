import useUserStore from "@/store/useUserStore";

function Home() {
    const {user} = useUserStore();
    
    return(
        <div>{user?.email}</div>
    )
}

export default Home;