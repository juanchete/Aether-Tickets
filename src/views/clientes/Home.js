import React from "react";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";

export default function Home() {
  const firebase = useFirebaseApp();

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const user = useUser();
  return (
    <HomeStyle>
      <SidebarAdmin />
      {/* <h1>Bienvenidos al oasis Bienvenidos</h1>
      <button onClick={logout}> Log Out </button> */}
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  width: 100vw;
  background: pink;
`;
