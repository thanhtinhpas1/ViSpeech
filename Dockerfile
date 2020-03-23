### BASE
FROM node:10.0.0 AS base

LABEL maintainer "Vispeech <vispeech@hcmus.edu.vn>"
# Set the working directory
WORKDIR /user/src/app/vispeech
# Copy project specification and dependencies lock files
COPY package.json yarn.lock tsconfig.json /tmp/

### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies
RUN cd /tmp && npm install

### RELEASE
FROM base AS development

# Copy app sources
COPY . .

COPY --from=dependencies /tmp/node_modules ./node_modules

CMD ['npm', 'start:dev']

# Expose application port
EXPOSE 7070:7070
