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
} from "@ionic/react";

import { useUserContext } from "context/auth/";
import { useErrorContext } from "context/error";
import { useStoreContext } from "context/store";

import { Props } from "includes/types";

import ProductModel from "models/ProductModel";
import ProductListItem from "components/ProductListItem";
import ShoppingCartPreview from "components/ShoppingCartPreview";

const ProductsPage: React.FC<Props> = () => {
  const authContext = useUserContext();
  const errorContext = useErrorContext();
  const storeContext = useStoreContext();

  const [selectedProduct, setSelectedProduct] = React.useState<ProductModel>();

  function login() {
    authContext.login("nosreg216", "FB6s4D$j4xQa6zV$");
    // authContext.login("nosreg216", "password");
  }

  React.useEffect(() => {
    // login();
    storeContext.updateProducts();
    // authContext.login("nosreg216", "password");
  }, []);

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
        <button onClick={() => login()}>
          {authContext.isAuthenticated() ? "Logged in" : "Logged out"}
        </button>
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
          Add Item
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default ProductsPage;
