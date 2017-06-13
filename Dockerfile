FROM nginx:latest
MAINTAINER gowtham@dataculture.in
RUN apt-get update\
	&& apt-get install -y build-essential curl \
	&& curl -sL https://deb.nodesource.com/setup_6.x |  bash - \
	&& apt-get install -y nodejs
COPY nginx.conf /etc/nginx/nginx.conf
COPY cinnabar.conf /etc/nginx/conf.d/default.conf
COPY package.json /app/
RUN (cd /app && npm install)
COPY . /app
WORKDIR /app
EXPOSE 80
CMD ["./start.sh"]

