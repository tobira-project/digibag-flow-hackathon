/* eslint-disable import/no-extraneous-dependencies */
import Head from "next/head";
import "../flow/config";
import { useState, useEffect, FC } from "react";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";

const AuthedState: FC<{ user: any }> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fcl
      .query({
        cadence: `
import ExampleNFT from 0xba1d680383821b26

pub fun main(address: Address): [UInt64] {
    let acct = getAccount(address)
  let receiverRef = acct.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)
  .borrow()
  ?? panic("Could not borrow receiver reference")

  return receiverRef.getIDs()
}
        `,
        args: () => [fcl.arg(user.addr, types.Address)],
      })
      .then(async (result: any) => {
        setNfts(result);
      });
  }, []);

  const mint = async () => {
    setLoading(true);
    await fcl.mutate({
      cadence: `
import ExampleNFT from 0xba1d680383821b26

// This transaction allows the Minter account to mint an NFT
// and deposit it into its collection.

transaction {

  // The reference to the collection that will be receiving the NFT
  let receiverRef: &{ExampleNFT.NFTReceiver}

  prepare(acct: AuthAccount) {
    // Get the owner's collection capability and borrow a reference
    self.receiverRef = acct.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)
        .borrow()
        ?? panic("Could not borrow receiver reference")
  }

  execute {
    // Use the minter reference to mint an NFT, which deposits
    // the NFT into the collection that is sent as a parameter.
    let newNFT <- ExampleNFT.mintNFT()

    self.receiverRef.deposit(token: <-newNFT)
  }
}
    `,
    });
    setLoading(false);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      <div>Address: {user?.addr ?? "No Address"}</div>
      <div>NFTs: {nfts.length}</div>
      {nfts.map((nft) => (
        <div key={nft}>{nft}</div>
      ))}
      <button onClick={mint} type="button">
        Mint NFT
      </button>
      <button onClick={fcl.unauthenticate} type="button">
        Log Out
      </button>
    </div>
  );
};

const createCollection = async () => {
  fcl.mutate({
    cadence: `
import ExampleNFT from 0xba1d680383821b26

transaction {
  prepare(acct: AuthAccount) {

    let receiver = let receiverRef = acct.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath).borrow()
    if(receiver == nil) {

      // Create a new empty collection
      let collection <- ExampleNFT.createEmptyCollection()

      // store the empty NFT Collection in account storage
      acct.save<@ExampleNFT.Collection>(<-collection, to: ExampleNFT.CollectionStoragePath)

      // create a public capability for the Collection
      acct.link<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
    }
  }
}    
`,
  });
};

const logIn = () => {
  fcl.login();
  createCollection();
};

const signUp = () => {
  fcl.signUp();
  createCollection();
};

const UnauthenticatedState = () => (
  <div>
    <button onClick={logIn} type="button">
      Log In
    </button>
    <button onClick={signUp} type="button">
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
