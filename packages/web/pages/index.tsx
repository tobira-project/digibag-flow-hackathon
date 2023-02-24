import React, { useState, useEffect } from "react";
import Link from "next/link";
import magicClient from "../src/lib/magic";
import * as fcl from "@onflow/fcl";

// CONFIGURE ACCESS NODE
fcl.config().put("accessNode.api", "https://rest-testnet.onflow.org");

const magic = magicClient();

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [publicAddress, setPublicAddress] = useState("");
  const [email, setEmail] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    magic?.user.isLoggedIn().then(async (magicIsLoggedIn) => {
      setIsLoggedIn(magicIsLoggedIn);
      if (magicIsLoggedIn) {
        const userMetadata = await magic.user.getMetadata();
        console.log(userMetadata)
        setPublicAddress(userMetadata.publicAddress || "");
        setEmail(userMetadata.email || "");
      }
    });
  }, [isLoggedIn]);

  const login = async () => {
    await magic?.oauth.loginWithRedirect({
      provider: "google",
      redirectURI: `${window.location.origin}`
    });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await magic?.user.logout();
    setIsLoggedIn(false);
  };

  const verify = async () => {
    try {

      console.log("SENDING TRANSACTION");
      setVerifying(true);
      const sampleTx = `
      transaction {
        var acct: AuthAccount

        prepare(acct: AuthAccount) {
          self.acct = acct
        }

        execute {
          log(self.acct.address)
        }
      }
    `;
    const AUTHORIZATION_FUNCTION = magic?.flow.authorization;
    if (AUTHORIZATION_FUNCTION) {
      var response = await fcl.send([
        fcl.transaction(sampleTx),
        fcl.proposer(AUTHORIZATION_FUNCTION),
        fcl.authorizations([AUTHORIZATION_FUNCTION]),
        fcl.payer(AUTHORIZATION_FUNCTION),
        fcl.limit(9999)
      ]);
      console.log("TRANSACTION SENT");
      console.log("TRANSACTION RESPONSE", response);

      console.log("WAITING FOR TRANSACTION TO BE SEALED");
      var data = await fcl.tx(response).onceSealed();
      console.log("TRANSACTION SEALED", data);
      setVerifying(false);

      if (data.status === 4 && data.statusCode === 0) {
        setMessage("Congrats!!! I Think It Works");
      } else {
        setMessage(`Oh No: ${data.errorMessage}`);
      }
    }
  } catch (error) {
    console.error("FAILED TRANSACTION", error);
  }
};

  return (
    <>
      <div>Digibag</div>
      <div className="w-20">
        <Link href={"/decoration"}>
          <div className="flex justify-center font-bold bg-green-100 h-10 grid content-center rounded-full">
            decoration
          </div>
        </Link>
      </div>
      {!isLoggedIn ? (
        <div className="container">
          <h1>Please sign up or login</h1>
          <button id="btn-send" className="google" onClick={login}>
              <img src="./sign-in-with-google.svg" />
          </button>
        </div>
      ) : (
            <div>
              <div>
                <div className="container">
                  <h1>Current user: {email}</h1>
                  <button onClick={logout}>Logout</button>
                </div>
              </div>
              <div className="container">
                <h1>Flow address</h1>
                <div className="info">{publicAddress}</div>
              </div>
              <div className="container">
                <h1>Verify Transaction</h1>
                {verifying ? (
                    <div className="sending-status">Verifying Transaction</div>
                ) : (
                    ""
                )}
                <div className="info">
                  <div>{message}</div>
                </div>
                <button id="btn-deploy" onClick={verify}>
                  Verify
                </button>
              </div>
            </div>
      )}
    </>
  );
}
