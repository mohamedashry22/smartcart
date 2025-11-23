# smartcart Commerce

Modern grocery commerce experience with 10k+ mock products, responsive merchandising grid, product details, and a cart drawer that mirrors contemporary marketplaces.

## Getting started (npm)
Requires Node 20.19+ (or 22.12+) to satisfy Vite 7; if you use nvm, run `nvm use` to pick up the pinned version.
```bash
npm install           # install dependencies
npm run dev           # start the dev server (default http://localhost:5173)
npm run build         # type-check + build the production bundle in dist/
npm run preview       # preview the production build locally
npm test              # run unit tests
```

## Docker workflow

### Build the image
```bash
docker build -t smartcart-app .
```

### Run with Docker
```bash
docker run --rm -p 4173:4173 smartcart-app
# or use docker compose (builds image and serves preview)
docker compose up --build
```

### Run tests inside the container
```bash
docker run --rm smartcart-app npm test
```