import React from "react";
import Header from "./header/Header";
import MenuHeader from "./menu-header/MenuHeader";
import Menu from "./menu/Menu";
import Headline from "./headline/Headline";
import ContentsGrid from "./contents-grid/ContentsGrid";
import Footer from "./footer/Footer";

function GridPage() {
  return(
    <div className="grid-page">
      <Header>
      </Header>
      <MenuHeader/>
      <Menu/>
      <Headline/>
      <ContentsGrid/>
      <Footer/>
    </div>
  )

}

export default GridPage;