import client from "./client";

export const signInUser = async (userInfo) => {
    try {
      const { data } = await client.post("/user/sign-in", userInfo);
      return data;
    } catch (error) {
      const { response } = error;
      //.? è semplicemente come il . 
      //ma invece di restituire errore se la funzione chiamata è undefined oppure l'oggetto chiamato è null 
      //restituisce undefined e basta 
      //in tal caso se il server ha restituito un messaggio di errore(controllo in quell'if) ,quindi un dato, 
     // restituiamo il messaggio di errore dato dalla risposta del server  
      if (response?.data) return response.data;
      return { error: error.message || error };
    }
  };



  export const createUser = async (userInfo) => {
    try {
      const { data } = await client.post("/user/createUser", userInfo);
      return data;
    } catch (error) {
      const { response } = error;
      //.? è semplicemente come il . 
      //ma invece di restituire errore se la funzione chiamata è undefined oppure l'oggetto chiamato è null 
      //restituisce undefined e basta 
      //in tal caso se il server ha restituito un messaggio di errore(controllo in quell'if) ,quindi un dato, 
     // restituiamo il messaggio di errore dato dalla risposta del server  
      if (response?.data) return response.data;
      return { error: error.message || error };
    }
  };


  
  export const logout = async () => {
    try {
      const { data } = await client.get("/user/logout");
      return data;
    } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
  
      return { error: error.message || error };
    }
  };



  export const authControl = async () => {
    try {
      const { data } = await client.get("/user/dashboard");
      return data;
} 
/*  Il codice all'interno del blocco try-catch gestisce eventuali errori. Se si verifica un errore durante la
 richiesta, l'errore viene catturato dal blocco catch e si gestisce.
Nel caso in cui l'errore sia causato dalla risposta del server, si gestisce
 la risposta del server (response.data) e se l'errore non è causato dalla risposta del 
 server si gestisce l'errore generico (error.message o error).    */
catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
  
      return { error: error.message || error };
    }
  };


    
  export const authenticatedOrNot= async () => {
    try {
      const { data } = await client.get("/user/authenticatedOrNot");
      return data;
    } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
  
      return { error: error.message || error };
    }
  };


  export const getUserInformations= async () => {
    try {
      const { data } = await client.get("/user/getUserInformations");
      return data;
    } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
  
      return { error: error.message || error };
    }
  };


