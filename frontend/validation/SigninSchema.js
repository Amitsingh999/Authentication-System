import * as yup from "yup";

export const signinSchema = yup.object({

    email: yup
        .string()
        .trim()
        .required("Email is required")
        .matches(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter a valid email address"
        ),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")

});