export const validateAndTrySignIn = async (signIn,setMessage,username,password) => {
  if (username == '' || password == '') {
    setMessage('Username and password must be provided!');
  } else {
    setMessage('');

    try {
      const e = await signIn({ username, password });

      // Check if the response has a 'response' property before accessing 'status'
      if (e.response && e.response.status === 400) {
        setMessage('Username or password is incorrect');
      }
    } catch (error) {
      // Handle other errors, or log the error for debugging purposes
      console.error('Error during sign-in:', error);
    }

  }
};