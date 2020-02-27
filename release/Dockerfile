### BASE
FROM node:dubnium-alpine AS base
# Set the working directory
WORKDIR .
# Install yarn
RUN apk add yarn
### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies
RUN yarn
### RELEASE
FROM base AS development
# Copy app sources
COPY . .
# Expose application port
EXPOSE 8000:8000
