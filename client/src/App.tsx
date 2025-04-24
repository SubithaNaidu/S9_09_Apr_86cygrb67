import { Routes, Route } from 'react-router-dom';
import AdminPage from './admin/AdminPage';
import Signin from './editor/Signin';
import LoginPage from './editor/Login';
import Unauthorized from './editor/Unauthorized';
import ProtectedRoute from './ProtectedRoute';
import Home from './editor/Home';
import AddPost from './editor/AddPost';
import EditPage from './editor/EditPage';
import User from './admin/User';
import Posts from './admin/Posts';
import Category from './admin/Category';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/signup" element={<Signin/>}></Route>
      

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<User/>} />
        <Route path="/admin/posts" element={<Posts/>} />
        <Route path="/admin/categories" element={<Category/>} />
      </Route>

     
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/" element={<Home />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Route>
      
    </Routes>
  );
}

export default App;
