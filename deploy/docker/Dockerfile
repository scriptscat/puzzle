ARG BASEIMAGE=node:20-bookworm-slim

FROM ${BASEIMAGE}

EXPOSE 3000

ENV TZ=Asia/Shanghai

WORKDIR /www

RUN sed -i 's/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list.d/debian.sources

RUN apt update && \
    apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

COPY . .

RUN npm i

CMD [ "npm","start" ]