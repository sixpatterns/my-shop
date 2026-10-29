# my-shop

### Local development setup

- Install [mise](https://mise.jdx.dev/getting-started.html)

#### 1. Install dependencies

```sh
# Install all required tools
mise install

# Install yarn
npm install -g yarn

# Install dependencies
bundle install
yarn install
```

#### 2. Setup environment variables

```sh
cp .env.example .env
```

#### 3. Running app

```sh
# Run rails server, then open http://admin.localhost:3000
rails server

# Run react server
yarn dev
```

#### 4. Useful shortcuts

```sh
# Codegen
mise run codegen

# Automatically fix linting issues
mise run lint-fix
```

#### 5. Running tests

```sh
rails test
rails test:system
rails test test/system/login_test.rb
```
