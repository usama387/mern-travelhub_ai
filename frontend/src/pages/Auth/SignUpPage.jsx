import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
