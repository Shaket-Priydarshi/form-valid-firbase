import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
function LoginScreen() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const authCtx=useContext(AuthContext)
  const loginHandler = async ({ email, password }) => {
    setIsAuthenticate(true);
  try {
    
   const token= await login(email, password);
    authCtx.authenticate(token)
  } catch (error) {
    Alert.alert('Authentication failed','could not login in please check credentials')
    setIsAuthenticate(false);
  }
 
  };
  if (isAuthenticate) {
    return <LoadingOverlay message="Login user ..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
