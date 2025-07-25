FROM node:24-slim

RUN addgroup --system --gid 1001 prototype
RUN adduser --system --uid 1001 prototype

RUN mkdir /code
COPY package.json package-lock.json /code/
COPY app /code/app
WORKDIR /code

RUN npm install

RUN chown -R prototype:prototype /code
USER prototype

EXPOSE 3000
CMD ["npm", "run", "start"]