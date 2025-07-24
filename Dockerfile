FROM node:22

RUN addgroup --system --gid 1001 prototype
RUN adduser --system --uid 1001 prototype

COPY package.json package-lock.json app/ /app/
WORKDIR /app

RUN npm install

RUN chown -R prototype:prototype /app
USER prototype

EXPOSE 3000
CMD ["npm", "run", "start"]