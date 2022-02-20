// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { Shared } from '@nx/components';

export function App() {
  return (
    <>
      <NxWelcome title="desktop" />
      <Shared />
    </>
  );
}

export default App;
