import { useEffect, useState } from "react";
import userService, { CanceledError, User } from "../services/user-service";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => cancel(); //abort fetch if navigate away
  }, []);


  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    setError("");
    userService.deleteUser(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const newUser: User = { id: 0, name: "michael" };
    const originalUsers = [...users];

    setUsers([newUser, ...users]); // Note that this does not mutate users.. so it new item is still not in the users list when used below for successfull return
    setError("");
    // note the destructuring to an alias of savedUser
    userService.addUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const updatedUser = { ...user, name: user.name + "!" };
    const originalUsers = [...users];
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    setError("");
    // Note put replaces an object, patch updates properties... we are sending whole object so patch seems stoopid
    userService.updateUser(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            ({user.id}){user.name}
            <div>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersList;
