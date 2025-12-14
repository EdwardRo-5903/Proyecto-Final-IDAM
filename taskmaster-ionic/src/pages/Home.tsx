import { IonPage, IonContent, IonButton, IonBadge } from '@ionic/react';
import { loadTasks, TaskType } from '../services';
import { Link, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { addCircle, listOutline } from 'ionicons/icons';
import { logout } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();
  const loc = useLocation();
  const tasks = loadTasks();
  const allTypes: TaskType[] = ['Trabajo','Casa','Negocios','Personal','Estudios','Salud','Finanzas','Compras','Viajes','Deportes','Entretenimiento','Proyectos'];
  const types = allTypes.filter(t => tasks.some(x => x.type === t));

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="header">
          <div className="brand"><span>✔</span><span>TaskMaster</span></div>
          <div className="nav">
            <Link to="/home" className={loc.pathname === '/home' ? 'active' : ''}>Inicio</Link>
            <Link to="/list" className={loc.pathname === '/list' ? 'active' : ''}>Lista</Link>
            <Link to="/add" className={`primary ${loc.pathname === '/add' ? 'active' : ''}`}>Agregar</Link>
            <IonButton size="small" color="medium" onClick={()=>{logout(); nav('/login', {replace:true});}}>Salir</IonButton>
          </div>
        </div>
        <div className="container">
          <h1 style={{color:'#111', textAlign:'center', fontSize:'32px', margin:'16px 0'}}>Mis Tareas</h1>
          {/* Bloques de pendientes/completadas removidos a solicitud; se mantienen solo las categorías */}
          <div style={{display:'grid',gap:12,marginTop:16}}>
            {types.map(type => {
              const group = tasks.filter(t=>t.type===type);
              if (group.length===0) return null;
              return (
                <div key={type} className="card" style={{display:'grid', gap:8}}>
                  <h3 style={{textAlign:'center', margin:0}}>Categoría: {type}</h3>
                  <div style={{display:'grid', gap:8}}>
                    {group.map(t=> (
                      <div key={t.id} className="row" style={{background:'#f3f3f3',borderRadius:12,padding:10}}>
                        <div>
                          <div style={{fontWeight:600}}>{t.title}</div>
                          <div style={{fontSize:12,color:'#555'}}>{t.done?'Completada':'Pendiente'} • {t.type}</div>
                          <div className="badges">
                            {t.tags?.map(tag => (<IonBadge key={tag} color="dark">{tag}</IonBadge>))}
                          </div>
                        </div>
                        <Link to={`/detail/${t.id}`}><IonButton>Ver</IonButton></Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="actions" style={{marginTop:16, justifyContent:'center'}}>
            <Link to="/list"><IonButton><IonIcon slot="start" icon={listOutline} />Ver Resumen</IonButton></Link>
            <Link to="/add"><IonButton color="dark"><IonIcon slot="start" icon={addCircle} />Agregar Tarea</IonButton></Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
