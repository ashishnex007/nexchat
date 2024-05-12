import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          NexChat
        </h2>
        <div className="flex space-x-8">
          <h1>Features</h1>
          <h1>Chats</h1>
          <h1>Privacy</h1>
          <h1>About</h1>
        </div>
        <div>
          <Button onClick={() => navigate("/signup")}>Login</Button>
        </div>
      </div>
      <div className="flex justify-center py-60">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to NexChat
        </h1>
      </div>
    </div>
  );
};

export default Home;
