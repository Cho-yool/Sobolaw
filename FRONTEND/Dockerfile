# 빌드 스테이지
FROM node:20.10.0-alpine as build
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN yarn build

# 패키지 스테이지
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /etc/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]