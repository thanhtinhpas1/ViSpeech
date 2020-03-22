### BASE
FROM node:dubnium-alpine AS base

LABEL maintainer "Vispeech <vispeech@hcmus.edu.vn>"
# Set the working directory
WORKDIR /user/src/app/vispeech
# Copy project specification and dependencies lock files
COPY package.json yarn.lock tsconfig.json /tmp/
# Install yarn
RUN apk --no-cache add yarn

### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies
RUN cd /tmp && yarn --pure-lockfile

RUN rm -rf dist && tsc && rm -rf ./apps/build && npm run build --prefix ./apps

RUN node dist/src/main.js
### RELEASE
FROM base AS development

# Copy app sources
COPY . .

COPY --from=dependencies /tmp/node_modules ./node_modules

# Expose application port
EXPOSE 7070:7070
