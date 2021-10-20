import classes from "./Modal.module.css";
import Button from "./Button";
import Card from "./Card";
import { Fragment } from "react";
import ReactDOM from 'react-dom';

const Backdrop = (props)=>{
    return <div className={classes.backdrop} onClick={props.onClose} />
}

const Overlay = (props)=>{
    return (
        <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onClose}>Okay</Button>
        </footer>
      </Card>
    )
}

const Modal = (props) => {
  return (
    <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,document.getElementById('backdrop-root'))}
        {ReactDOM.createPortal(<Overlay onClose={props.onClose} title={props.title} message={props.message}/>,document.getElementById('overlay-root'))}
    </Fragment>
  );
};

export default Modal;
