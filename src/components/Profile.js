import React, { useState, useEffect } from 'react';

function Profile() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://192.168.100.231:7087/Users", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
        })
          .catch(error => console.log('error', error));
      }, [])
  return (
    <div>Profile</div>
  )
}

export default Profile