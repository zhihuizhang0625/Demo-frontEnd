// import React from 'react';
import { getToken, getUser, removeUserSession } from './Utils/Common';
import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import { Paper} from '@material-ui/core';


function Dashboard(props) {
  const user = getUser();
  const token = getToken()
  const[labelname,setLabelname]=useState('')
  const[newname,setNewLabelname]=useState('')
  const[labelname1,addLabelname]=useState('')
  const[labelname2,deleteLabelname]=useState('')
  const[tags,setTags]=useState([])

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  const AddTagClick= (e)=>{
    e.preventDefault()
    const labelname = labelname1
    const tag={labelname}
    const url = (
      "http://localhost:8080/student/addTag?" +
      new URLSearchParams({ username: user.toString(),
        password: token.toString()}).toString()
    )
    console.log(url)
    fetch(url,{ 
      method:"Post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(tag)
    })
    .then((result)=>{
      console.log(result.text())
      const newurl = (
        "http://localhost:8080/student/getTagList?" +
        new URLSearchParams({ username: user.toString(),
          password: token.toString()}).toString()
      );
      fetch(newurl).then(res=>res.json())
      .then((result)=>{
        setTags(result);
      }
    )
    }
    ,
    [])
    };

  const DeleteTagClick= (e)=>{
    e.preventDefault()
    const labelname = labelname2
    const tag={labelname}
    const url = (
      "http://localhost:8080/student/deleteTag?" +
      new URLSearchParams({ username: user.toString(),
        password: token.toString()}).toString()
    )
    console.log(url)
    console.log(JSON.stringify(tag))
    fetch(url,{ 
      method:"Delete",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(tag)
    })
  .then((result)=>{
    console.log(result.text())
    const newurl = (
      "http://localhost:8080/student/getTagList?" +
      new URLSearchParams({ username: user.toString(),
        password: token.toString()}).toString()
    );
    fetch(newurl).then(res=>res.json())
    .then((result)=>{
      setTags(result);
    }
  )
  }
  ,
  [])
  };

  const RenameTagClick= (e)=>{
    e.preventDefault()
    const tag={labelname}
    const newtag = newname
    const url = (
      "http://localhost:8080/student/updateTag?" +
      new URLSearchParams({ newname:newname.toString(),username: user.toString(),
        password: token.toString()}).toString()
    )
    console.log(url)
    fetch(url,{ 
      method:"Put",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(tag)
    })
  .then((result)=>{
    console.log(result.text())
    const newurl = (
      "http://localhost:8080/student/getTagList?" +
      new URLSearchParams({ username: user.toString(),
        password: token.toString()}).toString()
    );
    fetch(newurl).then(res=>res.json())
    .then((result)=>{
      setTags(result);
    }
  )
  }
  ,
  [])
  };
  
  
  useEffect(()=>{
    const url = (
      "http://localhost:8080/student/getTagList?" +
      new URLSearchParams({ username: user.toString(),
        password: token.toString()}).toString()
    );
    console.log(url)
    fetch(url)
    
//     let params = {
//   "param1": "value1",
//   "param2": "value2"
// };

// let query = Object.keys(params)
//              .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
//              .join('&');

// let url = 'https://example.com/search?' + query;
    // fetch("http://localhost:8080/label/getAll")
    // ,{ 
    //   method:"GET",
    //   headers:{"Content-Type":"application/json"},
    //   body:JSON.stringify(user)
    // }
    .then(res=>res.json())
    .then((result)=>{
      setTags(result);
    }
  )
  }
  ,
  [])
  
  
  return (
    <div>
      
      Welcome {user}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
      <h3 style={{color:"black"}}>Add Tag</h3>

<form id="sign-up">

 <input id="outlined-basic" label="Tag name" variant="outlined" fullWidth 
 value={labelname1}
 onChange={(e)=>addLabelname(e.target.value)}
 />
 <button variant="contained" color="blue" onClick={AddTagClick}>
Add
</button>
</form>

<h3 style={{color:"black"}}>Delete Tag</h3>

<form id="delete_tag">

 <input id="outlined-basic" label="Tag name" variant="outlined" fullWidth 
 value={labelname2}
 onChange={(e)=>deleteLabelname(e.target.value)}
 />
 <button variant="contained" color="blue" onClick={DeleteTagClick}>
Delete
</button>
</form>

<h3 style={{color:"black"}}>Rename Tag</h3>

<form id="rename_tag">

 <input id="outlined-basic" label="Tag name" variant="outlined" fullWidth 
 value={labelname}
 onChange={(e)=>setLabelname(e.target.value)}
 />
 to 
<input id="outlined-basic" label="Tag name" variant="outlined" fullWidth 
 value={newname}
 onChange={(e)=>setNewLabelname(e.target.value)}
 />

 <button variant="contained" color="blue" onClick={RenameTagClick}>
Rename
</button>

</form>

<h3>Tags</h3>
{tags.map(tag=>(
    <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={tag.id}>
     Tag id: {tag.id}<br/>
     Tag Name: {tag.labelname}<br/>
     

    </Paper>
  ))
}
      
      
    </div>
  );
}

export default Dashboard;
