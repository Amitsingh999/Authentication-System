"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "@/validation/SigninSchema";
import { signin } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SigninForm() {

    const router = useRouter();

    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: yupResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {

        try {

            const user = await signin(data);

            login(user);

            toast.success("Login Successful");
            router.replace("/dashboard");
        }
        catch (error) {

            toast.error(error.message);

        }

    }
    return (

        <Container fluid className="min-vh-100 bg-light">

            <Row className="min-vh-100">

                {/* Left */}

                <Col
                    lg={6}
                    className="d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5"
                    style={{
                        background:
                            "linear-gradient(135deg,#0d6efd,#6610f2)",
                    }}
                >

                    <Image
                        src="/images/signin.png"
                        alt="Authentication"
                        width={350}
                        height={350}
                        className="img-fluid mb-4"
                    />

                    <h2 className="fw-bold">
                        Welcome Back
                    </h2>

                    <p className="text-center mt-3">
                        Sign in to continue using
                        your dashboard securely.
                    </p>

                </Col>

                {/* Right */}

                <Col
                    lg={6}
                    className="d-flex justify-content-center align-items-center p-4"
                >

                    <Card
                        className="shadow-lg border-0 rounded-4"
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                        }}
                    >

                        <Card.Body className="p-5">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">

                                    Sign In

                                </h2>

                                <p className="text-muted">

                                    Login to your account

                                </p>

                            </div>

                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Email Address

                                    </Form.Label>

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

                                    <Form.Label>

                                        Password

                                    </Form.Label>

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

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <Form.Check

                                        type="checkbox"
                                        label="Remember Me"
                                        {...register("rememberMe")}

                                    />

                                    <Link
                                        href="/forgot-password"
                                        className="text-decoration-none"
                                    >

                                        Forgot Password?

                                    </Link>

                                </div>

                                <Button
                                    type="submit"
                                    className="w-100"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Signing In..." : "Sign In"}
                                </Button>

                                <div className="text-center mt-4">

                                    Don't have an account?{" "}

                                    <Link
                                        href="/signup"
                                        className="text-decoration-none fw-semibold"
                                    >

                                        Create Account

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