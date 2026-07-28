"use client";

import { useAuth } from "@/context/AuthContext";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function Header() {

    const router = useRouter();
    const { user } = useAuth();
    const { logout } = useAuth();
    const handleLogout = () => {

        logout();

        router.push("/signin");

    };

    return (

        <div
            className="d-flex justify-content-between align-items-center border-bottom p-3"
        >
            <h5>

                Welcome {user?.fullName}

            </h5>

            <Button
                variant="danger"
                onClick={handleLogout}
            >

                Logout

            </Button>

        </div>

    );

}