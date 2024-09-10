import { Home, Products, Posts, Todos, Users, NotFound } from 'src/components/pages';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/products', element: <Products /> },
  { path: '/posts', element: <Posts /> },
  { path: '/todos', element: <Todos /> },
  { path: '/users', element: <Users /> },
  { path: '*', element: <NotFound /> },
];

export { routes };
