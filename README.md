# C-FEWA by SEPUH 🌍🌾👶
### Child-Focused Climate Food Early Warning & Anticipatory Action Platform

[![UNICEF Innovation Fund Compatible](https://img.shields.io/badge/UNICEF-Innovation%20Fund%20Ready-00adef.svg?style=for-the-badge&logo=unicef&logoColor=white)](https://www.unicef.org/innovation/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React-18.3-61dafb.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Firebase Firestore](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Gemini AI Powered](https://img.shields.io/badge/Gemini_AI-2.5_Flash-8E44AD.svg?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📌 Executive Summary

**C-FEWA (Child-Focused Climate Food Early Warning & Anticipatory Action)** is an open-source, AI-driven, multi-hazard early warning and decision-support platform designed specifically to safeguard **children’s food security and nutritional health** from climate shocks.

Developed by **PT. Sepuh Trismatek Nusa (SEPUH)** (Fellas Indonesia's partner acting as individual contractor that created this app), C-FEWA bridges the critical gap between raw meteorological climate forecasts and actionable, child-centric humanitarian interventions. By integrating climate anomaly tracking, supply chain logistics, localized child vulnerability metrics (SAM/MAM risk), and automated anticipatory action triggers, C-FEWA empowers disaster risk management agencies, UNICEF field offices, and local governments to deploy cash transfers, emergency food stocks, and micronutrient supplements **weeks before acute food shortages occur**.

---

## 🎯 The Humanitarian Problem & UNICEF Alignment

| Global Challenge | C-FEWA Solution |
| :--- | :--- |
| **Reactive Disaster Relief**: Humanitarian aid traditionally arrives *after* famine or malnutrition spike occurs, incurring high costs and irreversible developmental damage to infants. | **Anticipatory Action (Pre-Disaster)**: Automated trigger levels release funding and pre-position supplies *before* peak disaster impact, reducing intervention costs by up to **60%**. |
| **Adult-Centric Food Monitoring**: Traditional FEWS systems monitor grain prices and crop yields but ignore child-specific indicators like wasting (SAM/MAM), micro-nutrient access, and school feeding disruptions. | **Child-Focused Vulnerability Index (CVI)**: Tracks stunting/wasting hotspots, Posyandu/health post coverage, supplementary feeding stocks, and school meal resilience. |
| **Data Silos & Delayed SitReps**: Field reports from community health workers take weeks to aggregate into policy recommendations. | **Gemini AI Policy Simulator & Live Co-Pilot**: Instant natural-language scenario testing, automated Situation Report (SitRep) generation, and real-time community crowd-reporting via SMS/WhatsApp. |

### Alignment with Sustainable Development Goals (SDGs) & UNICEF Priorities
- 🌾 **SDG 2: Zero Hunger** (Target 2.1 & 2.2 — End malnutrition and ensure access to safe, nutritious food for infants).
- 🏥 **SDG 3: Good Health & Well-Being** (Child mortality reduction and SAM/MAM prevention).
- 🌍 **SDG 13: Climate Action** (Strengthening resilience and adaptive capacity to climate-related hazards).
- 🤝 **SDG 17: Partnerships for the Goals** (Multi-agency data exchange between WFP, UNICEF, FAO, and national BMKG/NDMA agencies).

---

## ✨ Key Platform Modules & Capabilities

### 1. 🚨 Executive Dashboard & Live Climate-Food Monitor
- **Real-Time Risk Map**: High-resolution spatial overlay showing drought intensity, flood risk, soil moisture anomalies, and localized food price volatility.
- **Key Performance Indicators**: Live monitoring of Child Vulnerability Index (CVI), Food Price Volatility Index (FPVI), active alert count, and budget pre-positioned vs. deployed.
- **Alert Triage System**: High-priority alerts flagged by AI (e.g., *Sumba Timur: Drought Level 3 — Rice supply reserve depleted below 14 days*).

### 2. ⚡ Early Warning System (FEWS) & Risk Matrix
- **30-60-90 Day Anomaly Forecasts**: Predictive modeling for precipitation deficits, extreme heat days, and crop failure probability.
- **Multi-Hazard Risk Matrix**: Dynamic categorisation of regions based on likelihood and child-health severity impact.
- **Automated Weather Station (AWS) Integration**: Ingestion of ground sensor data, rainfall gauges, and satellite soil moisture data.

### 3. 🎯 Anticipatory Action & Trigger Engine
- **Pre-Defined Threshold Triggers**: Standard Operating Procedures (SOPs) automatically activated when climate & price indices cross critical safety marks.
- **Action Playbooks**:
  - **Tier 1 (Mild Alert)**: Inform local health centers, verify warehouse grain stocks.
  - **Tier 2 (Moderate Alert)**: Pre-position fortified lipid-based nutrient supplements (LNS) and school meal reserves.
  - **Tier 3 (Severe Emergency)**: Trigger unconditional cash transfers to vulnerable households with children under 5.

### 4. 🚚 Food Logistics, Warehouse & Inter-District Repositioning
- **Supply Chain Visibility**: Real-time tracking of grain warehouses, cold-chain storage for vaccines/supplements, and spoiled grain risk factors.
- **Optimized Inter-District Repositioning**: Algorithmic routing recommendations to shift surplus grain from safe zones to disaster-prone communities before transport routes flood.
- **Last-Mile Access Routing**: Roads flagged for flood blockage or landslide risks to ensure supply truck accessibility.

### 5. 👶 Child Health & Nutrition Impact Tracker
- **SAM / MAM Risk Mapping**: Real-time tracking of Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM) cases down to district and village levels.
- **School Feeding Program Coverage**: Monitoring attendance, meal availability, and micronutrient distribution in early childhood education centers.
- **Posyandu / Community Clinic Readiness**: Supply levels of therapeutic milk (F-75/F-100), RUTF (Ready-to-Use Therapeutic Food), and zinc/vitamin supplements.

### 6. 🤖 Gemini AI Policy Co-Pilot & Scenario Simulator
- **Natural Language Policy Queries**: Ask complex questions like *"What happens if the drought in East Nusa Tenggara persists for another 60 days?"*
- **Automated Situation Reports (SitRep)**: Generate 1-click official executive briefs formatted for government ministries, UNICEF representatives, and donor agencies.
- **Interactive Scenario Builder**: Adjust rainfall parameters, price inflation percentages, and fuel prices to simulate supply chain strain.

### 7. 📱 Community Ground-Truth Crowdsourcing
- **SMS / WhatsApp Gateway Integration**: Direct input channel for field health workers, teachers, and agricultural extension agents.
- **Crowdsourced Price Logs**: Ground-truth verification of local market prices (rice, eggs, cooking oil, maize).
- **Offline-First Capabilities**: Field reporting queued locally when mobile connectivity is low, auto-syncing upon reconnecting.

---

## 🏗️ Technical Architecture & Stack

```
                               ┌───────────────────────────────────────────────┐
                               │           User Interfaces (Client)            │
                               │  - Executive Dashboard                        │
                               │  - FEWS Early Warning & Risk Matrix           │
                               │  - Anticipatory Action Triggers               │
                               │  - Logistics & Repositioning Module           │
                               │  - Child Nutrition & SAM/MAM Tracker          │
                               │  - Gemini Policy Co-Pilot Simulator           │
                               └──────────────────────┬────────────────────────┘
                                                      │
                                                      ▼
                               ┌───────────────────────────────────────────────┐
                               │              Application Layer                │
                               │  - React 18 SPA + Vite + TypeScript           │
                               │  - Tailwind CSS + Lucide Icons                │
                               │  - Recharts & Custom Dynamic Spatial Maps     │
                               │  - Motion / Framer Animations                 │
                               └──────────────────────┬────────────────────────┘
                                                      │
                                                      ▼
                               ┌───────────────────────────────────────────────┐
                               │         Backend & Cloud Services Layer        │
                               │  - Express.js API Gateway (Node.js)           │
                               │  - Google Gemini 2.5 Flash API (LLM Engine)   │
                               │  - Firebase Firestore (Realtime NoSQL DB)      │
                               │  - Firebase Authentication (RBAC / Roles)     │
                               └───────────────────────────────────────────────┘
```

### Component Breakdown
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React Icons, Motion Animation Engine.
- **Backend**: Express server, Node.js.
- **Database & Auth**: Google Firebase Firestore (real-time collections for alerts, weather, inventory, community reports) + Firebase Auth.
- **Artificial Intelligence**: Google Gemini AI (`@google/genai` SDK) for policy simulation, anomaly detection, and automated SitRep generation.

---

## 🛠️ Local Development & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-org/c-fewa-sepuh.git
   cd c-fewa-sepuh
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root or copy from `.env.example`:
   ```env
   # Server-side Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key_here

   # Firebase Configuration (Optional override)
   VITE_FIREBASE_PROJECT_ID=c-fewa
   VITE_FIREBASE_APP_ID=1:845567102942:web:be93cbeb10c4ea17e4d74f
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=c-fewa.firebaseapp.com
   VITE_FIREBASE_DATABASE_ID=ai-studio-cfewaclimatefood-e844cbde-3648-4b65-b2f1-4173749f5e2c
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 🧪 Quality Assurance & Testing

- **Static Type Checking**: TypeScript strict mode validation (`npm run lint`).
- **Build Verification**: Self-contained build pipeline producing optimized bundles.
- **Realtime Database Resilience**: Graceful fallbacks when offline or during transient network interruptions.

---

## 📜 License & Open Source Commitment

This project is released under the **[MIT License](LICENSE)**.

PT. Sepuh Trismatek Nusa is fully committed to releasing and maintaining C-FEWA as an **Open Source Digital Public Good (DPG)** under OSI-approved permissive licensing in accordance with the UNICEF Innovation Fund guidelines.

---

## 👥 Organization & Contact

**PT. Sepuh Trismatek Nusa (SEPUH)**  
- **Role**: Fellas Indonesia's partner as individual contractor that created this app  
- **Focus**: Climate Technology, Humanitarian Data Intelligence & Public Health Engineering  
- **Lead Contact**: Mamad Ismanto (`mamad.ismanto@gmail.com`)  
- **Repository**: [https://github.com/mamadismanto/c-fewa-sepuh](https://github.com/mamadismanto/c-fewa-sepuh)  

---

*C-FEWA by SEPUH — Empowering Communities, Protecting Children, Building Climate Resilience.* 🌟
