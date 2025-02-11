import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SortUsers from './SortUsers';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('/users')
      .then(response => {
        const sortedUsers = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setUsers(sortedUsers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    const sortedUsers = [...users].sort((a, b) => {
      return newOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    setUsers(sortedUsers);
  };

  return (
    <div id="container" className="container m-3">
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>email</td>
            <td>phone</td>
            <td>registration_date</td>
            <td>status</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.registration_date}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SortUsers onSort={handleSort} />
    </div>
  );
};

export default UsersTable;