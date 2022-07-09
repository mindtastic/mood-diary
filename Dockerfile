FROM node:alpine

# Set working directory
WORKDIR /mood

# Copies project requirements into working directory
COPY package*.json ./

# Copy app code 
COPY ./app ./

# Install dependencies
RUN npm ci --production

# Command instructions
CMD ["npm", "start"]
