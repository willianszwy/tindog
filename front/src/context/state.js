import React, { createContext, useReducer, useEffect } from "react";

let AppContext = createContext();

const initialState = {
    castracao: "",
    genero: "",
    tamanho: "",
    tipo: "",
    idade: [0, 1.5],
    localizacao: { longitude: "", latitude: "" },
    distancia: 1,
};

let persistedState = initialState;

if (typeof localStorage['state'] === 'string')
    persistedState = JSON.parse(localStorage['state']);

let reducer = (state, action) => {
    switch (action.type) {
        case "updateSearchConfig":
            return { ...state, ...action.config };
        case "updateLocalization":
            return { ...state, localizacao: { longitude: action.longitude, latitude: action.latitude } }
        default:
            throw new Error();

    }
};

function AppContextProvider(props) {
    const fullInitialState = {
        ...initialState,
        ...persistedState,
    }

    let [state, dispatch] = useReducer(reducer, fullInitialState);

    useEffect(() => {
        localStorage['state'] = JSON.stringify(state);
    }, [state]);

    let value = { state, dispatch };


    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };