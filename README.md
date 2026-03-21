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
mise run install
```

#### 2. Setup environment variables

```sh
cp .env.example .env
```

#### 3. Running app

```sh
# Run rails server
mise run backend rails server

# Run console
mise run backend rails console

# Run react server
mise run frontend yarn dev
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
mise run backend rails test
mise run backend rails test:system
mise run backend rails test test/system/login_test.rb
```
