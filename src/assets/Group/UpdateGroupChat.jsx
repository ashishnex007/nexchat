import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { chatState } from "../../context/ChatProvider";
import UserBadge from "../User/UserBadge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loading2 } from "../miscellaneous/Loading2";
import UserList from "../User/UserList";
import axios from "axios";

const UpdateGroupChat = ({ isOpen, onClose, children,fetchAgain,setFetchAgain, ...props }) => {
  const { selectedChat, setSelectedChat, user } = chatState();
  const [groupChatName, setgroupChatName] = useState(selectedChat.chatName);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      alert("User already there in group");
      return;
    }
    if (selectedChat.groupAdmin._id === user._id) {
      alert("only admins can add");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.put(
        `http://localhost:3000/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/user?search=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (user1) => {
    // if ((selectedChat.groupAdmin._id !== user._id) && (user1._id !== user._id) ) {
    //   alert("only admin can remove");
    //   return;
    // }
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      );
      user1._id === user._id ? setSelectedChat(null) : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      );
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.error(error);
    }
    setgroupChatName("");
  };

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
          <CardTitle>{selectedChat.chatName}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Members</CardDescription>
          <div className="flex-wrap space-x-2 py-2 space-y-2">
            {selectedChat.users.map((u) => (
              <UserBadge
                key={u._id}
                user={u}
                admin={selectedChat.groupAdmin}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </div>
          <div className="flex justify-center py-2 space-x-4">
            <div className="py-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      class="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Rename Group</DialogTitle>
                    <DialogDescription>
                      Change your group name
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">New Name</Label>
                      <Input
                        className="col-span-3"
                        value={groupChatName}
                        onChange={(e) => setgroupChatName(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleRename}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="py-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      class="bi bi-person-add"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                      <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add more participants in group</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="users" className="text-right">
                        Users
                      </Label>
                      <Input
                        className="col-span-2"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    {loading ? (
                      <div>
                        <Loading2 />
                      </div>
                    ) : (
                      <ScrollArea className="h-[15rem] rounded-md border">
                        {searchResult?.map((user) => (
                          <UserList
                            key={user._id}
                            user={user}
                            handleFunction={() => handleAddUser(user)}
                          />
                        ))}
                      </ScrollArea>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="py-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" style={{ color: "red" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      class="bi bi-box-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                      />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Leave Group?</DialogTitle>
                    <DialogDescription>
                      Do you really want to leave this group
                    </DialogDescription>
                    <div className="flex pt-4 space-x-10">
                      <Button
                        variant="outline"
                        style={{ color: "red" }}
                        onClick={()=>handleRemove(user)}
                      >
                        Yes
                      </Button>
                      <Button variant="outline" onClick={()=>{return;}}>No</Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateGroupChat;
