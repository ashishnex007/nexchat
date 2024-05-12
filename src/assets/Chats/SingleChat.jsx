import React, { useState, useEffect } from "react";
import axios from "axios";
import { chatState } from "../../context/ChatProvider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import './style.css';
import ScrollableChat from "./ScrollableChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = chatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState();
  const [newMessage, setNewMessage] = useState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/message/${selectedChat._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      );
      setMessages(data);
      setLoading(false);
      console.log(messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (event) => {
    if (newMessage) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `http://localhost:3000/api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.authToken}`,
            },
          }
        );
        console.log(data);
        setNewMessage("");
        setMessages([...messages, data]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing inidactor logic
  };

  return (
    <>
      {selectedChat ? (
        <div>
          <Card className="h-[30rem]">
            {loading ?
            <div>loading...</div> :
            (<div className="messages">
                <ScrollableChat messages={messages} />
            </div>)
          }
            <div className="flex absolute bottom-14">
              <Input
                type="text"
                placeholder="Enter a message..."
                style={{ width: "44rem" }}
                onChange={typingHandler}
                value={newMessage}
              />
              <Button onClick={sendMessage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          select a user and start chatting
        </div>
      )}
    </>
  );
};

export default SingleChat;
