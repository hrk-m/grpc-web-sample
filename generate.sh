CLIENT_OUTDIR=client/src
SERVER_OUTPUT_DIR=server

mkdir -p ${CLIENT_OUTDIR} ${SERVER_OUTPUT_DIR}

protoc \
      --go_out=${SERVER_OUTPUT_DIR} \
      --go-grpc_out=${SERVER_OUTPUT_DIR} \
      ./proto/*.proto
