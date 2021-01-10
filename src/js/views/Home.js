import React from "react";
import JoinedChatList from "../components/JoinedChatList";
import AvaliableChatList from "../components/AvaliableChatList";
import ViewTitle from "../components/shared/ViewTitle";

export default function Home() {
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatList />
      </div>
      <div className="col-9 fh">
        <ViewTitle />
        <AvaliableChatList />
      </div>
    </div>
  );
}
