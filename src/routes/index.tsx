import { Routes as RouterSwitch, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Settings } from '@/pages/Settings';
import { DetailedForecast } from '@/pages/DetailedForecast';

export default function Routes() {
  return (
    <RouterSwitch>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/detailedForecast" element={<DetailedForecast/>}/>
    </RouterSwitch>
  );
}