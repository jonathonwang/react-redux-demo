import * as React from 'react';
import { Link } from 'react-router';

export interface NavLinkProps {
  to: string;
}

export class NavLink extends React.Component<NavLinkProps, void> {
  render(): JSX.Element {
    const { children, to } = this.props;
    // const isActive = this.context.router.isActive(this.props.to, true);
    const activeClassName: string = 'active';
    // let listItemClass = isActive ? activeClassName : '';
    return (
      <li>
        <Link to={to}>
          {children}
        </Link>
      </li>
    );
  }
}

export default NavLink;
