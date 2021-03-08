import history from "history.js";

export const middleware = store => next => action => {
    //console.log("test middleware", action);

    // if (action.type == "USER_LOGGED_OUT")
    // {
    //     history.push({
    //         pathname: "/session/signin"
    //       });
    //     console.log('session expired'); 
    // }
    return next(action);
  // Code to be executed
}