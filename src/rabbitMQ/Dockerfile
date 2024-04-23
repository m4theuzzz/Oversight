FROM rabbitmq:3.8.9-management

COPY ./src/rabbitMQ/rabbitmq.conf /etc/rabbitmq/
COPY ./src/rabbitMQ/definitions.json /etc/rabbitmq/

RUN cat /etc/rabbitmq/rabbitmq.conf
