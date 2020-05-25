import React, { useState } from "react";
import { IonLabel, IonItem } from "@ionic/react";

const ShoppingCartPreview: React.FC = () => {
  const [cart] = useState([]);

  return (
    <>
      <IonItem color='primary' routerLink='/cart'>
        <IonLabel color='light'>My Shopping Cart ({cart.length})</IonLabel>
      </IonItem>
    </>
  );
};

export default ShoppingCartPreview;
