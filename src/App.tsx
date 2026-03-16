import { useAppDispatch } from '@/hooks';
import { changeLocationAsync } from '@/store/locationSlice';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeLocationAsync())

  }, [dispatch]);

  return (
    <div className='h-full'>
      <BrowserRouter>
          <Routes />
      </BrowserRouter>
    </div>
  );
}