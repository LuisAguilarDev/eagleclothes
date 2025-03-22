# first stage

FROM node:18-alpine AS build_image
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "build"]


# second stage
FROM node:18-alpine AS production_image
WORKDIR /app
COPY --from=build_image /app/dist /app/dist
RUN npm install -g serve
EXPOSE 80
CMD ["serve","-s","dist","-l","80"]

