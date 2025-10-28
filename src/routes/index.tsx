import { Routes as RouterSwitch, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function Routes() {
  return (
    <RouterSwitch>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </RouterSwitch>
  );
}