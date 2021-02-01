FROM node:alpine AS builder
WORKDIR /app
COPY package.json /app
RUN yarn install

ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL $REACT_APP_SERVER_URL

# FROM alpine
# WORKDIR /app
# COPY --from=builder /app /app 
COPY . . 

EXPOSE 3003
ENTRYPOINT ["yarn", "run", "start"]