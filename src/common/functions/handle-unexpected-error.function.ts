import { HttpException, InternalServerErrorException, Logger } from "@nestjs/common";
import { MethodEnum } from "../enums/method.enum";

/**
 * 
 * Trata um erro desconhecido e retorna uma exceção apropriada.
 *
 * @param error O erro capturado.
 * @param className Nome da classe onde estourou o erro.
 * @param method Método utilizado (Create, Update, Get ou Delete).
 * @param fallbackMessage Mensagem padrão a ser retornada ao cliente.
 * 
 */
export function handleUnexpectedError(error: Error, className: string, method: MethodEnum, fallbackMessage: string): never {
    const logger: Logger = new Logger();

    if (error instanceof HttpException) throw error;

    const errorTitle: string = `Falha ao realizar a ação de ${method} na classe ${className}`;

    logger.error(errorTitle);
    logger.error(error.stack);


    throw new InternalServerErrorException(fallbackMessage);
}