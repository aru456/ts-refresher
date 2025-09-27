import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  getUsers,
  type User,
} from "./services/userService";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers().then(setUsers).catch(() => setError("Failed to fetch users"));
  }, []);

  const handleAddUser = async () => {
    if (!name) return;
    try {
      const newUser = await createUser({ name });
      setUsers([...users, newUser]);
      setName("");
    } catch {
      setError("Failed to add user");
    }
  };

  const handleDeleteUser = async (id: number | undefined) => {
    if (id === undefined) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        setError("Failed to delete user");
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>User Management</h2>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Add User Form */}
      <Row>
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter full name"
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="primary" onClick={handleAddUser}>
              Add User
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Users Table */}
      <Row>
        <Col md={6}>
          <Table striped bordered hover responsive >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No users found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
