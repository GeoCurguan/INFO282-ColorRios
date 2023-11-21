import Link from "next/link";

const NavViews = ({ isActive, token }) => {
    const decodeToken = (token) => {
        if (!token) {
            return null;
        }

        const [, payloadBase64] = token.split(".");

        if (!payloadBase64) {
            throw new Error("Invalid token format");
        }

        const decodedPayload = Buffer.from(payloadBase64, "base64").toString(
            "utf-8"
        );

        try {
            return JSON.parse(decodedPayload);
        } catch (error) {
            throw new Error("Error parsing token payload");
        }
    };

    const decodedToken = decodeToken(token);

    const isAdmin = decodedToken?.roles.includes("ROLE_ADMIN");

    const activeClassLight = "bg-[#D9D9D9] text-[#434343] rounded-full";

    const adminLinks = [
        {
            href: "/",
            label: "Galería",
        },
        {
            href: "/3d",
            label: "Puntos 3D",
        },
        {
            href: "/admin",
            label: "Dashboard",
        },
    ];

    const userLinks = [
        {
            href: "/",
            label: "Galería",
        },
        {
            href: "/3d",
            label: "Puntos 3D",
        },
    ];

    const links = isAdmin ? adminLinks : userLinks;

    return (
        <ul className="py-4 px-8 gap-8 w-1/2 flex justify-evenly items-center text-[#D9D9D9]">
            {links.map((link) => (
                <li
                    key={link.href}
                    className={`px-4 py-2 ${
                        isActive(link.href) && activeClassLight
                    }`}
                >
                    <Link href={link.href}>{link.label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default NavViews;
