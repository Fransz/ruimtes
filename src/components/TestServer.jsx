import {useState, useEffect} from "react"
function Test() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      fetch(`http://localhost:3002/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default Test;
