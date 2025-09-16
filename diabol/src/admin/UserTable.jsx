export default function UserTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, i) => (
          <tr key={i}>
            <td>{u.fullname}</td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
