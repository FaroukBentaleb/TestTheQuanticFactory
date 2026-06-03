import { useEffect, useState } from 'react';
import { getEquipements } from './api/equipements';
import './App.css'

function App() {
  const [data, setData] = useState<Equipement[]>([])
  useEffect(() => {
    getEquipements().then((res) => {
      console.log(res.results);
      setData(res.results);
    })
  }, [])
  return (
    <>
      <h1>Test Technique</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Payant</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, key) => (
                <tr key={key}>
                  <td>{item.nom}</td>
                  <td>{item.type}</td>
                  <td>{item.payant}</td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App
