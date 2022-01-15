import { Startup } from './configuration/startup';

/**
 * Entry point for the application
 */
const main = () => {
  const appContainer = new Startup().startup();
};

main();