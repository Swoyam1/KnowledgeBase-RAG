<h1 align="center">Node.js PDF Knowledge Base</h1>

## Tech Stack

- JavaScript
- Node.js
- Express.js
- MongoDB
- pdfReader
- Embedding API (OpenAI)
- Thunder Client (API CLIENT)

## Local Development

Start developing locally.

#### Step-1

clone this repo

```sh
git clone https://github.com/Swoyam1/KnowledgeBase-RAG.git
```

#### Step-2

Install all dependencies

```sh
# install server side deps
npm install
```

#### Step-3: 

```sh
Create a SEARCH INDEX in MONGODB ATLAS
```

#### Step-4: 

Create a .env file in root folder and write these code

```sh
MONGO_URL = "PROVIDE YOUR MONGODB ATLAS URL"
OPENAI_API_KEY = "PROVIDE YOUR OPENAI API KEY"
```

#### Step-5: Starting the server

Finally to start the server execute this script

```sh
npm run dev
```
After starting the server it should be running on http://localhost:7000


## API

#### /document
* `POST` : Post query to add vector embedding of PDF to the database

#### /query
* `POST` : Post query and get the answer to the query in response
```sh
# post query body element
{
  "query" : "PROVIDE YOUR QUERY"
}
```
<br />
