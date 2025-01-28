import React from "react";

// @components
import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useContextt from "../../hooks/useContext";
// @icons
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function CryptoLogin() {
  const { user, signIn, signInWithGoogle } = useContextt();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password).then((res) => {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle().then((res) => {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      const userInfo = {
        email: res.user.email,
        name: res.user.displayName,
        photoURL: res.user.photoURL,
      };
      axiosPublic.post("/addUser", userInfo).then((res) => {
        navigate("/");
      });
    });
  };
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-88px)] flex items-center justify-center">
      <Card
        shadow={false}
        className="md:px-24 md:py-14 py-8 border border-gray-300 container mx-auto max-w-3xl flex flex-col gap-4 items-center justify-center"
      >
        {/* <CardHeader shadow={false} floated={false} className="text-center">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:text-4xl"
        >
          Web3 Login Simplified
        </Typography>
        <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
          Enjoy quick and secure access to your accounts on various Web3
          platforms.
        </Typography>
      </CardHeader> */}
        <CardBody>
          <form
            action="#"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:mt-12"
          >
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 !text-3xl lg:text-4xl"
            >
              Login to your account
            </Typography>

            <div>
              <label htmlFor="email">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Your Email
                </Typography>
              </label>
              <Input
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                placeholder="name@mail.com"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <label htmlFor="password">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Password
                </Typography>
              </label>
              <Input
                id="password"
                color="gray"
                size="lg"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Button
              size="lg"
              color="gray"
              className="bg-primary-color hover:text-white"
              fullWidth
              type="submit"
            >
              Login
            </Button>

            <Typography
              variant="small"
              color="blue-gray"
              className="text-center"
            >
              Don't have an account?{" "}
              <a
                href="signup"
                className="text-primary text-primary-color hover:underline font-bold"
              >
                Sign Up
              </a>
            </Typography>
            <Button
              variant="outlined"
              size="lg"
              className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
              fullWidth
              type="button"
              onClick={handleGoogleSignIn}
            >
              <img
                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                alt="google"
                className="h-6 w-6"
              />{" "}
              sign in with google
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default CryptoLogin;
