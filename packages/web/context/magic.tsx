import { createContext, ReactNode, useContext, useMemo } from "react";
import { Magic } from "magic-sdk";
import { SDKBase, InstanceWithExtensions } from '@magic-sdk/provider';
import { OAuthExtension } from '@magic-ext/oauth';
import { FlowExtension } from "@magic-ext/flow";

import * as fcl from "@onflow/fcl";

// CONFIGURE ACCESS NODE
fcl.config().put("accessNode.api", "https://rest-testnet.onflow.org");

const MagicContext = createContext<{
  magic?: InstanceWithExtensions<SDKBase, (FlowExtension | OAuthExtension)[]>;
  fcl: typeof fcl;
}>({
  fcl: fcl
})

export const MagicProvider = ({ children }: { children: ReactNode }) => {
  const magic = useMemo(() => {
    if (typeof window === 'undefined') return;
    if (typeof process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY !== 'string') return;
    return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY, {
      extensions: [
        new FlowExtension({
          rpcUrl: "https://rest-testnet.onflow.org",
          network: "testnet"
        }),
        new OAuthExtension()
      ]
    })
  }, [])
  return (
    <MagicContext.Provider value={{
      magic: magic,
      fcl: fcl
    }}>
      {children}
    </MagicContext.Provider>
  )
}

export const useMagic = () => useContext(MagicContext)