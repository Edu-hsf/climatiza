import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

export default function App() {
  return (
    <div className='h-full mb-6'>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}