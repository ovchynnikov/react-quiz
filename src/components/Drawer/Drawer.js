import React, {Component} from 'react';
import classes from './Drawer.css';
import Backdrop from '../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom';




const links = [
   {to: '/', label: 'List of Quizes ', exact: true},
   {to: '/auth', label: 'Authorization', exact: false},
   {to: '/quiz-creator', label: 'Create quiz', exact: false}
]

class Drawer extends Component {

    clickLinkHandler = () => {
        this.props.onClose();
    }

    renderLinks(){
        return links.map((link, index) => {
            return (
                <li key={index}>
                   <NavLink to={link.to} 
                   exact={link.exact}
                   activeClassName={classes.active}
                   onClick={this.clickLinkHandler}
                   >{link.label} </NavLink> 
                </li>
            )
        })
    }

    render(){
        const cls = [classes.Drawer];
        if (!this.props.isOpen){
            cls.push(classes.close)
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')} > 
                    <ul>
                      {this.renderLinks()}
                    </ul>
                </nav>
               { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer;