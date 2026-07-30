import * as yup from "yup";

export const forgotPasswordSchema = yup.object({

    email: yup
        .string()
        .trim()
        .required("Email is required")
        .matches(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter a valid email address"
        ),

});