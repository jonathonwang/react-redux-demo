import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';

// Interface Imports
import { INavbarState } from '../reducers/navbar.reducer';

// Component Imports
import NavLink from './navlink.component';

export interface NavbarComponentProps {
  navbar: INavbarState;
  toggleNavbar(): void;
}

export class NavbarComponent extends React.Component<NavbarComponentProps, void> {
  render(): JSX.Element {
    const { navbar, toggleNavbar } = this.props;
    const collapseClassNames: string = classNames('collapse', 'navbar-collapse', { 'in': navbar.open });
    const toggleClassNames: string = classNames('navbar-toggle', {'collapsed': !navbar.open});
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className={toggleClassNames} aria-expanded={navbar.open.toString()} onClick={() => toggleNavbar()}>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link to='/' className='navbar-brand'>Brand</Link>
          </div>
          <div className={collapseClassNames} id='navbar'>
            <ul className='nav navbar-nav navbar-right'>
              <NavLink to='/'>Home</NavLink>
              <NavLink to='test'>test</NavLink>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavbarComponent;
