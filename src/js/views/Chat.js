import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import { withBaseLayout } from "../layouts/Base";

import ViewTitle from "../components/shared/ViewTitle";
import { subscribeToChat, subscribeToProfile } from "../actions/chats";
function Chat() {
  const { id } = useParams();
  const peopleWatchers = useRef({});
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => {
    // console.log(chats);
    return chats.activeChats[id];
  });
  const joinedUsers = activeChat?.joinedUsers;

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));

    return () => {
      unsubFromChat();
      unsubFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  const subscribeToJoinedUsers = (jUser) => {
    jUser.forEach((user) => {
      if (!peopleWatchers.current[user.uid]) {
        peopleWatchers.current[user.uid] = dispatch(
          subscribeToProfile(user.uid)
        );
      }
    });
  };

  const unsubFromJoinedUsers = () => {
    Object.keys(peopleWatchers.current).forEach((id) =>
      peopleWatchers.current[id]()
    );
  };

  console.log(peopleWatchers);
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle
          text={`Channel:${activeChat ? activeChat.name : "loading..."}`}
        />
        <ChatMessagesList />
      </div>
    </div>
  );
}

export default withBaseLayout(Chat, { canGoBack: true });
