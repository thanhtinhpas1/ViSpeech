### BASE
FROM node:12-alpine AS base

LABEL maintainer "VispeechUI <vispeech@hcmus.edu.vn>"

# Set the working directory
WORKDIR /user/src/app/vispeechui

# Copy project specification and dependencies lock files
COPY package.json package-lock.json /tmp/
COPY ui/package.json package-lock.json /tmp/ui/

### DEPENDENCIES
FROM base AS dependencies

# Install Node.js dependencies
RUN cd /tmp && npm install --production
RUN cd /tmp/ui && npm install --production

### RELEASE
FROM base AS development

# Copy app sources
COPY . .

COPY --from=dependencies /tmp/node_modules ./node_modules
COPY --from=dependencies /tmp/ui/node_modules ./node_modules

CMD npm run start:prod
# Expose application port
EXPOSE 3200:3200
