import axios from 'axios'
import { usersLink } from '../../../components/Constants'

export const createAccount = async (setMessage,first_name,last_name,email,password1,password2,navigation) => {
    if(first_name === '' || last_name === '' || email === '' || password1 === '' || password2 === ''){
      setMessage('All fields must be provided!..')
    }else if(password1 != password2){
      setMessage('Passwords must be the same!..')
    }else if(!isValidEmail(email)){
      setMessage('Email must correct!..')
    }else if(!isValidPassword(password1)){
      setMessage('Password must be at least 8 characters, contain at least one number and big character!..')
    }else if(password1.toLowerCase().includes(first_name.toLowerCase()) || password1.toLowerCase().includes(last_name.toLowerCase()) || hasSimilarSubstrings(email, password1, 4)){
      setMessage('Password is too similar to your credentials!..')
    }else if(await isEmailTaken(email)){
      setMessage('This email already exists')
    }else{
      try {
        const result = await axios.post('http://localhost:8000/custom_register', {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password1: password1,
          password2: password2
        });
  
        console.log(result.status);
        setMessage('Account created successfuly!')
        navigation.navigate('Login')
        return result
      } catch (error) {
        console.log(error.message);
      }
    }
  }

function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }

function isValidPassword(password) {
    // Password must be at least 8 characters, contain at least one number, and one uppercase letter
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

function hasSimilarSubstrings(email, password, minCommonChars) {
    const emailSubstrings = getAllSubstrings(email);
    const passwordSubstrings = getAllSubstrings(password);
  
    // Check if there are common substrings with at least minCommonChars characters in common
    const commonSubstrings = emailSubstrings.some(emailSubstring =>
      passwordSubstrings.some(passwordSubstring =>
        hasConsecutiveCommonChars(emailSubstring, passwordSubstring, minCommonChars)
      )
    );
  
    return commonSubstrings;
  }
  
function getAllSubstrings(str) {
    const substrings = [];
    for (let i = 0; i < str.length; i++) {
      for (let j = i + 1; j <= str.length; j++) {
        substrings.push(str.slice(i, j));
      }
    }
    return substrings;
  }
  
function hasConsecutiveCommonChars(str1, str2, minCommonChars) {
    let consecutiveCount = 0;
  
    for (let i = 0; i < str1.length; i++) {
      if (str2.includes(str1[i])) {
        consecutiveCount++;
        if (consecutiveCount >= minCommonChars) {
          return true;
        }
      } else {
        consecutiveCount = 0;
      }
    }
  
    return false;
  }

async function isEmailTaken(email) {
    try {
      const response = await axios.get(usersLink());
      const users = response.data;
  
      const foundUser = users.find(user => user.email === email);
  
      if (foundUser) {
        console.log('Email is already in the database: ' + email);
        return true;
      } else {
        console.log('Email not found in the database: ' + email);
        return false;
      }
    } catch (error) {
      console.error('Error checking email in the database:', error.message);
      return false;
    }
  }

