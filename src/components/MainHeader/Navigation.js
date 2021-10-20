import Button from "../UI/Button";
import classes from "./Navigation.module.css";
import AuthContext from "../../Store/auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Navigation = (props)=>{

    const authCtx = useContext(AuthContext);

    return (
        <nav className={classes.nav}>

            <ul>
                <li><Link to="/expenses"> Expenses </Link></li>
                {!authCtx.isLoggedIn &&<li><Link to="login"> Login </Link></li>}
                {authCtx.isLoggedIn && <li><Button onClick={authCtx.onLogout}>Logout</Button> </li>}
            </ul>
            
        </nav>
    )
}

export default Navigation;