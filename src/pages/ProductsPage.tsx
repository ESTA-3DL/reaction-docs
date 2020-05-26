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
  IonGrid,
  IonRow,
  IonModal,
  IonButton,
  IonFooter,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";

import { useUserContext } from "context/auth/";
import { useErrorContext } from "context/error";
import { useStoreContext } from "context/store";
import { useCookies } from "react-cookie";

import ProductModel from "models/ProductModel";
import ProductListItem from "components/ProductListItem";
import ShoppingCartPreview from "components/ShoppingCartPreview";
// import { RouteComponentProps } from "react-router-dom";

const ProductsPage: React.FC = ({ match, history }: any) => {
  const authContext = useUserContext();
  const errorContext = useErrorContext();
  const storeContext = useStoreContext();

  const [selectedProduct, setSelectedProduct] = React.useState<ProductModel>();

  const [cookies] = useCookies(["username"]);

  function log(text: string, color: string = "red"): void {
    console.log(`%c${text}`, `color:${color}`);
  }

  useIonViewDidEnter(() => {
    console.log("[Product] ionViewDidEnter event fired");
    log("Logged in as " + cookies.username);
    if (cookies.username) {
      storeContext.updateProducts();
    } else {
      log("Not logged in");
      history.push("/login");
    }
  });

  useIonViewDidLeave(() => {
    console.log("[Product] ionViewDidLeave event fired");
  });

  useIonViewWillEnter(() => {
    console.log("[Product] ionViewWillEnter event fired");
    // log("[Product] isAuthenticated:" + authContext.isAuthenticated());
  });

  useIonViewWillLeave(() => {
    console.log("[Product] ionViewWillLeave event fired");
  });

  // React.useEffect(() => {
  //   // console.log("authContext.isAuthenticated:", authContext.isAuthenticated());
  //   // if (authContext.isAuthenticated() === false) {
  //   //   return history.push("/login");
  //   // }
  //   console.log("useEffect updateProducts");
  //   storeContext.updateProducts();
  // }, [authContext.user]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Product Catalog</IonTitle>
        </IonToolbar>
        <ShoppingCartPreview />
      </IonHeader>

      <IonContent fullscreen>
        <button onClick={() => authContext.logout()}>Log out</button>
        <IonGrid>
          <IonRow className='ion-align-items-center'>
            {storeContext.store.products.map(product => (
              <ProductListItem
                key={product.id}
                product={product}
                selectProduct={(p: ProductModel) => setSelectedProduct(p)}
              />
            ))}
          </IonRow>
        </IonGrid>

        {/* TODO move to a error banner component */}
        <div>
          {errorContext.state.error ? (
            <p>Error: {errorContext.state.message}</p>
          ) : null}
        </div>

        <IonModal
          isOpen={selectedProduct !== undefined}
          mode='ios'
          swipeToClose
          onDidDismiss={() => setSelectedProduct(undefined)}>
          <IonButton onClick={() => setSelectedProduct(undefined)}>
            Close Modal
          </IonButton>
          <h3>{selectedProduct?.price}</h3>
          <p>This is modal content</p>
        </IonModal>
      </IonContent>

      <IonFooter>
        <IonButton onClick={() => storeContext.updateProducts()}>
          Update Item List
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default ProductsPage;
