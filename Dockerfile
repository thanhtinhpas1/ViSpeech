### BASE
FROM node:dubnium-alpine AS base

LABEL maintainer "Vispeech <vispeech@hcmus.edu.vn>"
# Set the working directory
WORKDIR /user/src/app/vispeech
# Copy project specification and dependencies lock files
COPY package.json yarn.lock tsconfig.json ./

FROM base AS dependencies
# Install Node.js dependencies

RUN npm install

### RELEASE
FROM base AS development

# Copy app sources
COPY . .

# Copy dependencies
COPY --from=dependencies /node_modules ./node_modules

# Expose application port
EXPOSE 7070:7070
