import { LangAction, SET_LANGUAGE } from "../type";

// Ajout du language dans le localStorage
export const setLanguage = (lang: string): LangAction => {
    localStorage.setItem('language', lang);
    return {
        type: SET_LANGUAGE,
        payload: lang
    }
}
