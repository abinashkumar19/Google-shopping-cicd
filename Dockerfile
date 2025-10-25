# Build lightweight NGINX image
FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY frontend/ .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
