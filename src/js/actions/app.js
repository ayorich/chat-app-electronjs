const onStatusChange = (dispatch) => () => {
  const isOnline = navigator.onLine;
  console.log(isOnline);
  const action = isOnline
    ? { type: "APP_IS_ONLINE", isOnline: isOnline }
    : { type: "APP_IS_OFFLINE", isOnline: isOnline };

  dispatch(action);
};

export const listenToConnectionChanges = () => (dispatch) => {
  const connectionHandler = onStatusChange(dispatch);
  //   setInterval(connectionHandler, 30000);
  window.addEventListener("online", connectionHandler);
  window.addEventListener("offline", connectionHandler);

  return () => {
    window.removeEventListener("online", connectionHandler),
      window.removeEventListener("offline", connectionHandler);
  };
};
