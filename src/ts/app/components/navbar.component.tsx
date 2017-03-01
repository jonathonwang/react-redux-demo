import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

// Component Imports
import NavLink from './navlink.component';

export interface NavbarComponentProps {
  // currentRoute: any;
  // dispatch: Dispatch<Object>;
}

export class NavbarComponent extends React.Component<NavbarComponentProps, void> {
  render(): JSX.Element {
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <a className='navbar-brand' href='#'>Brand</a>
          </div>

          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
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

// const mapStateToProps = (state, ownProps) => ({
//   currentRoute: ownProps.location
// });
//
// const Navbar = connect(mapStateToProps)(NavbarComponent);

export default NavbarComponent;
