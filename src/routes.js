import SignIn from "./pages/SignIn";

const routes = [
  {
    name: "Sign In",
    path: "/sign-in",
    layout: "/auth",
    element: <SignIn />,
  },
];

export default routes;
