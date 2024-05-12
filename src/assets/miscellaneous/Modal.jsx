import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Modal = ({ isOpen, onClose, children, ...props }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  if (!isOpen) return null;

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
        zIndex: "1",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: "40rem" }} onClick={stopPropagation}>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <img
              src={`${props.imgUrl}`}
              style={{ width: "5rem", borderRadius: "50%" }}
            />
            <p>{props.user}</p>
            <p>{props.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Modal;
