import React, { useEffect } from "react";
import JoinedChatList from "../components/JoinedChatList";
import AvaliableChatList from "../components/AvaliableChatList";
import ViewTitle from "../components/shared/ViewTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../actions/chats";
import { withBaseLayout } from "../layouts/Base";
import Notification from "../utils/notifications";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.items);

  useEffect(() => {
    Notification.setUp();
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatList chats={chats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Choose your channel`}>
          <Link className="btn btn-outline-primary" to="/chatCreate">
            New
          </Link>
        </ViewTitle>
        <AvaliableChatList chats={chats} />
      </div>
    </div>
  );
}

export default withBaseLayout(Home);
