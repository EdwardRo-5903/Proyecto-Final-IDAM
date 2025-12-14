import { IonPage, IonContent, IonButton, IonBadge } from '@ionic/react';
import { getTask, toggleDone, removeTask } from '../services';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { checkmarkCircle, closeOutline, trashOutline, arrowBack, pencilOutline } from 'ionicons/icons';
import { logout } from '../auth';

export default function Detail() {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const t = id ? getTask(id) : undefined;
  const onLogout = () => { logout(); nav('/login', { replace: true }); };

  const onToggle = () => { if(!id) return; toggleDone(id); nav(0); };
  const onDelete = () => { if(!id) return; if (confirm('¿Eliminar esta tarea?')) { removeTask(id); nav('/list'); } };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="header">
          <div className="brand"><span>✔</span><span>TaskMaster</span></div>
          <div className="nav">
            <Link to="/home" className={loc.pathname === '/home' ? 'active' : ''}>Inicio</Link>
            <Link to="/list" className={loc.pathname === '/list' ? 'active' : ''}>Lista</Link>
            <Link to="/add" className={`primary ${loc.pathname === '/add' ? 'active' : ''}`}>Agregar</Link>
            <IonButton size="small" color="medium" onClick={onLogout}>Salir</IonButton>
          </div>
        </div>

        <div className="container">
          {!t ? (
            <div className="card" style={{textAlign:'center'}}>Tarea no encontrada.</div>
          ) : (
            <div className="card" style={{textAlign:'center'}}>
              <h2>{t.title}</h2>
              <p style={{color:'#333'}}>{t.type}</p>
              <p>{t.desc || 'Sin descripción'}</p>
              <div className="badges">
                {t.tags?.map(tag => (<IonBadge key={tag} color="dark">{tag}</IonBadge>))}
              </div>
              {t.dueDate && (
                <p style={{color:'#555'}}>Vencimiento: {new Date(t.dueDate).toLocaleDateString('es-ES')}</p>
              )}
              <p style={{color:'#333'}}>Estado: {t.done ? 'Completada' : 'Pendiente'}</p>
              <div className="actions" style={{justifyContent:'center'}}>
                <IonButton color="primary" onClick={()=>nav(`/edit/${id}`)}>
                  <IonIcon slot="start" icon={pencilOutline} />
                  Editar
                </IonButton>
                <IonButton onClick={onToggle}>
                  <IonIcon slot="start" icon={t.done ? closeOutline : checkmarkCircle} />
                  {t.done?'Desmarcar':'Completar'}
                </IonButton>
                <IonButton color="medium" onClick={onDelete}>
                  <IonIcon slot="start" icon={trashOutline} />
                  Eliminar
                </IonButton>
                <Link to="/list"><IonButton><IonIcon slot="start" icon={arrowBack} />Volver</IonButton></Link>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
