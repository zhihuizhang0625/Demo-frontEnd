import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const usernameinput = useFormInput('');
  const passwordinput = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    const username = usernameinput.value;
    const password = passwordinput.value;
    const student={username, password}
    console.log(student)
    setLoading(true);
    fetch("http://localhost:8080/student/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)

  })
  .then(res=>res.json())
  .then((response)=>{
    console.log(response);
    if(response === true){
      setLoading(false);
      setUserSession(password, username);
      props.history.push('/dashboard');
    }
    // setTags(response);
    // setStudents(result);
  })

}


  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...usernameinput} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...passwordinput} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;