import React from "react";

import LoginPage from "pages/LoginPage";
import ShoppingCart from "pages/ShoppingCart";
import ProductsPage from "pages/ProductsPage";

import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import GlobalContextProvider from "context/global";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { CookiesProvider } from "react-cookie";

const App: React.FC = () => {
  return (
    <GlobalContextProvider>
      <CookiesProvider>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet id='main'>
              <Route path='/login' component={LoginPage} exact />
              <Route path='/cart' component={ShoppingCart} exact />
              <Route path='/products' component={ProductsPage} exact />
              <Redirect from='/' to='/login' exact />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </CookiesProvider>
    </GlobalContextProvider>
  );
};

export default App;
