import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import axios from "axios";

const ChatContext = createContext();
const history = createBrowserHistory();

const ChatProvider = ({children}) =>{
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const userInfo = JSON.parse(localStorage.getItem("token"));
            console.log(userInfo);
            const authToken = userInfo.authToken;
            console.log(authToken);
            console.log("email is " + userInfo.email);
            const response = await axios.get(
              `http://localhost:3000/api?search=${userInfo.email}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            console.log("API response:", response);
            const data = response.data;
            console.log(data);
            const name = data[0].name;
            const pic = data[0].pic;
            const updatedUserInfo = {
                ...userInfo,
                name: name,
                pic: pic,
              };
            setUser(updatedUserInfo);
    
            if (!userInfo) {
              history.push("/signup");
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };
        fetchUserDetails();
    },[history]);

    return (
        <ChatContext.Provider value={{user, setUser, selectedChat, setSelectedChat, chats, setChats}}>
            {children}
        </ChatContext.Provider>
    );
};

export const chatState = () =>{
    return useContext(ChatContext);
}

export default ChatProvider;