import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthGuard from "@/components/auth/AuthGuard";

export default function Layout({ children }) {

    return (

        <AuthGuard>

            <DashboardLayout>

                {children}

            </DashboardLayout>

        </AuthGuard>

    );

}