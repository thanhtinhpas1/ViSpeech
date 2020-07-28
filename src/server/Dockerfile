### BASE
FROM node:14-alpine AS base

LABEL maintainer="Vispeech <vispeech@hcmus.edu.vn>"

# Set the working directory
WORKDIR /user/src/app/vispeech

# Copy project specification and dependencies lock files
COPY package.json package-lock.json tsconfig.json /user/src/app/vispeech/

### DEPENDENCIES
FROM base AS dependencies

# Install Node.js dependencies
RUN cd /user/src/app/vispeech && npm install

### RELEASE
FROM base AS development

# Copy app sources
COPY . .

COPY --from=dependencies /user/src/app/vispeech/node_modules ./node_modules

CMD npm run start:prod

# Expose application port
EXPOSE 7070:7070
