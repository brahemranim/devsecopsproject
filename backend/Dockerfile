FROM node:18-alpine

WORKDIR /app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# copy source
COPY src ./src

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "src/server.js"]
