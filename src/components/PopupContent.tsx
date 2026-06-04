import { useEffect, useState } from 'react';
import type { Commun } from '../types/Commun';

export function PopupContent({ item }: { item: Commun }) {
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const normalizedName = item.nom.charAt(0).toUpperCase() + item.nom.slice(1).toLowerCase();
        fetch(`https://wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(normalizedName)}`)
            .then(res => res.json())
            .then(data => {
                if (data.thumbnail?.source) setImage(data.thumbnail.source);
            })
            .catch(() => {});
    }, [item.nom]);

    return (
        <div style={{ width: '180px' }}>
            {image 
                ? <img src={image} alt={item.nom} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                : <div style={{ width: '100%', height: '80px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                    {item.source === 'equipement' ? '🏛️' : item.source === 'espace_vert' ? '🌿' : '💧'}
                  </div>
            }
            <p style={{ fontWeight: 'bold', marginTop: '8px', fontSize: '13px' }}>{item.nom}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>📍 {item.adr}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>🏷️ {item.type}</p>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: item.payant === 'Oui' ? '#ef4444' : '#16a34a' }}>
                {item.payant === 'Oui' ? '💰 Payant' : '✅ Gratuit'}
            </p>
        </div>
    );
}