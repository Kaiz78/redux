import { SET_LANGUAGE, LangAction, LangState } from "../type";


// Récupération de la langue dans le localStorage
const localStorageLang = localStorage.getItem("language") || "FR";

const initialState: LangState = {
  language: localStorageLang ? localStorageLang : 'FR'
};


const langReducer = (state = initialState, action: LangAction): LangState => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
};


export default langReducer;