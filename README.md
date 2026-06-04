# 🌿 Paris Cool Spots

> Trouvez les îlots de fraîcheur à Paris — équipements, espaces verts et fontaines à boire — sur une carte interactive.

🔗 **[pariscoolspots.netlify.app](https://pariscoolspots.netlify.app/)**

---

## Aperçu

Paris Cool Spots agrège **3 datasets Paris OpenData** pour localiser facilement les refuges climatiques de la capitale. L'application permet de filtrer, explorer et visualiser chaque lieu avec ses informations clés.

---

## Fonctionnalités

- 🗺️ **Carte interactive** avec marqueurs clusterisés par type de lieu
- 🔍 **Filtres combinés** — arrondissement, catégorie, gratuit / payant
- 📸 **Aperçu enrichi** — image Wikipedia + adresse + type pour chaque marqueur
- 📊 **3 sources normalisées** en une interface unifiée (`Commun`)
- ⚡ **Chargement parallèle** des datasets via `Promise.all`

---

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Style | Tailwind CSS v4 |
| Carte | Leaflet + React-Leaflet |
| Données | Paris OpenData API (JSON) |
| Enrichissement | Wikipedia REST API |
| Déploiement | Netlify |

---

## Datasets utilisés

| Dataset | Source |
|---|---|
| Îlots de fraîcheur — Équipements & activités | [opendata.paris.fr/Equipements](https://opendata.paris.fr/explore/dataset/ilots-de-fraicheur-equipements-activites/information/?disjunctive.type&disjunctive.payant&disjunctive.arrondissement&disjunctive.horaires_periode) |
| Îlots de fraîcheur — Espaces verts | [opendata.paris.fr/Espaces verts](https://parisdata.opendatasoft.com/explore/dataset/ilots-de-fraicheur-espaces-verts-frais/information/?disjunctive.type&disjunctive.arrondissement&disjunctive.statut_ouverture&disjunctive.ouvert_24h&disjunctive.canicule_ouverture&disjunctive.ouverture_estivale_nocturne&disjunctive.horaires_periode&basemap=jawg.dark&location=12,48.85872,2.34748) |
| Fontaines à boire | [opendata.paris.fr/Fontaines](https://parisdata.opendatasoft.com/explore/dataset/fontaines-a-boire/information/?disjunctive.type_objet&disjunctive.modele&disjunctive.commune&disjunctive.statut_obj&disjunctive.udi&disjunctive.dispo&basemap=jawg.dark&location=12,48.83345,2.34916) |

---

## Lancer le projet

```bash
git clone https://github.com/FaroukBentaleb/TestTheQuanticFactory.git
cd paris-cool-spots
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

> Aucune variable d'environnement requise — les APIs utilisées sont publiques.

---

## Structure du projet

```
src/
├── api/
│   ├── commun.ts           # Fetch + normalisation commune (interface Commun)
│   ├── equipements.ts      # Dataset îlots de fraîcheur — équipements
│   ├── espaces_verts.ts    # Dataset îlots de fraîcheur — espaces verts
│   └── fontaines.ts        # Dataset fontaines à boire
├── assets/
│   └── hero.png
├── components/
│   ├── Map.tsx             # Carte Leaflet principale
│   └── PopupContent.tsx    # Popup enrichi avec image Wikipedia
├── hooks/                  # Custom React hooks
├── pages/                  # Vues / routes
├── types/
│   ├── Commun.ts           # Interface unifiée des 3 sources
│   ├── Equipement.ts       # Type brut API équipements
│   ├── Espace_vert.ts      # Type brut API espaces verts
│   └── Fontaine.ts         # Type brut API fontaines
├── utils/
│   └── constants.ts        # URLs API, valeurs partagées
├── App.tsx
└── main.tsx
```

---

## Auteur

**Farouk Ben Taleb** — Projet réalisé dans le cadre d'un test technique Full-Stack.
