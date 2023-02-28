import { config } from "@onflow/fcl";

console.log("NEXT_PUBLIC_FLOW_API", process.env.NEXT_PUBLIC_FLOW_API);

config({
  "accessNode.api": process.env.NEXT_PUBLIC_FLOW_API, // Mainnet: "https://rest-mainnet.onflow.org"
  "discovery.wallet": process.env.NEXT_PUBLIC_FLOW_WALLET, // Mainnet: "https://fcl-discovery.onflow.org/authn"
  "0xProfile": process.env.NEXT_PUBLIC_FLOW_PROFILE,
  "flow.network": process.env.NEXT_PUBLIC_FLOW_NETWORK,
});
