"use client";

import Link from "next/link";
import {
  FaHome,
  FaUsers,
  FaUser,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {

    return (

        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh",
            }}
        >

            <h4 className="mb-4">

                Dashboard

            </h4>

            <ul className="list-unstyled">

                <li className="mb-3">
                    <Link href="/dashboard" className="text-white text-decoration-none">
                        <FaHome className="me-2" />
                        Dashboard
                    </Link>
                </li>

                <li className="mb-3">
                    <Link href="/dashboard/users" className="text-white text-decoration-none">
                        <FaUsers className="me-2" />
                        Users
                    </Link>
                </li>

                <li className="mb-3">
                    <Link href="/dashboard/profile" className="text-white text-decoration-none">
                        <FaUser className="me-2" />
                        Profile
                    </Link>
                </li>

                <li className="mb-3">
                    <Link href="/dashboard/settings" className="text-white text-decoration-none">
                        <FaCog className="me-2" />
                        Settings
                    </Link>
                </li>

            </ul>

        </div>

    );

}