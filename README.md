# monorepo-example

Example projects for Web Frontend monorepo. Each directories under project root is different project using monorepo to manage Desktop and Mobile React Web Apps.
Using node version v16.13.0.

## Rush

+ Use symbolic links for common dependencies
  + Rush recommends not to use commends to update dependencies like `npm install`, `npm update`

`rush update` command checks all projects under the repository and move all dependencies to /common directory and create symbolic links. You can use `rush update` after changing `package.json` manually or pulling from remote repository.

### Pre requirements

```bash
$ npm install -g @microsoft/rush
```

### Hot to set up projects

```bash
# Create 3 node projects
$ npx create-react-app@latest desktop --template typescript
$ npx create-react-app@latest mobile --template typescript
$ npx tsdx create components

# Generate common directories by rush update
$ rush update
```

Remove `App` component from `desktop` and `mobile` and re-define `App` component as shared component in commons.

```tsx
// ex. /rush/desktop/src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "@commons/components/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <div>
      <p>DESKTOP VERSION</p>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

```tsx
// ex. /rush/commons/components/App/index.tsx

import React from "react";
import logo from "./logo.svg";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This component is defined under commons</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
```

### How to start Applications

Update `rush.json` in project root

```json
{
  "projects": [
    {
      "packageName": "desktop",
      "projectFolder": "desktop",
      "reviewCategory": "production"
    },
    {
      "packageName": "mobile",
      "projectFolder": "mobile",
      "reviewCategory": "production"
    },
    {
      "packageName": "@commons/components",
      "projectFolder": "components"
    }
  ]
}
```

Fix name `package.json` of `commons`

```json
{
  "name": "@commons/components"
}
```

Install `commons` in `desktop` and `mobile`

```bash
$ (cd desktop && rush add --package @commons/components)
$ (cd mobile && rush add --package @commons/components)
```

Start Application

```
$ (cd desktop && rushx start)
```

### How to deploy projects

```bash
$ rush init-deploy --project desktop --scenario deployment-desktop
$ rush init-deploy --project mobile --scenario deployment-mobile
$ rush update
$ rush install
$ rush build

$ rush deploy -p desktop -s deployment-desktop --overwrite
$ cd common/deploy/desktop
$ rushx build
$ npx serve -s build

$ rush deploy -p mobile -s deployment-mobile --overwrite
$ cd common/deploy/mobile
$ rushx build
$ npx serve -s build
```

## nx

### How to setup projects

```bash
$ npx create-nx-workspace@latest
orgname => nx
template => react
application name => desktop

$ npx nx g @nrwl/react:app mobile

$ npx nx g @nrwl/react:lib components
```

### How to start applications

```bash
$ npx nx serve desktop
$ npx nx serve mobile
```
