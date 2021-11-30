// import logo from './logo.svg';
import { useState } from "react";
import "styles/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "pages/Home";
import Users from "pages/Users";
import PublicLayout from "layouts/PublicLayout";
import NotFoundPage from "pages/NotFoundPage";
import PrivateLayout from "layouts/PrivateLayout";
import LandingAdmin from "pages/admin/LandingAdmin";
import UsersAdmin from "pages/users/UsersAdmin";
import EditUsers from "pages/users/EditUsers";
import Projects from "pages/projects/Projects";
import Inscriptions from "pages/inscriptions/Inscriptions";
import AuthLayout from "layouts/AuthLayouth";
import Register from "pages/auth/Register";
import Login from "pages/auth/Login";
import { AuthContext } from "context/authContext";

// CREATE HHTPLINK FROM QUERYS
const httpLink = createHttpLink({
  // uri: 'http://localhost:4000/graphql',
  uri: 'https://servidor-gql-mintic-nuevo.herokuapp.com/graphql',
});

// ENVIAR TOKEN MEDIANTE HEADER
const authLink = setContext((_, { headers }) => {
  // get the authentication token from  local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// CLIENTE APOLLO CONFIG
const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  // uri: "https://servidor-gql-mintic-nuevo.herokuapp.com/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState("");

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
  };

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <BrowserRouter>
          <Routes>
            {/* RUTAS PRIVADAS */}
            <Route path="admin" element={<PrivateLayout />}>
              <Route path="landingAdmin" element={<LandingAdmin />} />
              <Route path="users" element={<UsersAdmin />} />
              <Route path="users/edit/:_id" element={<EditUsers />} />
              <Route path="projects" element={<Projects />} />
              <Route path="inscriptions" element={<Inscriptions />} />
              {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
            {/* AUTH */}
            <Route path="auth" element={<AuthLayout />}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
            {/* RUTAS PUBLICAS */}
            <Route path="/" element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/aboutUs" element={<Users />} />
              {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
