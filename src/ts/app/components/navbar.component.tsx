import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router';

// Component Imports
import NavLink from './navlink.component';

export interface NavbarComponentProps {
}

export class NavbarComponent extends React.Component<NavbarComponentProps, void> {
  render(): JSX.Element {
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link to='/' className='navbar-brand'>Brand</Link>
          </div>
          <div className='collapse navbar-collapse' id='navbar'>
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
