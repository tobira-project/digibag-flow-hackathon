# digibag-flow-hackathon

This is a [flow hackathon](https://hackathon.flow.com/) project for the [DigiBag](https://digibag-flow.vercel.app/) project.

This project will provide a platform for people to easily use and appreciate the value of NFT as digital goods.

We provide the following three functions:

1. The digital bag (DigiBag) as a replacement for a wallet: We call this specialized wallet a “bag” that keeps and displays digital merch as NFTs. This bag is available without all the complex terms or procedures that you NORMALLY need for wallet. Creating a bag account can be done with a few clicks with your SNS account or email address, so you don't have to remember a spare password or mnemonic. Security is guaranteed by a secret key using [Magic Auth](https://magic.link/auth), and it will be safely encrypted by using Cloud HSM.
1. You can put NFTs/ IN the bag and ON the bag: Not only can our bag store NFTs, but you can change something like its color. Also, it is decoratable with NFTs. This idea comes from Japanese real world culture that fans decorate their bags with goods, which is known as [ita-bag](https://en.wikipedia.org/wiki/Ita-bag). On our demo version, goods are materialized in 3D space and can be placed anywhere in any way you like on your smartphone or PC browser using WebGL.
1. The bag itself IS an NFT, so you can give it to your friends: Users can make multiple bags, so it's possible to have different bags for different genres of digital goods. In addition to a bag used as Wallet, a collection to store digital goods is also available as a NFT, and all of those are what we call BAG. So, users can present bags to each other together with the digital merch inside, and this is how we offer the unique composability of the Flow blockchain.

## Demo

You can find a demo of the project at [https://digibag-flow.vercel.app/](https://digibag-flow.vercel.app/).

[![Captures](https://i.gyazo.com/a4570d72df87ee25358bc699642f7d17.png)](https://gyazo.com/a4570d72df87ee25358bc699642f7d17)

- When you access the site, you will see several bags prepared for demonstration purposes. Each bag contains digital goods NFT, such as badges, which can be displayed anywhere you like on the bag decoration page.
- On the sign-up page, you can register an account using your Google account or email address. The first time you create an account, a Flow testnet account will be generated (takes about 30 seconds).

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
