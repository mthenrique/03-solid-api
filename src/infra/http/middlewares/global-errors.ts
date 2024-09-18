import { AppError } from "@/infra/errors/app-error";
import { ExceptionError } from "@/infra/errors/exception-error";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export async function globalErrors(error: FastifyError, _: FastifyRequest, reply:FastifyReply) {
  if (error instanceof AppError) {
    return reply.status(400).send({ 
      status: 'error',
      message: error.message 
    })
  }

  if (error instanceof ExceptionError) {
    return reply.status(400).send({
      status: 'error',
      message: error.message
    })
  }

  return reply.status(500).send({
    status: 'error',
    message: 'Internal server error'
  })
}