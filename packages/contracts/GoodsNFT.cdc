// ExampleNFT.cdc
//
// This is a complete version of the ExampleNFT contract
// that includes withdraw and deposit functionality, as well as a
// collection resource that can be used to bundle NFTs together.
//
// Learn more about non-fungible tokens in this tutorial: https://developers.flow.com/cadence/tutorial/05-non-fungible-tokens-2

pub contract GoodsNFT {

    // Declare Path constants so paths do not have to be hardcoded
    // in transactions and scripts

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath

    // Tracks the unique IDs of the NFT
    pub var idCount: UInt64

    // Declare the NFT resource type
    pub resource NFT {
        // The unique ID that differentiates each NFT
        pub let id: UInt64
        pub let url: String
        pub var pos: [UInt64]
        pub var rot: [UInt64]

        // Initialize both fields in the init function
        init(initID: UInt64, url: String, pos: [UInt64], rot: [UInt64]) {
            self.id = initID
            self.url = url
            self.pos = pos
            self.rot = rot
        }

        pub fun setPos(pos: [UInt64]) {
            self.pos = pos
        }

        pub fun setRot(rot: [UInt64]) {
            self.rot = rot
            }
    }

    // We define this interface purely as a way to allow users
    // to create public, restricted references to their NFT Collection.
    // They would use this to publicly expose only the deposit, getIDs,
    // and idExists fields in their Collection
    pub resource interface BagNFTReceiver {

        pub fun deposit(token: @NFT)

        pub fun getIDs(): [UInt64]

        pub fun idExists(id: UInt64): Bool

        pub fun updatePos(id: UInt64, pos: [UInt64])

        pub fun updateRot(id: UInt64, rot: [UInt64])
    }

    pub resource interface NFTReceiver {
        pub fun deposit(token: @Bag)

        pub fun getIDs(): [UInt64]

        pub fun idExists(id: UInt64): Bool
    }

    // The definition of the Collection resource that
    // holds the NFTs that a user owns
    pub resource Bag: BagNFTReceiver {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedNFTs: @{UInt64: NFT}
        pub var id: UInt64

        // Initialize the NFTs field to an empty collection
        init (initID: UInt64) {
            self.ownedNFTs <- {}
            self.id = initID
        }

        // withdraw
        //
        // Function that removes an NFT from the collection
        // and moves it to the calling context
        pub fun withdraw(withdrawID: UInt64): @NFT {
            // If the NFT isn't found, the transaction panics and reverts
            let token <- self.ownedNFTs.remove(key: withdrawID)
                ?? panic("Cannot withdraw the specified NFT ID")

            return <-token
        }

        // deposit
        //
        // Function that takes a NFT as an argument and
        // adds it to the collections dictionary
        pub fun deposit(token: @NFT) {
            // add the new token to the dictionary with a force assignment
            // if there is already a value at that key, it will fail and revert
            self.ownedNFTs[token.id] <-! token
        }

        pub fun updatePos(id: UInt64, pos: [UInt64]) {
            self.ownedNFTs[id]?.setPos(pos: pos)
        }

        pub fun updateRot(id: UInt64, rot: [UInt64]) {
            self.ownedNFTs[id]?.setRot(rot: rot)
        }

        // idExists checks to see if a NFT
        // with the given ID exists in the collection
        pub fun idExists(id: UInt64): Bool {
            return self.ownedNFTs[id] != nil
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    pub resource Collection: NFTReceiver {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedBags: @{UInt64: Bag}

        // Initialize the NFTs field to an empty collection
        init () {
            self.ownedBags <- {}
        }

        // withdraw
        //
        // Function that removes an NFT from the collection
        // and moves it to the calling context
        pub fun withdraw(withdrawID: UInt64): @Bag {
            // If the NFT isn't found, the transaction panics and reverts
            let token <- self.ownedBags.remove(key: withdrawID)
                ?? panic("Cannot withdraw the specified Bag ID")

            return <-token
        }

        pub fun deposit(token: @Bag) {
            // add the new token to the dictionary with a force assignment
            // if there is already a value at that key, it will fail and revert
            self.ownedBags[token.id] <-! token
        }

        // idExists checks to see if a NFT
        // with the given ID exists in the collection
        pub fun idExists(id: UInt64): Bool {
            return self.ownedBags[id] != nil
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedBags.keys
        }

        destroy() {
            destroy self.ownedBags
        }
    }

    // creates a new empty Collection resource and returns it
    pub fun createEmptyCollection(): @Collection {
        var newBag <- create Bag(initID: self.idCount)

        self.idCount = self.idCount + 1

        var newCollection <- create Collection()
        newCollection.deposit(token: <-newBag)

        return <-newCollection
    }

    // mintNFT
    //
    // Function that mints a new NFT with a new ID
    // and returns it to the caller
    pub fun mintNFT(url: String, pos: [UInt64], rot: [UInt64]): @NFT {

        // create a new NFT
        var newNFT <- create NFT(initID: self.idCount, url: url, pos: pos, rot: rot)

        // change the id so that each ID is unique
        self.idCount = self.idCount + 1

        return <-newNFT
    }

	init() {
        self.CollectionStoragePath = /storage/nftTutorialCollection
        self.CollectionPublicPath = /public/nftTutorialCollection
        self.MinterStoragePath = /storage/nftTutorialMinter

        // initialize the ID count to one
        self.idCount = 1

        // store an empty NFT Collection in account storage
        self.account.save(<-self.createEmptyCollection(), to: self.CollectionStoragePath)

        // publish a reference to the Collection in storage
        self.account.link<&{NFTReceiver}>(self.CollectionPublicPath, target: self.CollectionStoragePath)
	}
}