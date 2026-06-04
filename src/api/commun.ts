import type { Commun } from '../types/Commun';
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
            source: 'equipement',
            lat: item.geo_point_2d.lat,
            lon: item.geo_point_2d.lon
        });
    });

    espacesVerts.results.forEach((item: any) => {
        commun.push({
            nom: item.nom,
            adr: item.adresse,
            arrondissement: item.arrondissement,
            type: item.type,
            payant: 'Non',
            source: 'espace_vert',
            lat: item.geo_point_2d.lat,
            lon: item.geo_point_2d.lon
        });
    });

    fontaines.results.forEach((item: any) => {
        commun.push({
            nom: item.type_objet,
            adr: item.voie,
            arrondissement: item.commune,
            type: item.type_objet,
            payant: 'Non',
            source: 'fontaine',
            lat: item.geo_point_2d.lat,
            lon: item.geo_point_2d.lon
        });
    });

    return commun;
}
export async function getDataByFilter(arrondissement: string, postal: string, type: string, payant: string, source: string) {
    const allData = await getAllData();
    if(!postal && !type && !payant && !source && !arrondissement) {
        return allData;
    }
    console.log("src: ",source);
    return allData.filter((item) => item.adr?.includes(postal) 
    && item.type?.includes(type) 
    && item.payant?.includes(payant) 
    && item.source?.includes(source) 
    && item.arrondissement?.includes(arrondissement));
}