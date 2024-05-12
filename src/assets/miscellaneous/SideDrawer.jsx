import React, { useState } from "react";
import axios from "axios";
import { NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatState } from "../../context/ChatProvider";
import Modal from "./Modal";
import Logout from "./Logout";
import { Loading } from "./Loading";
import UserList from "../User/UserList";

const SideDrawer = (props) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, setSelectedChat, chats, setChats } = chatState();

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setModal(false);
  };

  const logoutModalOpen = () => {
    setLogoutModal(true);
  };

  const logoutModalClose = () => {
    setLogoutModal(false);
  };

  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:3000/api/chat`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      alert("cant be empty");
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
      console.error("Error fetching users");
    }
  };

  return (
    <div>
      <NavigationMenu className=" items-center border-b border-gray-300">
        <div className="flex justify-between space-x-96">
          <div className="flex items-center">
            {" "}
            {/* Left side content */}
            <h1 className="text-xl ml-auto">NexChat</h1>{" "}
            {/* Heading on the left side */}
          </div>
          <div className="flex items-center">
            {" "}
            {/* Right side content */}
            <div className="mr-2 ml-96"> {/* Margin for spacing */}</div>
            <Sheet>
              <SheetTrigger asChild>
                <Input type="text" placeholder="Search users" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Search for Users</SheetTitle>
                  <SheetDescription>
                    Find your friends on NexChat
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      className="col-span-3"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button onClick={handleSearch}>Search</Button>
                  </SheetClose>
                </SheetFooter>
                <h1 className="py-6">Users based on your search</h1>
                <div>
                  {loading ? (
                    <Loading />
                  ) : (
                    <ScrollArea className="h-[28rem]  rounded-md border">
                      {searchResult?.map((userx) => (
                        <UserList
                          key={userx._id}
                          user={userx}
                          handleFunction={() => accessChat(userx._id)}
                        />
                      ))}
                    </ScrollArea>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-bell-fill cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
              </svg>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="ml-2 cursor-pointer">
                    <AvatarImage src={user.pic} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={modalOpen}>
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutModalOpen}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </NavigationMenu>
      <div>
        <Modal
          isOpen={modal}
          onClose={modalClose}
          user={user.name}
          email={user.email}
          imgUrl={user.pic}
        />
      </div>
      <div>
        <Logout isOpen={logoutModal} onClose={logoutModalClose} />
      </div>
    </div>
  );
};

export default SideDrawer;
