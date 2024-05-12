import React, { useState } from "react";
import { chatState } from "../../context/ChatProvider";
import SingleChat from "./SingleChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getSender, getSenderFull } from "../config/ChatLogic";
import Modal from "../miscellaneous/Modal";
import UpdateGroupChat from "../Group/UpdateGroupChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = chatState();
  const [modal, setModal] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState();
  const [newMessage, setNewMessage] = useState();

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setModal(false);
  };

  const groupModalOpen = () => {
    setGroupModal(true);
  };

  const groupModalClose = () => {
    setGroupModal(false);
  };

  return (
    <div className="pt-6">
      <Card className="h-[37.5rem] w-[50rem]">
        <div className="flex space-x-56">
          <div className="p-6">
            <Button variant="secondary" onClick={() => setSelectedChat("")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Button>
          </div>
          <CardHeader>
            {selectedChat ? (
              <>
                {!selectedChat.isGroupChat ? (
                  <div className="flex flex-wrap space-x-64">
                    <CardTitle>
                      <div>
                        {getSender(user, selectedChat.users)}
                        <CardDescription>Card Description</CardDescription>
                      </div>
                    </CardTitle>
                    <div>
                      <Button variant="secondary" onClick={modalOpen}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap space-x-64">
                    <CardTitle>{selectedChat.chatName.toUpperCase()}</CardTitle>
                    <div>
                      <Button variant="secondary" onClick={groupModalOpen}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <CardTitle>Select a user to get started</CardTitle>
                <CardContent>hellllllllllll</CardContent>
              </>
            )}
          </CardHeader>
        </div>
        <CardContent>
          {selectedChat && (
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </CardContent>
      </Card>
      <div>
        {modal && selectedChat && (
          <Modal
            isOpen={modal}
            onClose={modalClose}
            user={getSenderFull(user, selectedChat.users).name}
            email={getSenderFull(user, selectedChat.users).email}
            imgUrl={getSenderFull(user, selectedChat.users).pic}
          />
        )}
      </div>
      <div>
        {groupModal && 
          <UpdateGroupChat 
          isOpen={groupModalOpen} 
          onClose={groupModalClose}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          />
        }
      </div>
    </div>
  );
};

export default ChatBox;
