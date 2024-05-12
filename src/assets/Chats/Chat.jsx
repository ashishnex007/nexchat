import { useState } from "react";
import { chatState } from "../../context/ChatProvider";
import SideDrawer from "../miscellaneous/SideDrawer";
import ChatBox from "./ChatBox";
import MyChats from "./MyChats";

const Chat = () => {
    const {user} = chatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <>
            { user && <SideDrawer />}
            <div className="flex justify-between">
                { user && <MyChats fetchAgain={fetchAgain} />}
                { user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </div>
        </>
    )
}

export default Chat;
