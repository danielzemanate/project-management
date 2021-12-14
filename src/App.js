// import logo from './logo.svg';
import { useState, useEffect } from "react";
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
import Inscriptions from "pages/inscriptions/Inscriptions";
import AuthLayout from "layouts/AuthLayouth";
import Register from "pages/auth/Register";
import Login from "pages/auth/Login";
import EditarProjects from "pages/projects/EditarProjects";
import CardsProject from "pages/projects/CardsProject";
import { AuthContext } from "context/authContext";
import { UserContext } from "context/userContext";
import jwt_decode from "jwt-decode";
import PrivateRoute from "components/PrivateRoute";
import NuevoProyecto from "pages/projects/NuevoProyecto";
import Avances from "pages/avances/Avances";
import NuevoAvance from "pages/avances/NuevoAvance";
import { Profile } from "pages/users/Profile";

// CREATE HHTPLINK FROM QUERYS
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  // uri: "https://servidor-gql-mintic-nuevo.herokuapp.com/graphql",
});

// ENVIAR TOKEN MEDIANTE HEADER
const authLink = setContext((_, { headers }) => {
  // get the authentication token from  local storage if it exists
  const token = JSON.parse(localStorage.getItem("token"));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState("");

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  };

  // OBTENER DATOS USUARIO DESDE EL TOKEN
  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
        estado: decoded.estado,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              {/* RUTAS PRIVADAS */}
              <Route path="admin" element={<PrivateLayout />}>
                <Route path="landingAdmin" element={<LandingAdmin />} />
                <Route path="profile" element={<Profile />} />
                <Route
                  path="users"
                  element={
                    <PrivateRoute roleList={["ADMINISTRADOR","LIDER"]}>
                      <UsersAdmin />
                    </PrivateRoute>
                  }
                />
                <Route path="users/edit/:_id" element={<EditUsers />} />
                {/* <Route path="projects" element={<Projects />} /> */}
                <Route path="cardsprojects" element={<CardsProject />} />
                <Route path="cardsprojects/nuevo" element={<NuevoProyecto />} />
                <Route
                  path="projects/editar/:_id"
                  element={<EditarProjects />}
                />
                <Route path="inscriptions" element={<Inscriptions />} />
                <Route path="avances" element={<Avances />} />
                <Route path="avances/nuevo/:_id" element={<NuevoAvance />} />
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
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
