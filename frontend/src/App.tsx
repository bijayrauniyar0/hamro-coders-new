import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import appRoutes from './routes/appRoutes';
import generateRoutes from './routes/generateRoutes';
import Navbar from './components/common/Navbar';
import { useLocation } from 'react-router-dom';

function App() {
  const routesWithoutNavbar = ['/login', '/signup'];
  const { pathname } = useLocation();
  const showNavbar = !routesWithoutNavbar.some(route =>
    pathname.includes(route),
  );

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="absolute right-0 top-4 w-1/4">
        <ToastContainer />
      </div>
      {generateRoutes({ routes: appRoutes })}
    </>
  );
}

export default App;
