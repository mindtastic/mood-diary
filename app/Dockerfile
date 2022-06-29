FROM node:alpine
# Set working directory
WORKDIR /app
# Copies project requirements into working directory
COPY package*.json ./

# Runs package scripts
RUN yarn

COPY . .

# Expose port service uses
EXPOSE 80

# Command instructions
CMD ["yarn", "run", "start"]