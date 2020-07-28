### BASE
FROM node:14-alpine AS base

# Set the working directory
WORKDIR /user/src/app/release

# Copy project specification and dependencies lock files
COPY package*.json ./

RUN npm install

COPY . ./

# Expose application port
EXPOSE 3200:3200

CMD ["node", "bin/www"]


