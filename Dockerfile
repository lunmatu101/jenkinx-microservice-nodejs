FROM node:alpine
WORKDIR /app/src
COPY . .
RUN npm install
CMD ["npm", "start"]