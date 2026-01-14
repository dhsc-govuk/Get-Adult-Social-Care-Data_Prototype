FROM node:22.22.0-slim

RUN addgroup --system --gid 1001 prototype
RUN adduser --system --uid 1001 prototype

RUN mkdir /code
COPY package.json package-lock.json /code/
WORKDIR /code

RUN npm ci

COPY app /code/app
RUN chown -R prototype:prototype /code
USER prototype

EXPOSE 3000
CMD ["npm", "run", "start"]