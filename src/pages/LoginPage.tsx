/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  IonPage,
  IonContent,
  IonTitle,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";

import { useCookies } from "react-cookie";

import { useUserContext } from "context/auth/";
import { useErrorContext } from "context/error";

const ProductsPage: React.FC = ({ match, history }: any) => {
  const authContext = useUserContext();
  const errorContext = useErrorContext();

  const [cookies, setCookie, removeCookie] = useCookies(["username"]);

  function log(text: string, color: string = "blue"): void {
    console.log(`%c${text}`, `color:${color}`);
  }

  function loginWithCorrectInfo() {
    authContext.login("nosreg216", "FB6s4D$j4xQa6zV$");
  }

  function setCookies() {
    setCookie("username", authContext.user.username + Date.now());
    console.log(cookies);
  }

  function testCookies() {
    console.log(cookies);
  }

  function clearCookies() {
    removeCookie("username");
    console.log(cookies);
  }

  React.useEffect(onUserLoginStatusChanged, [authContext.user.id]);

  function onUserLoginStatusChanged(): void {
    log("onUserLoginStatusChanged:" + authContext.isAuthenticated(), "gray");

    if (authContext.isAuthenticated()) {
      log("Logged in as:" + authContext.user.username);

      const serializedUser: string = JSON.stringify(authContext.user);
      console.log(serializedUser);
      setCookie("username", serializedUser);

      history.push("/products");
    } else if (window.location.pathname !== "/login") {
      log("Logged out from:" + cookies.username);
      removeCookie("username");
      history.push("/login");
    }
  }

  // function loginWithWrongInfo() {
  //   authContext.login("nosreg216", "password");
  // }

  useIonViewDidEnter(() => {
    console.log("[Login] ionViewDidEnter event fired");
    // log("onUserLoginStatusChanged:" + authContext.isAuthenticated());
    // if (authContext.isAuthenticated()) {
    //   history.push("/");
    // }
  });

  useIonViewDidLeave(() => {
    console.log("[Login] ionViewDidLeave event fired");
  });

  useIonViewWillEnter(() => {
    console.log("[Login] ionViewWillEnter event fired");
  });

  useIonViewWillLeave(() => {
    console.log("[Login] ionViewWillLeave event fired");
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <button onClick={() => loginWithCorrectInfo()}>Log in</button>
        <hr />
        <button onClick={() => authContext.logout()}>Log Out</button>
        <hr />
        <button onClick={() => setCookies()}>Set</button>
        <hr />
        <button onClick={() => testCookies()}>Test</button>
        <hr />
        <button onClick={() => clearCookies()}>Clear</button>
        <hr />
        <button onClick={() => history.push("/products")}>
          Go to Products
        </button>

        {/* TODO move to a error banner component */}
        <div>
          {errorContext.state.error ? (
            <p>Error: {errorContext.state.message}</p>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductsPage;
