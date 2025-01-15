import React from "react";

// @components
import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import useContextt from "../../hooks/useContext";

// @icons

export function Register() {
  const { user, signUp } = useContextt();
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log({ name, email, password });
    signUp(email, password).then((res) => {
      console.log(res);
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
              Create an account
            </Typography>

            <div>
              <label htmlFor="name">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Your Name
                </Typography>
              </label>
              <Input
                id="name"
                color="gray"
                size="lg"
                type="text"
                name="name"
                placeholder="Enter your name"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>

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
              fullWidth
              type="submit"
              className="bg-primary-color hover:text-white"
            >
              Register
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;
