import { IonPage, IonContent, IonButton, IonSearchbar, IonSelect, IonSelectOption, IonLabel, IonBadge, IonChip } from '@ionic/react';
import { loadTasks, toggleDone, removeTask, Task } from '../services';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { checkmarkCircle, closeOutline, trashOutline, listOutline } from 'ionicons/icons';
import { logout } from '../auth';

export default function List() {
  const nav = useNavigate();
  const loc = useLocation();
  const [params] = useSearchParams();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<'All'|'Trabajo'|'Casa'|'Negocios'|'Personal'|'Estudios'|'Salud'|'Finanzas'|'Compras'|'Viajes'|'Deportes'|'Entretenimiento'|'Proyectos'>('All');
  const [statusFilter, setStatusFilter] = useState<'all'|'pending'|'done'>('all');
  const tasks = loadTasks();
  const pendingCount = tasks.filter(t => !t.done).length;
  const doneCount = tasks.filter(t => t.done).length;

  useEffect(() => {
    const s = params.get('status');
    if (s === 'pending' || s === 'done') setStatusFilter(s);
  }, [params]);

  const filtered = useMemo(() => {
    return tasks.filter(t => {
      const matchesFilter = filter === 'All' ? true : t.type === filter;
      const matchesStatus = statusFilter === 'all' ? true : statusFilter === 'pending' ? !t.done : t.done;
      const text = (t.title + ' ' + (t.desc||'')).toLowerCase();
      const matchesSearch = text.includes(q.toLowerCase());
      return matchesFilter && matchesSearch && matchesStatus;
    });
  }, [tasks, q, filter, statusFilter]);

  const onToggle = (id: string) => { toggleDone(id); nav(0); };
  const onDelete = (id: string) => { if (confirm('¿Eliminar esta tarea?')) { removeTask(id); nav(0); } };
  const onLogout = () => { logout(); nav('/login', { replace: true }); };

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
          <div className="filters" style={{textAlign:'center', display:'grid', gap:'12px'}}>
            <IonSearchbar value={q} onIonChange={e=>setQ(e.detail.value||'')} placeholder="Buscar por título o descripción" />

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              <IonButton expand="block" color={statusFilter === 'pending' ? 'primary' : 'light'} onClick={()=>setStatusFilter('pending')} style={{height:'54px', fontWeight:600}}>
                Pendientes ({pendingCount})
              </IonButton>
              <IonButton expand="block" color={statusFilter === 'done' ? 'primary' : 'light'} onClick={()=>setStatusFilter('done')} style={{height:'54px', fontWeight:600}}>
                Completadas ({doneCount})
              </IonButton>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
              <IonLabel style={{minWidth:'80px', textAlign:'left'}}>Categoría:</IonLabel>
              <IonSelect 
                className="input-rounded" 
                value={filter} 
                onIonChange={e=>setFilter(e.detail.value as any)}
                interface="popover"
                style={{flex:1}}
              >
                <IonSelectOption value="All">Todos</IonSelectOption>
                <IonSelectOption value="Trabajo">Trabajo</IonSelectOption>
                <IonSelectOption value="Casa">Casa</IonSelectOption>
                <IonSelectOption value="Negocios">Negocios</IonSelectOption>
                <IonSelectOption value="Personal">Personal</IonSelectOption>
                <IonSelectOption value="Estudios">Estudios</IonSelectOption>
                <IonSelectOption value="Salud">Salud</IonSelectOption>
                <IonSelectOption value="Finanzas">Finanzas</IonSelectOption>
                <IonSelectOption value="Compras">Compras</IonSelectOption>
                <IonSelectOption value="Viajes">Viajes</IonSelectOption>
                <IonSelectOption value="Deportes">Deportes</IonSelectOption>
                <IonSelectOption value="Entretenimiento">Entretenimiento</IonSelectOption>
                <IonSelectOption value="Proyectos">Proyectos</IonSelectOption>
              </IonSelect>
            </div>
          </div>
          <div style={{display:'grid',gap:10}}>
            {filtered.length===0 ? (
              <div className="card" style={{textAlign:'center'}}>No hay tareas aún. Agrega una nueva.</div>
            ) : filtered.map(t => (
              <div key={t.id} className="card row">
                <div onClick={()=>nav(`/detail/${t.id}`)} style={{cursor:'pointer'}}>
                  <div style={{fontWeight:600}}>{t.title}</div>
                  <div style={{fontSize:12,color:'#555'}}>{t.type} • {t.desc || 'Sin descripción'}</div>
                  <div className="badges">
                    {t.tags?.map(tag => (
                      <IonBadge key={tag} color="dark">{tag}</IonBadge>
                    ))}
                    {t.done && <IonChip color="success" outline><IonIcon icon={checkmarkCircle} /> Completada</IonChip>}
                  </div>
                </div>
                <div className="actions">
                  <IonButton onClick={()=>onToggle(t.id)}>
                    <IonIcon slot="start" icon={t.done ? closeOutline : checkmarkCircle} />
                    {t.done?'Desmarcar':'Completar'}
                  </IonButton>
                  <IonButton color="medium" onClick={()=>onDelete(t.id)}>
                    <IonIcon slot="start" icon={trashOutline} />
                    Eliminar
                  </IonButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
