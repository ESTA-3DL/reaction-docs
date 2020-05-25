import React from "react";
import ProductModel from "models/ProductModel";
import {
  IonCol,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonNote,
} from "@ionic/react";

interface Props {
  product: ProductModel;
  selectProduct: Function;
}

const ProductListItem: React.FC<Props> = (props: Props) => {
  return (
    <IonCol key={props.product.id} size='12' size-md='6' size-lg='4'>
      <IonItem
        button
        lines='full'
        color='light'
        onClick={() => {
          props.selectProduct(props.product);
        }}>
        <IonAvatar slot='start'>
          <IonImg src='https://via.placeholder.com/150/771796' />
        </IonAvatar>
        <IonLabel>
          <h3>
            {props.product.name} {props.product.id}
          </h3>
          <p>{props.product.price}</p>
        </IonLabel>
        <IonNote slot='end'>
          {" "}
          {Math.pow(Math.ceil(Math.random() * 3), 5)}
        </IonNote>
      </IonItem>
    </IonCol>
  );
};

export default ProductListItem;
