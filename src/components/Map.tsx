import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';
import type { Commun } from "../types/Commun";
import { useEffect, useRef, useState } from "react";
import { PopupContent } from "./PopupContent";

interface MapProps {
    data: Commun[];
    source: string;
}


function MapController({ flyTarget }: { flyTarget: { lat: number; lon: number } | null }) {
    const map = useMap();
    const prevTarget = useRef<{ lat: number; lon: number } | null>(null);

    useEffect(() => {
        if (
            flyTarget &&
            (prevTarget.current?.lat !== flyTarget.lat || prevTarget.current?.lon !== flyTarget.lon)
        ) {
            map.flyTo([flyTarget.lat, flyTarget.lon], 15);
            prevTarget.current = flyTarget;
        }
    }, [flyTarget, map]);

    return null;
}

function getIcon(source: string) {
    const color =
        source === 'equipement' ? '#3b82f6' :
        source === 'espace_vert' ? '#22c55e' :
        source === 'user' ? '#ef4444' :
        '#06b6d4';
    return L.divIcon({
        className: '',
        html: `<div style="
            background: ${color};
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 2.5px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.35);
        "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
    });
}

export function Map({ data }: MapProps) {
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [flyTarget, setFlyTarget] = useState<{ lat: number; lon: number } | null>(null);

    const handleGeolocate = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const loc = { lat: pos.coords.latitude, lon: pos.coords.longitude };
                setUserLocation(loc);
                setFlyTarget(loc);
            },
            () => alert("Localisation refusée ou indisponible")
        );
    };

    const handleModeParis = () => {
        const loc = { lat: 48.8566, lon: 2.3522 };
        setUserLocation(loc);
        setFlyTarget(loc);
    };

    return (
        <>
            <MapContainer center={[48.8566, 2.3522]} zoom={12} style={{ height: '650px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <MapController flyTarget={flyTarget} />

                {data.filter(item => item.lat && item.lon).map((item, index) => (
                    <Marker
                        key={`${item.source}-${item.nom}-${index}`}
                        position={[item.lat, item.lon]}
                        icon={getIcon(item.source)}
                    >
                        <Popup>
                            <PopupContent item={item} />
                        </Popup>
                    </Marker>
                ))}

                {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lon]} icon={getIcon('user')}>
                        <Popup>Vous êtes ici</Popup>
                    </Marker>
                )}
            </MapContainer>

            <div className="flex gap-4 p-3 bg-white rounded-xl shadow mt-2 items-center flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Équipements et activités</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm">Espaces verts</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
                    <span className="text-sm">Fontaines</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm">Votre position</span>
                </div>
                <button
                    className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-1"
                    onClick={handleModeParis}
                >
                    👻 Mode Paris
                </button>
                <button
                    className="ml-auto bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-1"
                    onClick={handleGeolocate}
                >
                    📍 Ma position
                </button>
            </div>
        </>
    );
}
