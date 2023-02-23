import Head from "next/head";
import "../flow/config";
import { useState, useEffect, FC } from "react";
import * as fcl from "@onflow/fcl";

const AuthedState: FC<{ user: any }> = ({ user }) => (
  <div>
    <div>Address: {user?.addr ?? "No Address"}</div>
    <button onClick={fcl.unauthenticate} type="button">
      Log Out
    </button>
  </div>
);

const UnauthenticatedState = () => (
  <div>
    <button onClick={fcl.logIn} type="button">
      Log In
    </button>
    <button onClick={fcl.signUp} type="button">
      Sign Up
    </button>
  </div>
);

const Index = () => {
  const [user, setUser] = useState({ loggedIn: null });
  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  return (
    <div>
      <Head>
        <title>FCL Quickstart with NextJS</title>
        <meta name="description" content="My first web3 app on Flow!" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <h1>Flow App</h1>
      {user.loggedIn ? <AuthedState user={user} /> : <UnauthenticatedState />}
    </div>
  );
};

export default Index;
