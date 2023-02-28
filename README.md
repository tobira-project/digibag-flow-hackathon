# digibag-flow-hackathon

This is a hackathon project for the [DigiBag](https://digibag-flow.web.app) project. The goal is to create a simple flow that can be used to create a DigiBag.

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

### Deployment

To deploy the project, run the following command:

```bash
yarn deploy:firestore
yarn deploy:web
```