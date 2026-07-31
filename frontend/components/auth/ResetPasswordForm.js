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
import { toast } from "react-toastify";
import { resetPassword } from "@/services/authService";
import { resetPasswordSchema } from "@/validation/resetPasswordSchema";

export default function ResetPasswordForm() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        console.log(data);
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
                        src="/images/reset-password.png"
                        alt="Reset Password"
                        width={350}
                        height={350}
                        className="img-fluid mb-4"
                    />

                    <h2 className="fw-bold">
                        Reset Password
                    </h2>

                    <p className="text-center mt-3">
                        Create a strong new password to secure your account.
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
                                    Reset Password
                                </h2>

                                <p className="text-muted">
                                    Enter your new password below.
                                </p>

                            </div>

                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <Form.Group className="mb-4">

                                    <Form.Label>
                                        New Password <span className="text-danger">*</span>
                                    </Form.Label>

                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new password"
                                        {...register("newPassword")}
                                        isInvalid={!!errors.newPassword}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.newPassword?.message}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group className="mb-4">

                                    <Form.Label>
                                        Confirm Password <span className="text-danger">*</span>
                                    </Form.Label>

                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm new password"
                                        {...register("confirmPassword")}
                                        isInvalid={!!errors.confirmPassword}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword?.message}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Button
                                    type="submit"
                                    className="w-100"
                                    size="lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Resetting..."
                                        : "Reset Password"}
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