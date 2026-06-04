import type { Commun } from '../types/Commun';

export function PopupContent({ item }: { item: Commun }) {
    const fallbackEmoji =
        item.source === 'equipement' ? '🏛️' :
        item.source === 'espace_vert' ? '🌿' :
        '💧';

    return (
        <div style={{ width: '180px' }}>
            <div style={{
                width: '100%', height: '80px', background: '#f0f0f0',
                borderRadius: '8px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '2rem'
            }}>
                {fallbackEmoji}
            </div>
            <p style={{ fontWeight: 'bold', marginTop: '8px', fontSize: '13px' }}>{item.nom}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>📍 {item.adr ?? 'Adresse non disponible'}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>🏷️ {item.type}</p>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: item.payant === 'Oui' ? '#ef4444' : '#16a34a' }}>
                {item.payant === 'Oui' ? '💰 Payant' : '✅ Gratuit'}
            </p>
        </div>
    );
}