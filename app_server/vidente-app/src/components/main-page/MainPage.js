import React, {Component, useEffect, useState} from "react";
import Header from "./header/Header";
import MenuHeader from "./groups/menu-header/MenuHeader";
import Headline from "./groups/headline/Headline";
import ContentsGrid from "./labels/contents-grid/ContentsGrid";
import Footer from "./footer/Footer";
import AriaModal from 'react-aria-modal';

import ReactPlaceholder from 'react-placeholder';
import TextRow from "react-placeholder/lib/placeholders/TextRow";
import "react-placeholder/lib/reactPlaceholder.css";

import {authService} from "../_services/authService";
import {userService} from "../_services/userService";
import Groups from "./groups/Groups";
import Labels from "./labels/Labels";


function MainPage(props) {
  const [userToken, setUserToken] = useState(authService.currentUserValue);

  return(
    <div className="grid-page">
      <Header/>
      <Groups/>
      <Footer/>
    </div>
  );
}

export default MainPage;