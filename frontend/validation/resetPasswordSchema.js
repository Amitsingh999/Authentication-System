import * as Yup from "yup";

export const resetPasswordSchema = Yup.object({

    newPassword: Yup.string()
        .required("New Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must not exceed 20 characters"),

    confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf(
            [Yup.ref("newPassword")],
            "Passwords do not match"
        ),

});