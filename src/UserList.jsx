import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setListOfUsers(data.users);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch users: ' + err.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) return <div className="text-center mt-10 text-xl">Loading users...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listOfUsers.map((user) => (
          <div 
            key={user.id} 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <img 
                src={user.image} 
                alt={user.firstName} 
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Company:</strong> {user.company.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;