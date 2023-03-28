import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
const[isAuthenticate,setIsAuthenticate]=useState(false);
const authCtx=useContext(AuthContext)

const signupHandler=async({email,password})=>{
  setIsAuthenticate(true)
  try {
    
    const token=await createUser(email,password)
    authCtx.authenticate(token)
  } catch (error) {
    Alert.alert('Authentication failed','could not create user  please check username and password')
    setIsAuthenticate(false)
  }

}
if(isAuthenticate){
  return <LoadingOverlay message='Creating user ...'/>
}

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;