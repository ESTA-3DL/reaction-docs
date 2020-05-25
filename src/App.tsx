import React from "react";
import Menu from "./components/Menu";

import ShoppingCart from "./pages/ShoppingCart";
import ProductsPage from "./pages/ProductsPage";

import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import ErrorContextProvider from "context/error";
import AuthContextProvider from "context/auth/";
import StoreContextProvider from "context/store/";

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

const App: React.FC = () => {
  return (
    <ErrorContextProvider>
      <AuthContextProvider>
        <StoreContextProvider>
          <IonApp>
            <IonReactRouter>
              <IonSplitPane contentId='main'>
                <Menu />
                <IonRouterOutlet id='main'>
                  <Route path='/cart' component={ShoppingCart} exact />
                  <Route path='/products' component={ProductsPage} />
                  <Redirect from='/' to='/products' exact />
                </IonRouterOutlet>
              </IonSplitPane>
            </IonReactRouter>
          </IonApp>
        </StoreContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  );
};

export default App;
