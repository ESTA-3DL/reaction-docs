import React from "react";
import { useLocation } from "react-router-dom";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import * as Icons from "ionicons/icons";

import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Products",
    url: "/products",
    iosIcon: Icons.mailOutline,
    mdIcon: Icons.mailSharp,
  },
  {
    title: "My Cart",
    url: "/cart",
    iosIcon: Icons.paperPlaneOutline,
    mdIcon: Icons.paperPlaneSharp,
  },
  {
    title: "Favorites",
    url: "/",
    iosIcon: Icons.heartOutline,
    mdIcon: Icons.heartSharp,
  },
];

const labels = ["Notes", "Work", "Travel"];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId='main' type='overlay'>
      <IonContent>
        <IonList id='inbox-list'>
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? "selected" : ""}
                  routerLink={appPage.url}
                  routerDirection='none'
                  lines='none'
                  detail={false}>
                  <IonIcon slot='start' icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id='labels-list'>
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem key={index}>
              <IonIcon slot='start' icon={Icons.bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
