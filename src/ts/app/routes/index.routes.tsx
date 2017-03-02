import { ComponentClass } from 'react';

// Container Imports
import HomeComponent from '../containers/home.container';
import TestComponent from '../containers/test.container';
import NotFoundComponent from '../containers/notfound.container';

interface IRoute {
  path: string;
  component: ComponentClass<any>;
}

/**
 * RouterMap
 * Maps all paths to correct components
 */
export const RouterMap: Array<IRoute> = [
  { path: '/', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: '*', component: NotFoundComponent }
];

export default RouterMap;
