### BASE
FROM node:12-alpine AS base

LABEL maintainer="Vispeech <vispeech@hcmus.edu.vn>"

ENV SENDGRID_API_KEY=$SENDGRID_API_KEY
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV FB_APP_ID=$FB_APP_ID
ENV FB_APP_SECRET=$FB_APP_SECRET
ENV GG_CLIENT_ID=$GG_CLIENT_ID
ENV GG_CLIENT_SECRET=$GG_CLIENT_SECRET
ENV EMAIL=$EMAIL
ENV EMAIL_CLIENT_ID=$EMAIL_CLIENT_ID
ENV EMAIL_CLIENT_SECRET=$EMAIL_CLIENT_SECRET
ENV EMAIL_ACCESS_TOKEN=$EMAIL_ACCESS_TOKEN
ENV EMAIL_REFRESH_TOKEN=$EMAIL_REFRESH_TOKEN

# Set the working directory
WORKDIR /user/src/app/vispeech

# Copy project specification and dependencies lock files
COPY package.json package-lock.json tsconfig.json /tmp/

### DEPENDENCIES
FROM base AS dependencies

# Install Node.js dependencies
RUN cd /tmp && npm install

### RELEASE
FROM base AS development

# Copy app sources
COPY . .

COPY --from=dependencies /tmp/node_modules ./node_modules

CMD npm run start:prod

# Expose application port
EXPOSE 7070:7070
