import { Routes as RouterSwitch, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import App from '@/App';

export default function Routes() {
  return (
    <RouterSwitch>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
      </Route>
    </RouterSwitch>
  );
}