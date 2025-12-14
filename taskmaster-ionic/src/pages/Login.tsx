import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel } from '@ionic/react';
import { useState } from 'react';
import { login, register } from '../auth';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { logInOutline, keyOutline, personAddOutline, swapHorizontal, eye, eyeOff } from 'ionicons/icons';

export default function Login() {
  const nav = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login'|'register'>('login');
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async () => {
    try {
      if (mode === 'login') {
        await login(user, pass);
      } else {
        await register(user, pass);
      }
      nav('/home', { replace: true });
    } catch (e: any) {
      setError(e.message || 'Error al iniciar sesión');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="login-frame">
          <div className="login-card">
            <div className="brand-row">
              <span className="brand-icon">✔</span>
              <span className="brand-text">TaskMaster</span>
            </div>
            <h2>{mode === 'login' ? 'Inicio de Sesión' : 'Registro'}</h2>
            <IonLabel position="stacked">Usuario</IonLabel>
            <IonInput className="input-rounded" placeholder="Usuario" value={user} onIonChange={e=>setUser(e.detail.value||'')} />
            <IonLabel position="stacked">Contraseña</IonLabel>
            <div className="input-password-wrapper">
              <IonInput className="input-rounded" type={showPass ? 'text' : 'password'} placeholder="Contraseña" value={pass} onIonChange={e=>setPass(e.detail.value||'')} />
              <button className="eye-toggle" onClick={()=>setShowPass(!showPass)}>
                <IonIcon icon={showPass ? eyeOff : eye} />
              </button>
            </div>
            {error && <div className="error-text">{error}</div>}
            <IonButton expand="block" color="dark" onClick={onSubmit}>
              <IonIcon slot="start" icon={mode === 'login' ? logInOutline : personAddOutline} />
              {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </IonButton>
            <IonButton fill="clear" color="medium" onClick={()=>setPass('')}>
              <IonIcon slot="start" icon={keyOutline} />
              Recuperar Contraseña
            </IonButton>
            <IonButton fill="clear" color="dark" onClick={()=>{ setMode(mode==='login'?'register':'login'); setError(''); }}>
              <IonIcon slot="start" icon={swapHorizontal} />
              {mode === 'login' ? 'Crear cuenta nueva' : 'Ya tengo cuenta'}
            </IonButton>
            <div className="helper-text">Usuarios se guardan en este dispositivo (localStorage).</div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
