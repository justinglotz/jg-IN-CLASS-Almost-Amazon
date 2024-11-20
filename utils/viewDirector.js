import firebase from 'firebase/app';
import 'firebase/auth';
import loginButton from '../components/buttons/loginButton';
import startApp from './startApp';
import client from './client';

const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in, start app
      startApp(user);
    } else {
      // person is NOT logged in, show login button
      loginButton();
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
