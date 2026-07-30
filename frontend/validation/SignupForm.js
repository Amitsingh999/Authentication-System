import * as yup from "yup";

export const signupSchema = yup.object({

    fullName: yup
        .string()
        .required("Full Name is required")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters"),

    email: yup
        .string()
        .trim()
        .required("Email is required")
        .matches(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter a valid email address"
        ),

    mobile: yup
        .string()
        .required("Mobile number is required")
        .matches(/^[6-9]\d{9}$/, "Invalid mobile number"),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Minimum 8 characters")
        .matches(/[A-Z]/, "At least one uppercase letter")
        .matches(/[a-z]/, "At least one lowercase letter")
        .matches(/[0-9]/, "At least one number")
        .matches(
            /[@$!%*?&#]/,
            "At least one special character"
        ),

    confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf(
            [yup.ref("password")],
            "Passwords do not match"
        ),

    terms: yup
        .boolean()
        .oneOf([true], "Please accept Terms & Conditions")

});