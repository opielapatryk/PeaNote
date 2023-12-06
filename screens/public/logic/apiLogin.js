export const validateAndTrySignIn = async (signIn,setMessage,username,password) => {
  if (username == '' || password == '') {
    setMessage('Username and password must be provided!');
  } else {
    setMessage('');
    try {
      const e = await signIn({ username, password });
      if (e.response && e.response.status === 400) {
        setMessage('Username or password is incorrect');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }

  }
};