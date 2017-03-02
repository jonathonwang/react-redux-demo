import * as React from 'react';
import { ComponentClass } from 'react';
import { Link, IndexLink, withRouter } from 'react-router';

export interface NavLinkProps {
  router?: any;
  children?: JSX.Element;
  index?: Boolean;
  to: string;
}

export class NavLink extends React.Component<NavLinkProps, void> {
  private isActive(): Boolean {
    const { router, index, to } = this.props;
    let isActive;
    if (router.isActive('/', true) && index) {
      isActive = true;
    } else {
      isActive = router.isActive(to);
    }
    return isActive;
  }
  render(): JSX.Element {
    const { children, index, to } = this.props;
    const activeClasses = 'active';
    const LinkComponent: ComponentClass<any> = index ?  IndexLink : Link;
    const linkComponentClass = this.isActive() ? activeClasses : '';
    return (
      <li className={linkComponentClass}>
        <LinkComponent to={to}>
          {children}
        </LinkComponent>
      </li>
    );
  }
}

const NavLinkWithRouter = withRouter(NavLink);

export default NavLinkWithRouter;
