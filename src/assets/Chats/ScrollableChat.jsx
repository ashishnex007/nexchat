import React from "react";
import { chatState } from "../../context/ChatProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from "../config/ChatLogic"

const ScrollableChat = ({ messages }) => {
  const { user } = chatState();
  return (
    <ScrollArea className="h-[28rem]  rounded-md border">
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex", margin:"0.2rem" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar>
                      <AvatarImage src={m.sender.pic} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{m.sender.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <span style={{
              backgroundColor: `${
                m.sender._id === user._id ? "#BEE3F8" : "#02bd5c"
              }`,
              borderRadius: '1rem',
              padding:"0.5rem 1rem",
              maxWidth: "25rem",
              wordWrap: 'break-word', // Break words when needed
              overflowWrap: 'break-word',
              textAlign:'left',
              marginLeft: isSameSenderMargin(messages, m, i, user._id),
              marginTop: isSameUser(messages, m, i, user._id) ? 0 : 10
            }}>
              {m.content}
            </span>
          </div>
        ))}
    </ScrollArea>
  );
};

export default ScrollableChat;
