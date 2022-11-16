import '../css/main.scss';
import { Outlet } from 'react-router-dom';

export default function Main() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
