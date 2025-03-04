import './App.css';
import { useQuery, useMutation, gql } from '@apollo/client';

type User = {
  id: string;
  name: string;
  age: number;
  isMarried: boolean;
};

function App() {
  const GET_USERS = gql`
    query GetUsers {
      getUsers {
        id
        name
        age
        isMarried
      }
    }
  `;

  const GET_USER_BY_ID = gql`
    query GetUserById($id: ID!) {
      getUserById(id: $id) {
        id
        name
        age
        isMarried
      }
    }
  `;

  const CREATE_USER = gql`
    mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean) {
      createUser(name: $name, age: $age, isMarried: $isMarried) {
        id
        name
        age
        isMarried
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_USERS);

  const {
    data: getUserByIdData,
    loading: getUserByIdLoading,
    error: getUserByIdError,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: '2' },
  });

  const [createUser] = useMutation(
    CREATE_USER
    //   {
    //   variables: {
    //     name: 'Fred',
    //     age: 32,
    //     isMarried: true,
    //   },
    // }
  );

  const handleClick = async () => {
    await createUser({
      variables: {
        name: 'Fred',
        age: 32,
        isMarried: true,
      },
    });
  };

  if (loading) return <div>Loading...</div>;

  if (error || getUserByIdError) return <h3>error.message</h3>;

  return (
    <>
      <h1>Users</h1>
      <button onClick={handleClick}>Добавить пользователя</button>
      <ol>
        {data.getUsers.map((user: User) => (
          <li key={user.id}>
            {user.name} - {user.age} years old, {user.isMarried ? 'Married' : 'Single'}
          </li>
        ))}
      </ol>
      <div>
        {getUserByIdLoading ? (
          <p>Loading</p>
        ) : (
          <p>{getUserByIdData!.getUserById!.name}</p>
        )}
      </div>
    </>
  );
}

export default App;
