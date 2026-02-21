import { useAppDispatch, useAppSelector } from '@/hooks';
import { changeLocationAsync } from '@/store/locationSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeLocationAsync())
   
  }, [dispatch])

  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}