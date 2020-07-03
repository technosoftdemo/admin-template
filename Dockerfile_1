# Stage 1
###FROM node:alpine AS builder

# install chrome for protractor tests
# Install Google Chrome
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -y google-chrome-stable

#apk add --update --no-cache gifsicle ttf-freefont optipng libjpeg-turbo-utils udev chromium
#export CHROME_BIN=/usr/bin/chromium-browser
###WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH
###RUN PATH="/app/node_modules/.bin:$PATH"
###RUN export PATH
###COPY package.json /app/package.json
###RUN npm install
###RUN npm install -g @angular/cli@7.3.9

###COPY . .
###RUN npm install && \
###    npm run build

#Stage 2
FROM nginx:alpine

WORKDIR /app


ENV PATH /app/node_modules/.bin:$PATH
RUN export PATH


## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
#RUN cp -rvpf /app/dist/* /usr/share/nginx/html/
#COPY --from=builder  ./app/dist/ /usr/share/nginx/html/
COPY /app/dist/* /usr/share/nginx/html/
#ADD app/dist /usr/share/nginx/html
# EXPOSE 80

#Run NGINX
CMD ["nginx", "-g", "daemon off;"]
