# ビルドステージ
FROM golang:1.21.0 AS builder
WORKDIR /app

# Goの依存関係を管理するためにGo modulesを有効にする
ENV GO111MODULE=on

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

# ビルド
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# 実行ステージ
FROM alpine:latest
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# ビルドステージからバイナリをコピー
COPY --from=builder /app/main .

EXPOSE 9090

CMD ["./main"]
