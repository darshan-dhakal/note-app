import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    // remove token
    localStorage.removeItem("token");

    // redirect to login page
    navigate("/", { replace: true });
  };

  return (
    <Button color="failure" onClick={logout}>
      Logout
    </Button>
  );
}
