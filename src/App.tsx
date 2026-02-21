import { useAppDispatch } from '@/hooks';
import { changeLocationAsync } from '@/store/locationSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeLocationAsync())
   
  }, [dispatch])

  return (
    <div>
        <Outlet />
    </div>
  );
}