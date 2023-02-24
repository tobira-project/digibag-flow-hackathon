import { Magic } from "magic-sdk";
import { OAuthExtension } from '@magic-ext/oauth';
import { FlowExtension } from "@magic-ext/flow";

export default function magicClient() {
  return typeof window !== 'undefined' ? new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY || '', {
    extensions: [
      new FlowExtension({
        rpcUrl: "https://rest-testnet.onflow.org",
        network: "testnet"
      }),
      new OAuthExtension()
    ]
  }) : null;
};