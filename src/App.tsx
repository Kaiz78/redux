import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Redux
import {
  useFetchResourceQuery
} from "./store/reducers/ressourceSlice";


function App() {
  const [count, setCount] = useState(0)

  const [num, setNum] = useState(1);
  const { data = [], isFetching, error} = useFetchResourceQuery(num);


  if (isFetching) {
    return <div>Loading...</div>;  // Affiche un message de chargement tant que la requête est en cours
  }

  if (error) {
    let errMsg;
    console.log(error);
    
    if ('status' in error) {
      // Gestion des erreurs HTTP
      switch (error.status) {
        case 400:
          errMsg = "Requête invalide. Veuillez vérifier les paramètres.";
          break;
        case 401:
          errMsg = "Non autorisé. Veuillez vérifier votre token d'authentification.";
          break;
        case 404:
          errMsg = "Ressource non trouvée. Veuillez vérifier l'URL.";
          break;
        case 500:
          errMsg = "Erreur interne du serveur. Veuillez réessayer plus tard.";
          break;
        case 'PARSING_ERROR':
          errMsg = "Erreur interne du serveur. Veuillez réessayer plus tard.";
          break;
        case 'FETCH_ERROR':
          errMsg = "Erreur réseau. Veuillez vérifier votre connexion.";
          break;
        case 'TIMEOUT_ERROR':
          errMsg = "La requête a expiré. Veuillez réessayer.";
          break;
        default:
          errMsg = `Erreur inconnue: ${error.status}`;
          break;
      }
    } else {
      // Gestion des erreurs JS (par exemple des exceptions dans le code)
      errMsg = error.message || "Une erreur s'est produite.";
    }


    return <div>
      <div>An error has occurred:</div>
      <div>{errMsg}</div>
    </div>
    
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <div>
        {data.length}

        <select name="num" id="num" onChange={(e) => setNum(parseInt(e.target.value))}>
          <option value="1">1</option>        
          <option value="2">2</option>        
          <option value="5">5</option>        
        </select>


        {/* map data */}
        <ul>
          {data.map((resource) => (
            <li key={resource.resources_id}>
              {resource.resources_name}
            </li>
          ))}
        </ul>


        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
