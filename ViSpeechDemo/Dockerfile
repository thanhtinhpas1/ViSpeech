### BASE

FROM 10.0.0 AS base

# Set the working directory
WORKDIR /usr/src/app/demo

# Copy project specification and dependencies lock files
COPY package*.json ./

RUN npm install

COPY . .

# Expose application port
EXPOSE 3000:3000

CMD ["node", "bin/www"]
