FROM  node:16.14.0

WORKDIR /client
COPY . .

RUN yarn install

EXPOSE 3000
CMD ["yarn", "start"]
