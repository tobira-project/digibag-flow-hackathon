import ExampleNFT from 0xba1d680383821b26

pub fun main(address: Address): [UInt64] {
    let acct = getAccount(address)
  let receiverRef = acct.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)
  .borrow()
  ?? panic("Could not borrow receiver reference")

  return receiverRef.getIDs()
}