import React from 'react';
import { createRoot } from 'react-dom/client';
import { setupIonicReact, IonApp, IonContent } from '@ionic/react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import Home from './pages/Home';
import List from './pages/List';
import Add from './pages/Add';
import Detail from './pages/Detail';
import Login from './pages/Login';
import { isAuthenticated } from './auth';
import './theme.css';

setupIonicReact();

const Private = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <IonApp>
    <BrowserRouter>
      <IonContent fullscreen>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Private><Home /></Private>} />
          <Route path="/list" element={<Private><List /></Private>} />
          <Route path="/add" element={<Private><Add /></Private>} />
          <Route path="/edit/:id" element={<Private><Add /></Private>} />
          <Route path="/detail/:id" element={<Private><Detail /></Private>} />
        </Routes>
      </IonContent>
    </BrowserRouter>
  </IonApp>
);

createRoot(document.getElementById('root')!).render(<App />);
