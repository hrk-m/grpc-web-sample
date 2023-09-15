# hello-grpc-web

gRPCを使ったWebアプリケーション開発

- 技術選定
  - バックエンド
    - go1.21.0
  - フロント
    - node: v16.14.0
    - React.js
  - gRPCとの通信を可能にするためにenvoy を使用

# 事前導入
```zsh
$ brew install protobuf
$ brew install protoc-gen-grpc-web
```

# 環境構築

```bash
## init
$ go mod init github.com/hrk-m/hello-grpc-web/server

## Protocol Buffers v3 をinstall
$ go get -u google.golang.org/grpc

## Protocol Buffers の Go プラグイン
$ go get -u github.com/golang/protobuf/protoc-gen-go

## ディレクトリ構成
$ mkdir -p proto proxy server client
```

# proto
.proto ファイル作成後は以下コマンドを実行

```bash
sh generate.sh
```
- エラーが出た時のメモ
  - js_outでエラーが出る場合以下実行する必要があるかも([docs](https://github.com/grpc/grpc-web/issues/704#issuecomment-1215965557))
```bash
$ brew install protobuf@3
$ brew link --overwrite protobuf@3
```

# proxy
- envoy プロキシ起動

```bash
$ cd proxy/
$ docker build -t envoy .
$ docker run -d -p 8080:8080 envoy
```

# go
```bash
## 起動
$ go run server/main.go

## Greet 関数を呼ぶ
$ grpcurl -plaintext -d '{"name":"S13993"}' localhost:9090 greet.GreetService/Greet

## サービスリスト取得
$ grpcurl -plaintext localhost:9090 list
```

# front
```bash
## package init
yarn add grpc-web google-protobuf

## 起動
yarn start
```

# 一括で起動させたいとき
```bash
$ docker-compose up --build
```
