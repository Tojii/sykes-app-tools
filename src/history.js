import { createBrowserHistory } from 'history';

// export default createBrowserHistory();
export default createBrowserHistory({
  basename: process.env.REACT_APP_PUBLIC_URL
})