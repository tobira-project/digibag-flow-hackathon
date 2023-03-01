# digibag-flow-hackathon

This is a [flow hackathon](https://hackathon.flow.com/) project for the [DigiBag](https://digibag-flow.vercel.app/) project.

This project will provide a platform for people to easily use and appreciate the value of NFT as digital goods.

We provide the following three functions:

1. The digital bag (DigiBag) as a replacement for a wallet: We call this specialized wallet a “bag” that keeps and displays digital merch as NFTs. This bag is available without all the complex terms or procedures that you NORMALLY need for wallet. Creating a bag account can be done with a few clicks with your SNS account or email address, so you don't have to remember a spare password or mnemonic. Security is guaranteed by  a secret key using Magic Auth by Magic Labs, and it will be safely encrypted by using Cloud HSM.
1. You can put NFTs/ IN the bag and ON the bag: Not only can our bag store NFTs, but you can change something like its color. Also, it is decoratable with NFTs. This idea comes from Japanese real world culture that fans decorate their bags with goods, which is known as [ita-bag](https://en.wikipedia.org/wiki/Ita-bag). On our demo version, goods are materialized in 3D space and can be placed anywhere in any way you like on your smartphone or PC browser using WebGL. 
1. The bag itself IS an NFT, so you can give it to your friends: Users can make multiple bags, so it's possible to have different bags for different genres of digital goods. In addition to a bag used as Wallet, a collection to store digital goods is also available as a NFT, and all of those are what we call BAG. So, users can present bags to each other together with the digital merch inside, and this is how we offer the unique composability of the Flow blockchain. 

## Demo

You can find a demo of the project at [https://digibag-flow.vercel.app/](https://digibag-flow.vercel.app/).

<p>
  [![Top](https://i.gyazo.com/d7843932a6964eb83bccf94471aec51f.png)](https://gyazo.com/d7843932a6964eb83bccf94471aec51f)
  [![Login](https://i.gyazo.com/5d89f43f07d32a44df2a7f81d67899c4.png)](https://gyazo.com/5d89f43f07d32a44df2a7f81d67899c4)
  [![Decoration](https://i.gyazo.com/b8c1ab91e709a05f6428869d3560a63b.png)](https://gyazo.com/b8c1ab91e709a05f6428869d3560a63b)
</p>

## Packages

Our project is split into multiple packages. Each package has its own README.md file with more information.

```
packages/
├── contracts
└── web
```

## Development

### Install dependencies

Clone the repository, cd into your local directory and run yarn.

### Development

To start the development server, run the following command:

```bash
yarn dev:web
```
