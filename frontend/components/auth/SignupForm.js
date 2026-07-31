"use client";

import Image from "next/image";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { signupSchema } from "@/validation/SignupForm";
import { signup } from "@/services/authService";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            fullName: "",
            email: "",
            mobile: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const router = useRouter();

    const onSubmit = async (data) => {

        try {

            const user = await signup(data);


            console.log(user);


            toast.success("Account Created Successfully. Please verify your email.");


            reset();

            setTimeout(() => {
                router.replace("/signin");
            }, 2000);

        } catch (error) {

            toast.error(error.message);

        }

    };
    return (

        <Container fluid className="min-vh-100 bg-light">
            <Row className="min-vh-100">

                {/* Left Section */}

                <Col
                    lg={6}
                    className="d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5"
                    style={{
                        background: "linear-gradient(135deg, #0d6efd, #6610f2)",
                    }}
                >
                    <Image
                        src="/images/signup.png"
                        alt="Authentication"
                        width={350}
                        height={350}
                        className="img-fluid mb-4"
                    />

                    <h2 className="fw-bold mb-3">
                        Authentication System
                    </h2>

                    <p className="text-center fs-5">
                        Build secure applications using
                        <br />
                        Next.js + FastAPI + JWT Authentication.
                    </p>

                    <div className="mt-4">
                        <p>✔ Secure Login</p>
                        <p>✔ JWT Authentication</p>
                        <p>✔ Protected Routes</p>
                        <p>✔ Industry Standard Architecture</p>
                    </div>
                </Col>

                {/* Right Section */}

                <Col
                    lg={6}
                    className="d-flex justify-content-center align-items-center p-4"
                >
                    <Card
                        className="shadow-lg border-0 rounded-4"
                        style={{ width: "100%", maxWidth: "550px" }}
                    >
                        <Card.Body className="p-5">

                            <div className="text-center mb-4">
                                <h2 className="fw-bold">
                                    Create Account
                                </h2>

                                <p className="text-muted">
                                    Welcome! Please fill in your details.
                                </p>
                            </div>

                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Full Name <span className="text-danger">*</span>
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="Enter full name"
                                        {...register("fullName")}
                                        isInvalid={!!errors.fullName}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>

                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        {...register("email")}
                                        isInvalid={!!errors.email}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="Enter mobile number"
                                        {...register("mobile")}
                                        isInvalid={!!errors.mobile}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.mobile?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password <span className="text-danger">*</span></Form.Label>

                                    <div className="position-relative">

                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                            {...register("password")}
                                            isInvalid={!!errors.password}
                                        />

                                        <span
                                            className="position-absolute top-50 end-0 translate-middle-y pe-3"
                                            style={{ cursor: "pointer", zIndex: 10 }}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </span>

                                        <Form.Control.Feedback type="invalid">
                                            {errors.password?.message}
                                        </Form.Control.Feedback>

                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>

                                    <div className="position-relative">

                                        <Form.Control
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm password"
                                            {...register("confirmPassword")}
                                            isInvalid={!!errors.confirmPassword}
                                        />

                                        <span
                                            className="position-absolute top-50 end-0 translate-middle-y pe-3"
                                            style={{ cursor: "pointer", zIndex: 10 }}
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                        >
                                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                        </span>

                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword?.message}
                                        </Form.Control.Feedback>

                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Check
                                        type="checkbox"
                                        label="I agree to the Terms & Conditions"
                                        {...register("terms")}
                                    />

                                    <small className="text-danger">
                                        {errors.terms?.message}
                                    </small>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-100 py-2 rounded-3"
                                >
                                    {isSubmitting ? "Creating Account..." : "Create Account"}
                                </Button>

                                <div className="text-center mt-4">
                                    Already have an account?{" "}
                                    <Link
                                        href="/signin"
                                        className="text-decoration-none fw-semibold"
                                    >
                                        Sign In
                                    </Link>
                                </div>

                            </Form>

                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>

    );

}