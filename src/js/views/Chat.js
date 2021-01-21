import React, { useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import { withBaseLayout } from "../layouts/Base";

import ViewTitle from "../components/shared/ViewTitle";
import {
  subscribeToChat,
  subscribeToProfile,
  sendChatMessage,
  subscribeToMessages,
  registerMessageSubscription,
} from "../actions/chats";
import LoadingView from "../components/shared/LoadingView";
import Messenger from "../components/Messenger";

function Chat() {
  const { id } = useParams();
  const peopleWatchers = useRef({});
  const messageList = useRef();
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => {
    // console.log(chats);
    return chats.activeChats[id];
  });
  const messages = useSelector(({ chats }) => chats.messages[id]);
  const messagesSub = useSelector(({ chats }) => chats.messagesSubs[id]);

  const joinedUsers = activeChat?.joinedUsers;

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));

    //register unsubscribtion
    if (!messagesSub) {
      const unsubFromMessages = dispatch(subscribeToMessages(id));
      dispatch(registerMessageSubscription(id, unsubFromMessages));
    }

    return () => {
      unsubFromChat();
      unsubFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  const sendMessage = useCallback(
    (message) => {
      dispatch(sendChatMessage(message, id)).then(() =>
        messageList.current.scrollIntoView(false)
      );
    },
    [id]
  );

  const subscribeToJoinedUsers = useCallback(
    (jUser) => {
      jUser.forEach((user) => {
        if (!peopleWatchers.current[user.uid]) {
          peopleWatchers.current[user.uid] = dispatch(
            subscribeToProfile(user.uid, id)
          );
        }
      });
    },
    [dispatch, id]
  );

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach((id) =>
      peopleWatchers.current[id]()
    );
  }, [peopleWatchers.current]);

  if (!activeChat?.id) {
    return <LoadingView message="Loading chat" />;
  }

  // console.log(peopleWatchers);
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle
          text={`Channel:${activeChat ? activeChat.name : "loading..."}`}
        />
        <ChatMessagesList innerRef={messageList} messages={messages} />
        <Messenger onSubmit={sendMessage} />
      </div>
    </div>
  );
}

export default withBaseLayout(Chat, { canGoBack: true });
