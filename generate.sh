CLIENT_OUTDIR=client/src
SERVER_OUTPUT_DIR=server

mkdir -p ${CLIENT_OUTDIR} ${SERVER_OUTPUT_DIR}

protoc \
      --go_out=${SERVER_OUTPUT_DIR} \
      --go-grpc_out=${SERVER_OUTPUT_DIR} \
      --js_out=import_style=commonjs:${CLIENT_OUTDIR} \
      --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_OUTDIR} \
      ./proto/*.proto
