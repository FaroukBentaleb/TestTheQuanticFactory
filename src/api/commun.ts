import type { Commun } from '../types/commun';
import { getEquipements } from './equipements';
import { getEspacesVerts } from './espaces_verts';
import { getFontaines } from './fontaines';
export async function getAllData() {
    let commun: Commun[] = []
    const [equipements, espacesVerts, fontaines] = await Promise.all([
        getEquipements(),
        getEspacesVerts(),
        getFontaines()
    ]);

    equipements.results.forEach((item: any) => {
        commun.push({
            nom: item.nom,
            adr: item.adresse, 
            arrondissement: item.arrondissement,
            type: item.type,
            payant: item.payant,
            source: 'equipement'
        });
    });

    espacesVerts.results.forEach((item: any) => {
        commun.push({
            nom: item.nom,
            adr: item.adresse,
            arrondissement: item.arrondissement,
            type: item.type,
            payant: 'Non',
            source: 'espace_vert'
        });
    });

    fontaines.results.forEach((item: any) => {
        commun.push({
            nom: item.type_objet,
            adr: item.voie,
            arrondissement: item.commune,
            type: item.type_objet,
            payant: 'Non',
            source: 'fontaine'
        });
    });

    return commun;
}
export async function getDataByFilter(postal: string, type: string, payant: string, source: string, arrondissement: string) {
    const allData = await getAllData();
    if(!postal && !type && !payant && !source && !arrondissement) {
        return allData;
    }
    return allData.filter((item) => item.adr?.includes(postal) 
    && item.type?.includes(type) 
    && item.payant?.includes(payant) 
    && item.source?.includes(source) 
    && item.arrondissement?.includes(arrondissement));
}