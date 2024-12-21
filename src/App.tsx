import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import appRoutes from './routes/appRoutes';
import generateRoutes from './routes/generateRoutes';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <>
      <div className="fixed top-0 z-[49] w-full bg-white">
        <Navbar />
      </div>
      <div className="absolute right-0 top-4 w-1/4">
        <ToastContainer />
      </div>
      <div className="min-h-screen w-full bg-[#F4F7FE] px-4 pb-[2rem] pt-[6rem]">
        <div className="mx-auto w-11/12">
          {generateRoutes({ routes: appRoutes })}
        </div>
      </div>
    </>
  );
}

export default App;
