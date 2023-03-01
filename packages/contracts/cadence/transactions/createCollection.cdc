import GoodsNFT from "../contracts/GoodsNFT.cdc"

// This transaction configures a user's account
// to use the NFT contract by creating a new empty collection,
// storing it in their account storage, and publishing a capability
transaction {
    prepare(acct: AuthAccount) {

        // check if the account already has a collection
        if acct.borrow<&GoodsNFT.Collection>(from: GoodsNFT.CollectionStoragePath) == nil {
            // Create a new empty collection
            let collection <- GoodsNFT.createEmptyCollection(name:"default bag")

            // store the empty NFT Collection in account storage
            acct.save<@GoodsNFT.Collection>(<-collection, to: GoodsNFT.CollectionStoragePath)

            log("Collection created")

            // create a public capability for the Collection
            acct.link<&{GoodsNFT.NFTReceiver}>(GoodsNFT.CollectionPublicPath, target: GoodsNFT.CollectionStoragePath)

            log("Capability created")
        }
    }
}
