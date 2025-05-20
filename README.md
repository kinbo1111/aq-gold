# AQ GOLD

**AQ GOLD** is a cutting-edge web platform designed for the search, upload, and viewing of 360° videos—aiming to become the world’s largest 360° video sharing service. 

---

## 🌐 Project Overview

AQ GOLD is a serverless web application built entirely on AWS. 
It provides users with a responsive and immersive experience for uploading, sharing, and viewing 360° video content across desktop and mobile platforms.

---

## 🛠 Tech Stack

* **Frontend:** React, AWS Amplify
* **Backend:** AWS AppSync (GraphQL), AWS Lambda
* **Storage:** Amazon S3, DynamoDB
* **Authentication:** Amazon Cognito
* **CDN:** Amazon CloudFront
* **CI/CD:** AWS Amplify with GitHub integration

---

## ✅ Core Features

### 🔐 User Management

* User registration and login via Amazon Cognito
* Profile settings and account management

### 📦 Content Delivery

* Fast video streaming using CloudFront CDN
* Caching and automatic content updates

### 💾 Data Storage

* Amazon S3 for video and static asset storage
* DynamoDB for structured metadata
* Upload/download functionality

### 🔄 Real-Time Data Sync

* AWS AppSync + GraphQL for real-time data updates between frontend and backend

### 🔧 API

* Secure GraphQL APIs for data fetch and mutation

### 🚀 CI/CD & Deployment

* Auto build, test, and deploy with Amplify
* Separate pipelines for development and production environments

### 🎨 UI/UX

* Responsive design optimized for both desktop and mobile
* Built with React for a dynamic and interactive interface

### 🔒 Security

* Data encryption in transit and at rest
* Secure API access and permission control

### 📈 Monitoring & Logging

* Integrated logging and monitoring tools for system and user activity

### 🧩 Data Integrity & Validation

* Input validation and data consistency checks

### 👥 Multi-Tenant Support

* Support for multiple independent user groups or organizations

### 🌀 Optional Features

* 360° spatial audio support
* Ad-insertion (pre-roll, mid-roll ads like YouTube)
* Recommendation engine using ML (based on user viewing history and preferences)

---

## 📋 Non-Functional Requirements

* **Performance:** Low latency, scalable infrastructure via AWS
* **High Availability:** Robust failover and disaster recovery
* **Security:** OAuth/OpenID Connect, regular audits
* **Maintainability:** Modular codebase and full documentation
* **Compatibility:** Works across modern browsers and devices
* **Extensibility:** Designed for future feature integration
* **Accessibility:** UX designed for all users
* **Observability:** Real-time system monitoring and alerting

---

## 🗂 Architecture Highlights

* **Frontend Hosting:** AWS Amplify
* **Authentication:** Amazon Cognito
* **API Gateway:** AWS AppSync with GraphQL
* **Data Layer:** DynamoDB
* **File Storage:** Two separate S3 buckets (content & app assets)
* **CDN:** Two CloudFront distributions for fast delivery
* **CI/CD:** GitHub integration with Amplify pipelines
* **Environments:** Support for `dev` and `prod` environments

---

## 🧪 MVP Features (Initial Release)

* User sign-up / login
* User dashboard and personal video list
* 360° video upload
* Video player with play/pause, skip, volume
* Video search

---

## 🔍 Optional Advanced Features

* Spatial 360° audio
* Video ad insertion
* Personalized recommendations via ML
