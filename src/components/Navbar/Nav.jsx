import { useRouter } from "next/router";
import NavViews from "./NavViews";
import NavAccount from "./NavAccount";

const Nav = () => {
    const router = useRouter();
    const isActive = (pathname) => router.pathname === pathname;
    //Obtenemos el token del localStorage
    const token = localStorage.getItem("token");

    return (
        <header
            className="bg-[#434343] text-2xl"
            style={{
                background:
                    "linear-gradient(145deg, #434343 49.5%, #D9D9D9 50%)",
            }}
        >
            <nav className="flex justify-between items-center">
                {/* Section #1: Color views: Home, 3D */}
                <NavViews isActive={isActive} token={token} />
                {/* Section #2: Account content: Login, Social */}
                <NavAccount isActive={isActive} />
            </nav>
        </header>
    );
};

export default Nav;
