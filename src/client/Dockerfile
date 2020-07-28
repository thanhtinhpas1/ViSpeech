### BASE
FROM node:14-alpine AS base

LABEL maintainer="VispeechUI <vispeech@hcmus.edu.vn>"

# Set the working directory
WORKDIR /user/src/app/vispeechui

# Copy project specification and dependencies lock files
COPY package.json package-lock.json /user/src/app/vispeechui/
COPY ui/package.json package-lock.json /user/src/app/vispeechui/ui/

### DEPENDENCIES
FROM base AS dependencies

# Install Node.js dependencies
RUN cd /user/src/app/vispeechui && npm install --production
RUN cd /user/src/app/vispeechui/ui && npm install --production

### RELEASE
FROM base AS development

# Copy app sources
COPY . .

COPY --from=dependencies /user/src/app/vispeechui/node_modules ./node_modules
COPY --from=dependencies /user/src/app/vispeechui/ui/node_modules ./node_modules

CMD npm run start:prod
# Expose application port
EXPOSE 80:80
