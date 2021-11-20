// import logo from './logo.svg';
import "styles/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  // createHttpLink,
  InMemoryCache,
} from "@apollo/client";
// import Home from "pages/Home";
// import Users from "pages/Users";
// import PublicLayout from "layouts/PublicLayout";
// import NotFoundPage from "pages/NotFoundPage";
import PrivateLayout from "layouts/PrivateLayout";
import LandingAdmin from "pages/admin/LandingAdmin";
import UsersAdmin from "pages/users/UsersAdmin";
import EditUsers from "pages/users/EditUsers";
import Projects from "pages/projects/Projects";
import Inscriptions from "pages/inscriptions/Inscriptions";


function App() {
  // CREATE HHTPLINK FROM QUERYS
  // const httpLink = createHttpLink({
  //   uri: 'https://servidor-gql-mintic-nuevo.herokuapp.com/graphql',
  // });

  // CLIENTE APOLLO CONFIG
  const client = new ApolloClient({
    uri: "https://servidor-gql-mintic-nuevo.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          {/* RUTAS PRIVADAS */}
            <PrivateLayout>
              <Routes>
                <Route path="/" element={<LandingAdmin />} />
                <Route path="/users" element={<UsersAdmin />} />
                <Route path="/users/edit/:_id" element={<EditUsers />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/inscriptions" element={<Inscriptions />} />
              </Routes>
            </PrivateLayout>
          {/* RUTAS PUBLICAS */}
          {/* <PublicLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PublicLayout> */}
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
