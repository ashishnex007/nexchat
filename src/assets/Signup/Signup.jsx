import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { chatState } from "../../context/ChatProvider";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [pic, setPic] = useState();

  const navigate = useNavigate();
  const { setUser } = chatState();

  const postPic = async(pic) =>{
    if(pic === undefined){
      alert("insert a valid pic")
      return;
    }
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/jpg"
    ) {
      try {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "nexchat");
        data.append("cloud_name", "djhkbgnea");
  
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/djhkbgnea/image/upload",
          data
        );
        const picUrl = response.data.url.toString();
        console.log("pic url is "+picUrl);
        setPic(picUrl);
        const config = response.data;
      } catch (error) {
        console.error(error);
        alert("Error uploading image");
      }
    } else {
      alert("Add a picture");
    }
  }

  const handleLogin = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/login",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email, password}),
    });
    const json = await response.json();
    
    if(json.success){
        const data = {name,email,password,pic:json.pic,authToken:json.authToken};
        console.log(data);
        setUser(data);
        localStorage.setItem('token',JSON.stringify(data));
        navigate("/chat");
      }else{
          alert("invalid credentials");
      }
  }

  const handleSignup = async(e)=>{
    e.preventDefault();
    console.log(name,email,password,pic);
    const response = await fetch("http://localhost:3000/api/register",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name,email,password,pic})
    });
    const data = {name,email,password,pic};
    const json = await response.json();
      if(json.success){
          localStorage.setItem('token',JSON.stringify(data));
          navigate("/chat");
      }else{
          alert("invalid credentials");
      }
  }

  return (
    <div>
    <h1 className="text-2xl">NexChat</h1>
    <Tabs defaultValue="account" className="w-[400px] container my-7">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="password">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardDescription>
              Login and continue with your chats.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin} >Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardDescription>
              Get started with NexChat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Your good name</Label>
              <Input id="name" type="text" onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="text" onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input id="password" type="password" onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Confirm Password</Label>
              <Input id="password" type="password" onChange={(e)=>setCpassword(e.target.value)}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" accept="image/jpeg, image/png, image/jpg" onChange={(e)=>postPic(e.target.files[0])} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignup} >Signup</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default Signup;
