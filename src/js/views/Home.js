import React from "react";
import NavBar from "../components/Navbar";
import JoinedChat from "../components/JoinedChat";
import AvaliableChat from "../components/AvaliableChat";
import ViewTitle from "../components/shared/ViewTitle";

export default function Home() {
  return (
    <div className="content-wrapper">
      <NavBar />
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <JoinedChat />
        </div>
        <div className="col-9 fh">
          <ViewTitle />
          <AvaliableChat />
        </div>
      </div>
    </div>
  );
}
