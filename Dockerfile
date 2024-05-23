# base image
FROM node:18-alpine as build

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# install gulp-cli
RUN npm install gulp-cli

# copy app source
COPY . .

# compile css
RUN npm run gulp-init

# build app
RUN npm run build

# production environment
FROM nginx:1.26.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]