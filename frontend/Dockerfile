# static frontend served by nginx
FROM nginx:alpine
COPY . /usr/share/nginx/html
# remove default config and use nginx default; files are static so default is fine
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
