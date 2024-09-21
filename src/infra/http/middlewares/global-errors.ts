import { AppError } from "@/infra/errors/app-error";
import { ExceptionError } from "@/infra/errors/exception-error";
import ParametersError from "@/infra/errors/parameters-error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function globalErrors(error: Error, _: FastifyRequest, reply:FastifyReply) {
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

  if (error instanceof ParametersError) {
    return reply.status(400).send({
      status: 'error',
      message: error.message,
      parameters: error.parameters,
    })
  }

  return reply.status(500).send({
    status: 'error',
    message: 'Internal server error'
  })
}