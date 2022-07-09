FROM node:alpine

# Set working directory
WORKDIR /mood

# Copies project requirements into working directory
COPY package*.json ./

# Copies requirements.txt into working directory
COPY ./requirements.txt /mood/requirements.txt

# install python and pip
RUN apk add --no-cache python3 py3-pip

# Install requirements
RUN pip install --no-cache-dir --upgrade -r /mood/requirements.txt

# Copy app code 
COPY ./app ./app

# Install dependencies
RUN npm ci --production

# Command instructions
CMD ["npm", "start"]
