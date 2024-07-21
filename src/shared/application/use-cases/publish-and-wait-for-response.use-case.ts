import { inject, injectable } from "tsyringe";
import SagaMessageModel from "../../domain/types/saga-message";
import IMessageBrokerRepository from "../ports/respositories/message-broker.repository.interface";
import { v4 as uuidV4 } from "uuid";

@injectable()
class PublishAndWaitForResponseUseCase {
    constructor(
        @inject("MessageBrokerRepository") private messageBrokerRepository: IMessageBrokerRepository,
    ){}

    async excute(data: object, routingKey: string, callback: (message: SagaMessageModel) => SagaMessageModel, queue: string): Promise<SagaMessageModel> {
        const correlationId = uuidV4();
        const sagaMessage: SagaMessageModel = {
            uuid: correlationId,
            data,
            success: true,
            datetime: new Date().toISOString(),
        };

        const response = await this.messageBrokerRepository.publishAndWaitForResponse(sagaMessage, routingKey, callback, queue);

        return response;
    }
}

export default PublishAndWaitForResponseUseCase;
