import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef( (props, ref)=>{

    const style = `${classes["control"]} ${props.isValid === false ? classes.invalid : ""}`;
    const inputRef = useRef();

    const activate = ()=>{
      inputRef.current.focus();
    }

    useImperativeHandle(ref,()=>{

      return {
        focus: activate
      }
      
    })

    return (
        <div className={style}>
          <label htmlFor={props.label}>{props.label}</label>
          <input
            ref={inputRef}
            type={props.type}
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
          />
        </div>
    )
});

export default Input;