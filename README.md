<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/gayanukabulegoda/SymptomPulse-FRONTEND.git">
    <img src="/assets/symptompulse-logo.png" alt="SymptomPulse Logo" width="150" height="150">
  </a>

  <h2 align="center">SymptomPulse FRONTEND</h2>

  <p align="center">
    Welcome to the <strong>SymptomPulse</strong> mobile app repository! This React Native (Expo) application, built with TypeScript, Redux, and NativeWind, offers users an intuitive interface to check possible conditions from symptoms, receive medical insights via the OpenFDA API, manage medications, and access secure user profiles.
    <br />
    <br />
    <a href="https://github.com/gayanukabulegoda/SymptomPulse-FRONTEND/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/gayanukabulegoda/SymptomPulse-FRONTEND/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation-and-setup">Installation and Setup</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#backend-repository">Backend Repository</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

---

## About The Project

**SymptomPulse** is a mobile application designed to help users monitor their health by checking symptoms and managing medications with ease. Through an intuitive interface and secure data handling, users can select symptoms (e.g., "headache", "fever"), get potential medical condition suggestions via the OpenFDA API, get medication reminders, and view their health history.

![Design-Thumbnail](/assets/symptompulse-readme-preview.png)

### Key Features

1. **Symptom Checking**
    - Select symptoms from a curated list (or custom) and receive potential condition insights using the OpenFDA API.
2. **Medication Management**
    - Add medications and get reminders, including dosage and timing details.
3. **Secure User Profiles**
    - JWT-authenticated profiles ensure that user data is safely managed.
4. **State Management with Redux**
    - Leverages Redux Toolkit with Redux Thunk for efficient and predictable state management.
5. **Responsive Design**
    - Styled with NativeWind for a clean, modern, and responsive user interface.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Built With

This project is built using a modern mobile development stack to ensure high performance and an exceptional user experience:

[![React Native][reactnative-shield]][reactnative-url]
[![Expo][expo-shield]][expo-url]
[![TypeScript][typescript-shield]][typescript-url]
[![Redux][redux-shield]][redux-url]
[![Axios][axios-shield]][axios-url]
[![NativeWind][nativewind-shield]][nativewind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

Follow these instructions to set up the **SymptomPulse FRONTEND** locally for development and testing.

### Prerequisites

- **Node.js** (v22+ recommended)  
  [Download & Install Node.js](https://nodejs.org/en/download/)
- **npm or yarn**  
  (npm is bundled with Node.js; Yarn is optional)
- **Expo CLI**  
  Install globally via:
  ```bash
  npm install -g expo-cli
  ```

### Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/gayanukabulegoda/SymptomPulse-FRONTEND.git
   ```
   Navigate to the project directory:
   ```bash
   cd SymptomPulse-FRONTEND
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure API Connection**  
   Instead of using a `.env` file, the backend API connection details are maintained in the `config.ts` file. Update the file with your backend IP address, port, and API version as shown below:
   ```typescript
   const IP_ADDRESS = 'Add your IP address here';
   const PORT = '5000';
   const VERSION = 'v1';

   export const API_URL = `http://${IP_ADDRESS}:${PORT}/api/${VERSION}`;
    ```
   
### Usage

1. **Start the Development Server**
   ```bash
   expo start
   ```
   This command launches the Expo development environment, allowing you to run the app on an emulator or a physical device.

2. **Building for Production**
   For creating a production build, refer to the [Expo Documentation](https://docs.expo.dev/distribution/building-standalone-apps/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## API Documentation

For detailed information on API endpoints, request/response formats, and integration guidelines, refer to the official [Postman Collection](https://documenter.getpostman.com/view/36681432/2sAYdhJqGj).

Ensure that the backend server is running and properly configured before making API requests.

---

## Backend Repository

The backend for SymptomPulse is built with Node.js, Express, TypeScript, and Prisma. For more details, visit the **SymptomPulse BACKEND** repository:
- [SymptomPulse BACKEND](https://github.com/gayanukabulegoda/SymptomPulse-BACKEND.git)

---

## License

Distributed under the **MIT License**. See [`LICENSE`](https://github.com/gayanukabulegoda/SymptomPulse-FRONTEND/blob/main/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<div align="center">
  <p>
    &copy; 2025 <a href="https://grbulegoda.me/" target="_blank">Gayanuka Bulegoda</a>
  </p>
</div>

---

<!-- MARKDOWN LINKS & IMAGES -->
[reactnative-shield]: https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[reactnative-url]: https://reactnative.dev/
[expo-shield]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
[expo-url]: https://expo.dev/
[typescript-shield]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[redux-shield]: https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[axios-shield]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[axios-url]: https://axios-http.com/
[nativewind-shield]: https://img.shields.io/badge/NativeWind-000?style=for-the-badge
[nativewind-url]: https://www.nativewind.dev/