import axios from "axios";

/*
La libreria axios è una libreria JavaScript per la gestione delle chiamate HTTP, utilizzata principalmente per le
 chiamate AJAX (Asynchronous JavaScript and XML) in applicazioni Web.

La libreria fornisce un'interfaccia semplice e intuitiva per inviare richieste HTTP asincrone ai server,
 e gestire le risposte ricevute. Con axios è possibile eseguire diverse operazioni tra cui:

Invio di richieste GET, POST, PUT, DELETE, PATCH e altre;
Invio di dati e file con richieste HTTP;
Gestione di risposte con differenti formati (JSON, XML, form-data, etc.);
Configurazione di timeout e intercettori per le richieste HTTP;
Gestione degli errori durante le richieste;
Supporto per richieste con token di autenticazione e autorizzazione.
In sostanza, axios semplifica notevolmente la gestione delle chiamate HTTP in JavaScript,
 fornendo un'API ben progettata e facile da usare per eseguire richieste e gestire le risposte dal server.
  Ciò rende la creazione di applicazioni Web asincrone più semplice e meno propenso ad errori rispetto
   all'utilizzo delle API native di JavaScript per le chiamate HTTP.

   */

//withCredentials:true serve per permettere il passaggio dei cookie (in particolare il nostro cookie contentente
// il session id) dal back-end in node.js al nostro front-end React
const client = axios.create({withCredentials: true, baseURL: "http://localhost:8000/api" });

export default client;
