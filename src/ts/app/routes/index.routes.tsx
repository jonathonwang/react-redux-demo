import { ComponentClass } from 'react';

import HomeComponent from '../containers/home.container';
import TestComponent from '../containers/test.container';

interface IRoute {
  path: string;
  component: ComponentClass<{}>;
}

/**
 * RouterMap
 * Maps all paths to correct components
 */
export const RouterMap: Array<IRoute> = [
  { path: '/', component: HomeComponent },
  { path: 'test', component: TestComponent }
];

export default RouterMap;
