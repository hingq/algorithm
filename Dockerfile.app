# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
WORKDIR /workspace

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN cd shared && bash build.sh
RUN cd app && bash build.sh local

FROM nginx:1.27-alpine AS runtime
COPY --from=builder /workspace/app/dist/ /usr/share/nginx/html/
RUN sed -i 's/listen       80;/listen       3000;/g' /etc/nginx/conf.d/default.conf \
    && sed -i 's/listen  \[::\]:80;/listen  [::]:3000;/g' /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
