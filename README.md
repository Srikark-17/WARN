# WARN - Wildfire Awareness and Real-time Notification

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Srikark-17/WARN/blob/main/LICENSE)

## Overview

WARN is a mobile app that creates awareness for wildfires and informs civilians of their surroundings to benefit their health. Inspired by the numerous wildfires on the west coast of the United States, WARN aims to provide timely information about wildfires, air quality, pollution, and pollen levels, ultimately helping to save lives and improve public safety.

## Features

- **Real-time Detection**: Uses BreezoMeter APIs to detect wildfires, air quality, pollution, and pollen levels in real-time.
- **Instant Notifications**: Sends immediate alerts to users about nearby wildfires, air quality, and pollution levels.
- **User-friendly Interface**: Provides an easy-to-use mobile interface for monitoring alerts and viewing relevant information.
- **Comprehensive Dashboard**: Displays the user's current location, air quality, temperature, and heatmaps for wildfires, air quality, pollen, and pollution.

## Video Demo

Watch the video demo to see WARN in action: [YouTube Video Demo](https://youtu.be/YbWc6DD5FKI)

[![Watch the video](https://img.youtube.com/vi/YbWc6DD5FKI/0.jpg)](https://youtu.be/YbWc6DD5FKI)

## Inspiration

Recently, there have been numerous amounts of wildfires on the west coast of the United States. Over 150,000 acres of land and over 80 people have been lost due to the number of wildfires that have been happening recently. This problem is causing an unusual amount of deforestation in local areas. WARN helps solve this critical problem by providing a simple way to inform civilians of their surroundings to benefit their health. This mobile app can be used during this unprecedented time and after.

## What It Does

- **Authentication**: Users can register or sign in securely using Firebase’s user authentication.
- **Dashboard Screen**: Displays current location, air quality, temperature, and heatmaps of wildfires, air quality, pollen, and pollution.
- **Notifications Screen**: Users can view notifications about nearby fires, air quality, pollen season, and pollution levels.
- **Nearby Fires Screen**: Uses the device’s location to fetch and display information about nearby fires using the BreezoMeter API.
- **News Feed Screen**: Provides the latest news about wildfires in real-time, allowing users to share articles or view them in detail.

## How We Built It

- **Frontend**: Built with React Native.
- **User Authentication**: Implemented using Firebase.
- **Location Services**: Utilized Expo Location API and Expo Reverse Geocode API.
- **Data Retrieval**: Integrated BreezoMeter APIs for fire, air quality, pollen, and pollution data.
- **Design**: Created UI/UX designs using Figma.
- **Deployment**: Used Expo Workflow for over-wifi deployment.

## Challenges We Ran Into

- Creating a modal for viewing articles was a new experience.
- Displaying data on a heatmap presented technical challenges.

## Accomplishments We Are Proud Of

- Successfully used several different APIs to provide comprehensive data.
- Developed a mobile app with multiple features in a short amount of time.
- Created a visually appealing and functional UI/UX design.

## What We Learned

- Displaying data in heatmaps.
- Retrieving and using a user’s location to provide relevant information.

## Installation

### Prerequisites

- Node.js
- Firebase account
- BreezoMeter API key

### Clone the Repository

```bash
git clone https://github.com/Srikark-17/WARN.git
cd WARN
