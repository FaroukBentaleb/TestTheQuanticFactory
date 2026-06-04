import { useEffect, useState } from 'react';
import './App.css'
import { getDataByFilter } from './api/commun';
import type { Commun } from './types/Commun';
import { Map } from './components/Map';

function App() {
  const [data, setData] = useState<Commun[]>([])
  const [arrondissement, setArrondissement] = useState<string>('');
  const [postal, setPostal] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [payant, setPayant] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true)
  const [view, setView] = useState<'cards' | 'map'>('cards')
  useEffect(() => {
    setLoading(true);
    getDataByFilter(arrondissement, postal, type, payant, source).then((res) => {
      setData(res);
      setLoading(false);
    })
  }, [arrondissement, postal, type, payant, source])
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">🌿 Paris Cool Spots</h1>
        
        <div className="bg-white rounded-2xl shadow p-4 mb-6 flex flex-wrap gap-3 items-center">
          <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" type="text" placeholder="Arrondissement" value={arrondissement} onChange={(e) => setArrondissement(e.target.value)} />
          <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" type="text" placeholder="Code postal" value={postal} onChange={(e) => setPostal(e.target.value)} />
          <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Toutes les sources</option>
            <option value="equipement">Équipements</option>
            <option value="espace_vert">Espaces verts</option>
            <option value="fontaine">Fontaines</option>
          </select>
          <label className="flex items-center gap-1 text-sm"><input type="radio" name="payant" checked={payant === 'Oui'} onChange={() => setPayant('Oui')} /> Payant</label>
          <label className="flex items-center gap-1 text-sm"><input type="radio" name="payant" checked={payant === 'Non'} onChange={() => setPayant('Non')} /> Gratuit</label>
          <button className={view === 'cards' ? 'bg-green-500 text-white text-sm px-4 py-2 rounded-lg' : 'bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg'} onClick={() => setView('cards')}>Cards</button>
          <button className={view === 'map' ? 'bg-green-500 text-white text-sm px-4 py-2 rounded-lg' : 'bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg'} onClick={() => setView('map')}>Map</button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg" onClick={() => { setPostal(''); setType(''); setPayant(''); setSource(''); setArrondissement(''); }}>Réinitialiser</button>
        </div>
        {view === 'cards' && (
          <>
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {!loading && data.length === 0 && (
              <div className="flex justify-center items-center py-20">
                <p className="text-gray-500 text-lg">Aucun résultat trouvé</p>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-6">
              {data.map((item, key) => (
                <div key={key} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-3 border-t-4 border-green-500">
                  <h5 className="text-base font-bold text-gray-900 leading-tight">{item.nom}</h5>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit ${item.source === 'equipement' ? 'bg-blue-100 text-blue-700' : item.source === 'espace_vert' ? 'bg-green-100 text-green-700' : 'bg-cyan-100 text-cyan-700'}`}>{item.source}</span>
                  <p className="text-sm text-gray-500">📍 {item.adr}, {item.arrondissement}</p>
                  <p className="text-sm text-gray-600">🏷️ {item.type}</p>
                  <p className={`text-sm font-semibold ${item.payant === 'Oui' ? 'text-red-500' : 'text-green-600'}`}>{item.payant === 'Oui' ? '💰 Payant' : '✅ Gratuit'}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {view === 'map' && (
          <Map data={data} source={source} />
        )}
      </div>
    </>
  )
}

export default App
