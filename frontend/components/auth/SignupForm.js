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

export default function SignupForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
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


    const onSubmit = async (data) => {

        try {

            const user = await signup(data);


            console.log(user);


            toast.success("Account Created Successfully");


            reset();


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
                                    <Form.Label>Full Name</Form.Label>

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
                                    <Form.Label>Email Address</Form.Label>

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
                                    <Form.Label>Mobile Number</Form.Label>

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
                                    <Form.Label>Password</Form.Label>

                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        {...register("password")}
                                        isInvalid={!!errors.password}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.password?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>

                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        {...register("confirmPassword")}
                                        isInvalid={!!errors.confirmPassword}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword?.message}
                                    </Form.Control.Feedback>
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
                                    variant="primary"
                                    className="w-100 py-2 rounded-3"
                                >
                                    Create Account
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