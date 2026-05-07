# 🌤️ Weather App

Aplicação de previsão do tempo construída com **React + TypeScript**, que exibe condições climáticas em tempo real com base na localização do usuário ou busca por nome de cidade.

---

## 📸 Visão Geral

A aplicação consome dados meteorológicos da API [Open-Meteo](https://open-meteo.com/) e dados de geolocalização via [Nominatim (OpenStreetMap)](https://nominatim.openstreetmap.org/), exibindo:

- Temperatura atual e condição climática
- Previsão horária do dia
- Previsão para os próximos 10 dias

---

## 🚀 Funcionalidades

- 📍 **Geolocalização automática** — detecta a cidade do usuário via browser
- 🔍 **Busca por cidade** — permite pesquisar qualquer cidade pelo nome
- 🕐 **Previsão horária** — exibe temperatura e condição clima hora a hora para o dia atual
- 📅 **Previsão semanal** — cards com temperatura máxima, mínima e chance de chuva para os próximos 10 dias
- 🌡️ **Temperatura em tempo real** — exibe condição atual com ícone dinâmico
- 🖱️ **Scroll por arrastar** — navegação horizontal na previsão horária via drag

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia                                                 | Descrição                            |
| ---------------------------------------------------------- | ------------------------------------ |
| [React](https://react.dev/)                                | Biblioteca principal de UI           |
| [TypeScript](https://www.typescriptlang.org/)              | Tipagem estática                     |
| [Vite](https://vitejs.dev/)                                | Bundler e dev server                 |
| [Open-Meteo API](https://open-meteo.com/)                  | Dados meteorológicos gratuitos       |
| [Nominatim API](https://nominatim.openstreetmap.org/)      | Geocodificação via OpenStreetMap     |
| [openmeteo (npm)](https://www.npmjs.com/package/openmeteo) | SDK para consumo da Open-Meteo       |
| [date-fns](https://date-fns.org/)                          | Manipulação e formatação de datas    |
| [react-hook-form](https://react-hook-form.com/)            | Gerenciamento do formulário de busca |

---

## 📁 Estrutura do Projeto

```
src/
├── App.tsx                         # Componente raiz e composição de providers
├── main.tsx                        # Ponto de entrada da aplicação
│
├── api-response/
│   ├── weatherapi.tsx              # Context, Provider e hooks para dados climáticos
│   ├── geoapi.tsx                  # Context, Provider e hooks para geolocalização
│   └── useDragScroll.ts            # Hook para scroll horizontal via drag
│
└── components/
    ├── button-search/
    │   └── index.tsx               # Componente de busca por cidade
    ├── card-Hours/
    │   └── index.tsx               # Previsão horária do dia
    ├── card-Daily/
    │   └── index.tsx               # Previsão dos próximos dias
    ├── date/
    │   └── index.tsx               # Hook de relógio em tempo real
    └── temperature-icons-wather/
        └── Icon.tsx                # Ícones dinâmicos por código de clima
```

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Node.js `>= 18`
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/weather-app.git

# Acesse a pasta do projeto
cd weather-app

# Instale as dependências
npm install
```

### Rodando em desenvolvimento

```bash
npm run dev
```

Acesse em: `http://localhost:5173`

---

## 🏗️ Arquitetura

A aplicação utiliza **Context API** para gerenciar estado global, com dois providers principais:

```
AGIProvider (Geolocalização)
└── DaisProvider (Dados Climáticos)
    └── WeatherContent
        ├── WeatherIcon       ← Condição atual
        ├── ButtonSearch      ← Busca por cidade
        ├── CardHours         ← Previsão horária
        └── DaysComponent     ← Previsão semanal
```

- **`AGIProvider`** — gerencia coordenadas geográficas, seja via geolocalização do browser ou por busca de nome de cidade. Expõe os hooks `useGeoApi` e `useCoordenadas`.
- **`DaisProvider`** — consome as coordenadas e busca dados climáticos na Open-Meteo. Expõe os hooks `useCurrent`, `useHourly` e `useDaily`.

---

## 🌐 APIs Utilizadas

### Open-Meteo

- **URL:** `https://api.open-meteo.com/v1/forecast`
- Gratuita, sem necessidade de chave de API
- Fornece dados atuais, horários e diários

### Nominatim (OpenStreetMap)

- **URL:** `https://nominatim.openstreetmap.org`
- Gratuita, sem necessidade de chave de API
- Utilizada para geocodificação direta (nome → coordenadas) e reversa (coordenadas → nome)

---
