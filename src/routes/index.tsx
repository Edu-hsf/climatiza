import { Routes as RouterSwitch, Route } from 'react-router-dom';
import { Home } from '../pages/Home';

export default function Routes() {
  return (
    <RouterSwitch>
      <Route path="/" element={<Home />} />
    </RouterSwitch>
  );
}