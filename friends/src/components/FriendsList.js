import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const FriendsList = () => {
  const [friendsList, setFriendsList] = useState([]);
  const [newFriend, setNewFriend] = useState({
    id: Date.now(),
    name: '',
    age: '',
    email: '',
  });


  useEffect(() => {
    axiosWithAuth()
      .get('/api/friends')
      .then((response) => {
        setFriendsList(response.data);
      })
      .catch((err) => console.log({err}));
  }, []);

  const handleChange = (event) => {
    setNewFriend({...newFriend, [event.target.name]: event.target.value});
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
    .post('/api/friends', newFriend)
    .then((response) => {
      console.log("response", response.data);
      setFriendsList(response.data);
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
    <h1>Welcome to the Friends page!</h1>
    <h3>Add a new Friend!</h3>
    <form onSubmit={handleSubmit}>
      <label>
        Name 
          <input 
            name='name'
            value={newFriend.name}
            onChange={handleChange}
          />
      </label>
      <label>
        Age 
          <input 
            name="age"
            value={newFriend.age}
            onChange={handleChange}
          />
      </label>
      <label>
        Email 
          <input 
            name="email"
            value={newFriend.email}
            onChange={handleChange}
          />
      </label>
      <button type="submit">Add new friend!</button>
     
    </form>
    {friendsList.map((friend) => {
      return (
        <div className="friend">
          <h3>{friend.name}</h3>
          <h3>{friend.age} years old</h3>
          <h3>{friend.email}</h3> 
          <button onClick={(event) => {
            event.preventDefault();
            axiosWithAuth()
            .delete(`api/friends/${friend.id}`)
            .then(response => {
             setFriendsList(response.data)
        })
            .catch(err => console.log(err));
      }}
            >Delete Friend</button>
        </div>
      )
    })}
    </>
  )
}

export default FriendsList;