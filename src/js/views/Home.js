import React, { useEffect } from "react";
import JoinedChatList from "../components/JoinedChatList";
import AvaliableChatList from "../components/AvaliableChatList";
import ViewTitle from "../components/shared/ViewTitle";

import { fetchChats } from "../api/chats";
export default function Home() {
  useEffect(() => {
    fetchChats().then((chat) => {
      console.log(chat);
    });
  }, []);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatList />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Choose your channel`} />
        <AvaliableChatList />
      </div>
    </div>
  );
}
