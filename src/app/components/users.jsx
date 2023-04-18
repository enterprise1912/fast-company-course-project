import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
  return (
    <>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="colSpan">Имя</th>
              <th scope="colSpan">Качества</th>
              <th scope="colSpan">Профессия</th>
              <th scope="colSpan">Встретился, раз</th>
              <th scope="colSpan">Оценка</th>
              <th scope="colSpan">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user._id} {...user} {...rest} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
