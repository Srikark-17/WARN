# WARN - Web-Based AI Real-time Notification

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Srikark-17/WARN/blob/main/LICENSE)

## Overview

WARN is an AI-powered web-based application designed to detect and notify authorities in real-time about gunshots and other critical incidents. Inspired by the tragic Oxford High School shooting, WARN aims to improve law enforcement reaction times and enhance community safety through advanced technology.

## Features

- **Real-time Detection**: Uses machine learning algorithms to detect gunshots and critical sounds.
- **Instant Notifications**: Sends immediate alerts to authorities and stakeholders.
- **User-friendly Interface**: Provides a web-based interface for monitoring alerts.
- **Scalable Architecture**: Designed to handle high volumes of data efficiently.
- **Privacy-focused**: Ensures the security and privacy of users and their data.

## Tech Stack

### Frontend
- **React.js**: For building a responsive and interactive user interface.
- **React Native**: For developing mobile applications to receive notifications.

### Backend
- **Node.js & Express.js**: For building a robust and scalable server-side application.
- **Raspberry Pi**: For deploying the AI model at the edge, providing real-time detection capabilities.

### AI/ML
- **Python**: For developing and training the machine learning models.
- **TensorFlow**: For building and deploying AI models.

### Cloud & Other Tools
- **Firebase**: For real-time database and user authentication.
- **Firestore**: For storing alert data securely.
- **Google Cloud Platform (GCP)**: For hosting and scaling the application.
- **WebSockets**: For real-time communication between the client and server.
- **Algolia**: For efficient search capabilities within the application.
- **Docker**: For containerizing the application for easy deployment.

## Installation

### Prerequisites

- Node.js
- Python 3.x
- Firebase account
- Google Cloud account
- Raspberry Pi (for edge deployment)

### Clone the Repository

```bash
git clone https://github.com/Srikark-17/WARN.git
cd WARN
