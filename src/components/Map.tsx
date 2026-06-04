import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';
import type { Commun } from "../types/Commun";
import { useEffect, useState } from "react";
import { PopupContent } from "./PopupContent";
interface MapProps {
    data: Commun[];
    source: string;
}
function FlyToLocation({ location }: { location: {lat: number, lon: number} | null }) {
    const map = useMap();
    useEffect(() => {
        if (location) {
            map.flyTo([location.lat, location.lon], 15);
        }
    }, [location]);
    return null;
}
function getIcon(source: string) {
    const color = source === 'equipement' ? 'blue' : source === 'espace_vert' ? 'green' : source === 'user' ? 'red' : 'cyan';
    return L.divIcon({
        className: '',
        html: `<div style="background:${color}; width:14px; height:14px; border-radius:50%; border:2px solid white;"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    });
}

export function Map({ data, source }: MapProps) {
    const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null)
    return (
        <>
            <MapContainer key={source} center={[48.8566, 2.3522]} zoom={12} style={{ height: '650px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.filter(item => item.lat && item.lon).map((item, index) => (
                <Marker key={index} position={[item.lat, item.lon]} icon={getIcon(item.source)}>
                <PopupContent item={item} />
                </Marker>
            ))}
            {userLocation && (
                <>
                    <FlyToLocation location={userLocation} />
                    <Marker position={[userLocation.lat, userLocation.lon]} icon={getIcon('user')}>
                        <Popup>Vous êtes ici</Popup>
                    </Marker>
                </>
            )}
            </MapContainer>
            <div className="flex gap-4 p-3 bg-white rounded-xl shadow mt-2 items-center flex-wrap">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-blue-500"></div><span className="text-sm">Équipements et activités</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-500"></div><span className="text-sm">Espaces verts</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-cyan-500"></div><span className="text-sm">Fontaines</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-red-500"></div><span className="text-sm">Votre position</span></div>
                <button 
                    className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-1"
                    onClick={() => setUserLocation({ lat: 48.8566, lon: 2.3522 })}
                >
                    👻 Mode Paris
                </button>
                <button 
                    className="ml-auto bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-1" 
                    onClick={() => navigator.geolocation.getCurrentPosition((pos) => setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }))}
                >
                    📍 Ma position
                </button>
            </div>
        </>
    )
}