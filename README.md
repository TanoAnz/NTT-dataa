
# Progetto Angular: Gestione Utenti e Post

Questo progetto Angular consente la gestione di utenti e post, inclusa la visualizzazione, la ricerca, l'aggiunta e la rimozione di utenti e post. Include anche funzionalità opzionali come il commento sui post e la gestione dei moduli con lazy loading.

## Requisiti

- Node.js e npm installati.
- Un token speciale per il login, che può essere ottenuto accedendo alla pagina [https://gorest.co.in/consumer/login](https://gorest.co.in/consumer/login).

## Installazione

1. **Clona il repository:**

   ```bash
   git clone <URL_DEL_REPOSITORY>
   cd <NOME_DEL_REPOSITORY>
# Funzionalità
## Login
La schermata di login richiede un token speciale che deve essere generato accedendo alla pagina https://gorest.co.in/consumer/login. Questo token viene utilizzato per il controllo della sessione e per invocare le REST API tramite HTTP Bearer Token.

## Pagina Principale
Visualizzazione: Mostra un elenco di utenti con informazioni base.
Ricerca e Filtraggio: Possibilità di visualizzare un numero di record a scelta e di effettuare ricerche.
Gestione Utenti: Aggiungere o rimuovere un utente.
## Pagina Dettaglio Utente
Dettagli Utente: Visualizzazione delle informazioni dettagliate dell'utente.
Post e Commenti: Mostra l'elenco dei post dell'utente e i commenti relativi a ciascun post.
Commenti ai Post (Opzionale): Possibilità di inserire commenti ai post.
## Pagina elenco post
Visualizzazione: Mostra tutti i post presenti a sistema.
Ricerca e Filtraggio: Possibilità di effettuare ricerche sui post.
Commenti sui Post: Visualizzazione dei commenti associati a ciascun post.
Aggiunta di Post: Possibilità di inserire nuovi post.
