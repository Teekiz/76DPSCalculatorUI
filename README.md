# 76DPSCalculator (Frontend)

## Overview
76DPSCalculator is a prototype damage per second calculator for the game Fallout 76.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation & Setup](#installation--setup)

## Prerequisites
To run this application, you need **both** the backend and frontend.

### **Backend**
- [The Backend Spring Boot Application](https://github.com/Teekiz/76DPSCalculator?tab=readme-ov-file#76dpscalculator-backend)

### **Frontend - Choose One Setup Method**
- **Using Docker**: [Docker & Docker Compose](https://www.docker.com/)  
  **OR**
- **Using npm**: [Node.js & npm](https://www.npmjs.com/)

## Installation & Setup
### 1. Ensure the backend is running:
```
git clone https://github.com/Teekiz/76DPSCalculator.git
cd 76DPSCalculator
docker-compose up -d --build
```
Then, proceed with setting up the frontend.

### 2. Clone the Repository
```
git clone https://github.com/Teekiz/76DPSCalculatorUI.git
```
### 3. Starting the Application
Using `Docker`:
```
docker-compose up -d --build
```
Using `npm`:
```
npm install
npm run dev
```
### 4. Access the Application
The application should be accessible at:
```
http://localhost:5173/
```