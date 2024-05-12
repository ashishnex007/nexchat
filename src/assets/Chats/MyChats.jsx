import React, { useState, useEffect } from "react";
import axios from "axios";
import { chatState } from "../../context/ChatProvider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Loading } from "../miscellaneous/Loading";
import { getSender } from "../config/ChatLogic";
import GroupChatModal from "../miscellaneous/GroupChatModal";

const MyChats = ( { fetchAgain } ) => {
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = chatState();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/api/chat`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authToken}`,
        },
      });
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("token")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div className="pt-6" style={{ width: "25rem" }}>
      <Card style={{height:"37.5rem"}}>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-left">My Chats</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <GroupChatModal>
                    <Button variant="secondary">+</Button>
                  </GroupChatModal>
                </TooltipTrigger>
                <TooltipContent>
                  <p>New Group Chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          {chats ? (
            <ScrollArea className="h-[30rem]  rounded-md border">
              {chats?.map((chat) => (
                <Card
                  key={chat._id}
                  onClick={() => {
                    setSelectedChat(chat);
                  }}
                  style={{ cursor: "pointer", backgroundColor: selectedChat === chat ? "#e0e0e0" : "", color: selectedChat === chat ? "black": "white"}}
                  className={`p-5`}
                >
                  <p className="text-left">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </p>
                </Card>
              ))}
            </ScrollArea>
          ) : (
            <Loading />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyChats;
