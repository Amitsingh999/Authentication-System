"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/constants/storageKeys";

export default function AuthGuard({ children }) {

    const router = useRouter();

    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);

        if (isLoggedIn !== "true") {
            router.replace("/signin");
            return;
        }

        setChecking(false);
    }, []);

    if (checking) {
        return null;
    }

    return children;

}