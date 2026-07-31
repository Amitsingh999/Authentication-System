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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/validation/forgotPasswordSchema";
import { forgotPassword } from "@/services/authService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        mode: "onBlur",
    });

    const router = useRouter();

    const onSubmit = async (data) => {

        try {

            await forgotPassword(data.email);

            toast.success("Check your inbox for the password reset link.");
            reset();

            setTimeout(() => {
                router.replace("/signin");
            }, 2000);

        } catch (error) {

            console.error(error);

            switch (error.code) {

                case "auth/invalid-email":
                    toast.error("Please enter a valid email address.");
                    break;

                case "auth/network-request-failed":
                    toast.error("Please check your internet connection.");
                    break;

                default:
                    toast.error(error.message);
            }

        }

    };

    return (

        <Container fluid className="min-vh-100 bg-light">

            <Row className="min-vh-100">

                {/* Left Side */}

                <Col
                    lg={6}
                    className="d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5"
                    style={{
                        background:
                            "linear-gradient(135deg,#0d6efd,#6610f2)",
                    }}
                >

                    <Image
                        src="/images/forgot-password.png"
                        alt="Forgot Password"
                        width={350}
                        height={350}
                        className="img-fluid mb-4"
                    />

                    <h2 className="fw-bold">
                        Forgot Password?
                    </h2>

                    <p className="text-center mt-3">
                        Enter your registered email address and we'll send you a password reset link.
                    </p>

                </Col>

                {/* Right Side */}

                <Col
                    lg={6}
                    className="d-flex justify-content-center align-items-center p-4"
                >

                    <Card
                        className="shadow-lg border-0 rounded-4"
                        style={{
                            maxWidth: "500px",
                            width: "100%",
                        }}
                    >

                        <Card.Body className="p-5">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">
                                    Forgot Password
                                </h2>

                                <p className="text-muted">
                                    Enter your email to receive a reset link.
                                </p>

                            </div>

                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <Form.Group className="mb-4">

                                    <Form.Label>
                                        Email Address <span className="text-danger">*</span>
                                    </Form.Label>

                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email")}
                                        isInvalid={!!errors.email}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Button
                                    type="submit"
                                    className="w-100"
                                    size="lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Reset Link"}
                                </Button>

                                <div className="text-center mt-4">

                                    <Link
                                        href="/signin"
                                        className="text-decoration-none"
                                    >
                                        ← Back to Sign In
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