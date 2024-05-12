import React from "react";
import { chatState } from "../../context/ChatProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserList = ({ user, handleFunction }) => {
  return (
    <div>
      <Card onClick={handleFunction} style={{ height: "4.65rem", cursor:"pointer" }}>
        <div className="flex">
          <div className="p-4">
            <Avatar style={{ width: "3rem", height: "3rem" }}>
              <AvatarImage src={user.pic} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="p-2">
            <h1 className="text-xl">{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserList;
