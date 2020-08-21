import React, {Component} from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class Auth extends Component {

    loginHandler = () => {

    }
  
    registrationHandler = () => {

    }

    submitHandler = (event) => {
        event.preventDefault()
    }

  
    render() {
        return (
            <div className={classes.Auth}>
                <div>
                   <h1>Auth page</h1>

                   <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                       <Input label="Email"
                              
                       />
                       <Input label="Password" 
                              errorMessage={'Test'}  
                       />

                       <Button 
                       type='success' 
                       onClick={this.loginHandler}> 
                       Login
                       </Button>
                       
                       <Button 
                       type='primary' 
                       onClick={this.registrationHandler}> 
                       Registration
                       </Button>
                   </form>
                </div>
            </div>
        )
    }
}