import GoodsNFT from "../contracts/GoodsNFT.cdc"

// This transaction allows the Minter account to mint an NFT
// and deposit it into its collection.

transaction {

    // The reference to the collection that will be receiving the NFT
    let receiverRef: &{GoodsNFT.NFTReceiver}

    prepare(acct: AuthAccount) {
        // Get the owner's collection capability and borrow a reference
        self.receiverRef = acct.getCapability<&{GoodsNFT.NFTReceiver}>(GoodsNFT.CollectionPublicPath)
            .borrow()
            ?? panic("Could not borrow receiver reference")
    }

    execute {
        // Use the minter reference to mint an NFT, which deposits
        // the NFT into the collection that is sent as a parameter.
        let newNFT <- GoodsNFT.mintNFT(
            url: "test",
            pos: [0.0, 0.0, 0.0],
            rot: [0.0, 0.0, 0.0],
            name: "name",
            publisher: "publisher",
            description: "description",
            scale: 1.0)

        log(self.receiverRef.getIDs())

        self.receiverRef.depositNFT(bagId: self.receiverRef.getIDs()[0], token: <-newNFT)

        log("NFT Minted and deposited to Account 1's Collection")
    }
}