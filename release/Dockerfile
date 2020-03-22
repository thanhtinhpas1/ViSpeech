### BASE
FROM node:dubnium-alpine AS base

# Set the working directory
WORKDIR /user/src/app/release

# Copy project specification and dependencies lock files
COPY package*.json .

RUN npm install

COPY . .

# Expose application port
EXPOSE 8000:8000

CMD ["node", "bin/www"]


