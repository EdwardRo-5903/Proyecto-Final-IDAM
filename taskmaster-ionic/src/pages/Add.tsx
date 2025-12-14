import { IonPage, IonContent, IonButton, IonInput, IonTextarea, IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonDatetime, IonChip, IonSearchbar } from '@ionic/react';
import { addTask, updateTask, getTask, TaskTag, PRESET_TAGS } from '../services';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { saveOutline, homeOutline, closeCircle } from 'ionicons/icons';
import { logout } from '../auth';

export default function Add() {
  const nav = useNavigate();
  const loc = useLocation();
  const { id } = useParams<{ id?: string }>();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState<'Trabajo'|'Casa'|'Negocios'|'Personal'|'Estudios'|'Salud'|'Finanzas'|'Compras'|'Viajes'|'Deportes'|'Entretenimiento'|'Proyectos'|''>('');
  const [tags, setTags] = useState<TaskTag[]>([]);
  const [dueDate, setDueDate] = useState<string>('');
  const [tagSearch, setTagSearch] = useState('');
  const [newTagInput, setNewTagInput] = useState('');

  useEffect(() => {
    if (id) {
      const task = getTask(id);
      if (task) {
        setTitle(task.title);
        setDesc(task.desc || '');
        setType(task.type);
        setTags(task.tags || []);
        if (task.dueDate) {
          setDueDate(new Date(task.dueDate).toISOString());
        }
      }
    }
  }, [id]);

  const filteredTags = useMemo(() => {
    if (!tagSearch.trim()) return PRESET_TAGS;
    return PRESET_TAGS.filter(tag => 
      tag.toLowerCase().includes(tagSearch.toLowerCase())
    );
  }, [tagSearch]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleAddCustomTag = () => {
    if (newTagInput.trim()) {
      addTag(newTagInput.trim());
      setNewTagInput('');
    }
  };

  const onSubmit = () => {
    if (!title.trim() || !type) { alert('Por favor ingrese título y seleccione tipo.'); return; }
    const dueDateNum = dueDate ? new Date(dueDate).getTime() : undefined;
    if (id) {
      updateTask(id, title.trim(), desc.trim(), type as any, tags, dueDateNum);
    } else {
      addTask(title.trim(), desc.trim(), type as any, tags, dueDateNum);
    }
    nav('/list');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="header">
          <div className="brand"><span>✔</span><span>TaskMaster</span></div>
          <div className="nav">
            <Link to="/home" className={loc.pathname === '/home' ? 'active' : ''}>Inicio</Link>
            <Link to="/list" className={loc.pathname === '/list' ? 'active' : ''}>Lista</Link>
            <Link to="/add" className={`primary ${(loc.pathname === '/add' || loc.pathname.startsWith('/edit')) ? 'active' : ''}`}>
              {id ? 'Editar' : 'Agregar'}
            </Link>
            <IonButton size="small" color="medium" onClick={()=>{logout(); nav('/login',{replace:true});}}>Salir</IonButton>
          </div>
        </div>

        <div className="container card" style={{display:'grid',gap:16, textAlign:'center', marginTop: '20px', padding:'20px'}}>
          <h2 style={{margin:0, marginBottom:'12px'}}>{id ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
          <IonLabel style={{textAlign:'left', marginBottom:'4px'}}>Título de la Tarea</IonLabel>
          <IonInput className="input-rounded" placeholder="Introduzca el título de la tarea" value={title} onIonChange={e=>setTitle(e.detail.value||'')} />

          <IonLabel style={{textAlign:'left', marginTop:'8px', marginBottom:'4px'}}>Descripción (opcional)</IonLabel>
          <IonTextarea className="input-rounded" autoGrow placeholder="Añadir una descripción..." value={desc} onIonChange={e=>setDesc(e.detail.value||'')} />

          <IonLabel style={{textAlign:'left', marginTop:'8px', marginBottom:'4px'}}>Tipo</IonLabel>
          <IonSelect 
            className="input-rounded" 
            placeholder="Seleccione un tipo" 
            value={type} 
            onIonChange={e=>setType(e.detail.value)}
            interface="popover"
          >
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

          <IonLabel style={{textAlign:'left', marginTop:'8px', marginBottom:'4px'}}>Etiquetas</IonLabel>
          
          {tags.length > 0 && (
            <div style={{display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'12px'}}>
              {tags.map(tag => (
                <IonChip key={tag} color="dark" style={{margin:0}}>
                  <IonLabel>{tag}</IonLabel>
                  <IonIcon icon={closeCircle} onClick={() => removeTag(tag)} style={{cursor:'pointer'}} />
                </IonChip>
              ))}
            </div>
          )}

          <IonSearchbar 
            className="input-rounded"
            placeholder="Buscar etiquetas..."
            value={tagSearch}
            onIonInput={e => setTagSearch(e.detail.value || '')}
            style={{padding:0, '--background':'#ffffff', '--border-radius':'16px', '--box-shadow':'0 1px 3px rgba(0,0,0,0.08)', marginBottom:'8px'}}
          />

          {tagSearch && filteredTags.length > 0 && (
            <IonList className="list-rounded" style={{maxHeight:'200px', overflow:'auto'}}>
              {filteredTags.slice(0, 10).map(tag => (
                <IonItem 
                  key={tag} 
                  className="item-rounded" 
                  button 
                  onClick={() => {addTag(tag); setTagSearch('');}}
                  color={tags.includes(tag) ? 'light' : undefined}
                >
                  <IonLabel>{tag}</IonLabel>
                  {tags.includes(tag) && <IonIcon icon={closeCircle} slot="end" color="success" />}
                </IonItem>
              ))}
            </IonList>
          )}

          <div style={{display:'flex', gap:'10px', alignItems:'stretch', marginTop:'8px'}}>
            <IonInput 
              className="input-rounded"
              placeholder="Nueva etiqueta personalizada"
              value={newTagInput}
              onIonChange={e => setNewTagInput(e.detail.value || '')}
              onKeyPress={e => e.key === 'Enter' && handleAddCustomTag()}
              style={{flex:1}}
            />
            <IonButton onClick={handleAddCustomTag} disabled={!newTagInput.trim()} style={{margin:0}}>
              Agregar
            </IonButton>
          </div>

          <IonLabel style={{textAlign:'left', marginTop:'16px', marginBottom:'4px'}}>Fecha de vencimiento (opcional)</IonLabel>
          <IonDatetime 
            className="input-rounded"
            presentation="date" 
            value={dueDate} 
            onIonChange={e=>setDueDate(e.detail.value as string || '')}
            style={{background:'#ffffff', borderRadius:'16px', margin:'0 16px', maxWidth:'600px', width:'100%'}}
          />

          <div className="actions" style={{justifyContent:'center', marginTop:'20px', gap:'12px'}}>
            <IonButton color="dark" onClick={onSubmit} style={{minWidth:'140px'}}>
              <IonIcon slot="start" icon={saveOutline} />
              Guardar
            </IonButton>
            <Link to="/home"><IonButton style={{minWidth:'140px'}}><IonIcon slot="start" icon={homeOutline} />Inicio</IonButton></Link>
          </div>
        </div>

        <div style={{textAlign:'center', padding:'20px', color:'#999', fontSize:'12px'}}>
          Copyright 2025 EdwardDv
        </div>
      </IonContent>
    </IonPage>
  );
}
