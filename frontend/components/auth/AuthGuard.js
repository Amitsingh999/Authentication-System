"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }) {

    const router = useRouter();

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    useEffect(() => {

        if (!loading && !isAuthenticated) {

            router.replace("/signin");

        }

    }, [loading, isAuthenticated, router]);

    if (loading) {

        return null;


    }

    if (!isAuthenticated) {

        return null;

    }

    return children;

}