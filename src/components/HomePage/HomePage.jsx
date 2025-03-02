import React from "react";
import Banner from "../Banner/Banner";
import CryptoTable from "../CryptoTable/CryptoTable";

function HomePage(props) {
  return (
    <div>
      <Banner />
      <CryptoTable></CryptoTable>
    </div>
  );
}

export default HomePage;
