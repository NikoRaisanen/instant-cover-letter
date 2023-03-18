FROM public.ecr.aws/lambda/nodejs:16

ENV LD_PRELOAD=/var/task/node_modules/canvas/build/Release/libz.so.1

COPY /build ${LAMBDA_TASK_ROOT}

WORKDIR ${LAMBDA_TASK_ROOT}

RUN npm install

CMD [ "/var/task/index.handler" ]

