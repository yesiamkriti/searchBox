# Connecting Frontend and Backend with gRPC

This guide explains how to set up and connect the frontend and backend of your application using gRPC.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (for both frontend and backend)
- **gRPC** and **Protocol Buffers**
- **gRPC-Web** (for communication from the browser)
- **Docker** (using containers for deployment)
- **Frontend** (React)
- **Backend** (Node.js with Express, or other server frameworks)

## Step 1: Set Up gRPC in the Backend

### 1. Install Backend Dependencies

In the backend directory, install the required dependencies for gRPC:

```bash
npm install grpc @grpc/proto-loader
```
## Step 2: Set Up gRPC-Web in the Frontend

### 1. Install Frontend Dependencies
```bash
npm install grpc-web
npm install -g protoc-gen-grpc-web
```

Generate the JavaScript client code:
```bash
protoc -I=proto/ service.proto --js_out=import_style=commonjs:frontend/src --grpc-web_out=import_style=typescript,mode=grpcwebtext:frontend/src
```

## Step 3: Run the Application
```bash
//backend
node server.js
//frontend
npm start

```



