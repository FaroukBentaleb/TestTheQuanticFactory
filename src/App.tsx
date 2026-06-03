import { useEffect, useState } from 'react';
import './App.css'
import { getDataByFilter } from './api/commun';
import type { Commun } from './types/Commun';

function App() {
  const [data, setData] = useState<Commun[]>([])
  const [arrondissement, setArrondissement] = useState<string>('');
  const [postal, setPostal] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [payant, setPayant] = useState<string>('');
  const [source, setSource] = useState<string>('');
  useEffect(() => {
   getDataByFilter(postal, type, payant, source, arrondissement).then((res) => {
    setData(res);
   })
  }, [arrondissement, postal, type, payant, source])
  return (
    <>
      <h1>Test Technique</h1>
      <div className='flex gap-2 mg-3 bg-gray-1000'>
        <input type="text" placeholder='Filtrer par arrondissement'value={arrondissement} onChange={(e) => setArrondissement(e.target.value)} />
        <input type="text" placeholder='Filtrer par code postal' value={postal} onChange={(e) => setPostal(e.target.value)} />
        <input type="text" placeholder='Filtrer par type' value={type} onChange={(e) => setType(e.target.value)} />
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">Filtrer par type</option>
          <option value="equipement">Equipements et activités </option>
          <option value="espace_vert">Espaces verts</option>
          <option value="fontaine">Fontaines à boire</option>
        </select>
        <div>
          <input type="radio" name='payant' checked={payant === 'Oui'} placeholder='Filtrer par nom' onChange={() => setPayant('Oui')} />
          <label htmlFor="payant">Payant</label>
        </div>
        <div>
          <input type="radio" name='payant' checked={payant === 'Non'} placeholder='Filtrer par nom' onChange={() => setPayant('Non')} />
          <label htmlFor="payant">Non Payant</label>
        </div>
        <input type="button" value='Réinitialiser les filtres' onClick={() => {
          setPostal('');
          setType('');
          setPayant('');
          setSource('');
          setArrondissement('');
        }} />
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Arrondissement</th>
            <th>Type</th>
            <th>Payant</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, key) => (
                <tr key={key}>
                  <td>{item.nom}</td>
                  <td>{item.adr}</td>
                  <td>{item.arrondissement}</td>
                  <td>{item.type}</td>
                  <td>{item.payant}</td>
                  <td>{item.source}</td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App
