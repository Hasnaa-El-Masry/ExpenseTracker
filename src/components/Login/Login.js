import classes from "./Login.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import AuthContext from "../../Store/auth-context";
import useHttp from "../../hooks/useHttp";
import { useHistory } from "react-router-dom";


const emailReducer = (state, action) => {

  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  if (action.type === "INPUT_RESET") {
    return { value: "", isValid: null };
  }

  return { value: "", isValid: null };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  if (action.type === "INPUT_RESET") {
    return { value: "", isValid: null };
  }

  return { value: "", isValid: null };
};

const Login = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [success, setSuccess] = useState(null);

  const { sendRequest, error, isLoading } = useHttp();

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputRef = useRef();

  const passwordInputRef = useRef();

  const { isValid: emailIsValid } = emailState;

  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(passwordIsValid && emailIsValid);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const changeEmailHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const changePasswordHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      let url;

      let applyData;

      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOWRqsyIBTiUVYZ7Rs6Gq1KM0btMO0v4I";

        applyData = (data) => {
          const expirDate = new Date(new Date().getTime()+( +data.expiresIn*1000))
          authCtx.onLogin(data.idToken, expirDate.toISOString());
          dispatchEmail("INPUT_RESET");
          dispatchPassword("INPUT_RESET");
          history.push("/expenses");

        };
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOWRqsyIBTiUVYZ7Rs6Gq1KM0btMO0v4I";

        applyData = () => {
          setSuccess("registered is succeed!");
          dispatchEmail("INPUT_RESET");
          dispatchPassword("INPUT_RESET");
        };
      }

      sendRequest(
        {
          url: url,
          method: "POST",
          body: {
            email: emailState.value,
            password: passwordState.value,
            returnSecureToken: true,
          },
        },
        applyData
      );
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailState.isValid}
          type="email"
          label="Email"
          onChange={changeEmailHandler}
          onBlur={validateEmailHandler}
          value={emailState.value}
        />

        <Input
          ref={passwordInputRef}
          isValid={passwordState.isValid}
          type="password"
          label="Password"
          onChange={changePasswordHandler}
          onBlur={validatePasswordHandler}
          value={passwordState.value}
        />

        <p className={classes.error}>{error}</p>
        <p className={classes.success}>{success}</p>

        <div className={classes.actions}>
          {!isLoading && <Button>{isLogin ? "Login" : "Signup"}</Button>}
          {isLoading && <p>Sending...</p>}
          <Button onClick={switchAuthModeHandler} className={classes.toggle}>
            {isLogin ? "Create new acount" : "Login with existing account"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
