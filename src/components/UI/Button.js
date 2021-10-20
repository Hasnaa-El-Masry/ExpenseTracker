import classes from "./Button.module.css";

const Button = (props)=>{

    const style = `${classes.button} ${props.className? props.className:""}`;

    return <button onClick={props.onClick} disabled={props.disabled? props.disabled: false} className={style} type={props.type?props.type :`submit`}>{props.children}</button>
}

export default Button;