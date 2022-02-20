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

### Build projects

```bash
# Create 3 node projects
$ npx create-react-app@latest desktop --template typescript
$ npx create-react-app@latest mobile --template typescript
$ npx create-react-app@latest commons --template typescript

# Generate common directories by rush update
$ rush update
```
