import { Routes, Route, Outlet, Link } from "react-router-dom";
import Listmain from './components/Listmain';
import './components/page1form1';
import Mailform from './components/page1form1';
import Secondform from './components/Secondform';
import Form3page1 from './components/Form3page1';
import './components/List.css';
import './components/page1form1.css';
import "./components/Secondform.css";
import './App.css'

export default function App() {
  return (
    <div className="ToDo_App">
      {/*Router*/}

      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="list" element={<List />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <header className="header">
      <h1 className="maintitle">To Do App</h1>
      <Outlet />
    </header>
  );
}

function Login() {
  return (
    <div className="login">
      <Mailform />
      <Secondform />
      <Form3page1 />
    </div>
  );
}

function List() {
  return (
    <div>
      <Listmain />
    </div>
  );
}