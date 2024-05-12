import React from "react";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"

const Logout = ({ isOpen, onClose, children }) => {
    const stopPropagation = (e) => {
        e.stopPropagation();
      };
  if (!isOpen) return null;

  const history = createBrowserHistory();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{width:"18rem"}} onClick={stopPropagation}>
      <CardHeader>
        <CardTitle style={{color:"red"}}>Logout?</CardTitle>
        <CardDescription>logging out will clear your session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-10">
            <Button variant="destructive" onClick={handleLogout}>Logout</Button>
            <Button variant="secondary" onClick={onClose}>Stay</Button>
        </div>
      </CardContent>
      </Card>
    </div>
  );
};

export default Logout;